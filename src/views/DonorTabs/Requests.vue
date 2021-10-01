<template>
  <div class="tab">
    <div class="tab_header">
      <div class="abs_center_xy z3 width_full">
        <h2 class="tsz2_2 ta_center">5 Donation</h2>
        <h3 class="ta_center tsz_2">Requests</h3>
      </div>
      <img class="pos_abs width_full" src="@/assets/images/split.svg" alt="" />
    </div>
    <v-card
      class="ma10"
      v-for="request in donorRelevantRequests"
      :key="request.id"
    >
      <v-card-text>
        <p class="text-h4 text--primary">
          {{ request.bloodType }} Requested at
        </p>
        <p>{{ request.hospital }}</p>
        <div class="text--primary">
          {{ request.description }}
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="acceptRequest(request.id)"> Accept Request </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import {
  getDonationRequestsRelevantToUser,
  acceptDonationRequest,
} from "@/global/supa.js";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      requestAccepted: false,
    };
  },
  computed: {
    ...mapState(["donorDetails", "donorRelevantRequests"]),
  },
  methods: {
    ...mapMutations(["setDonorRelevantRequests"]),
    async getRequests() {
      const relevantRequests = await getDonationRequestsRelevantToUser(
        this.donorDetails.bloodType
      );
      if (relevantRequests) {
        console.log("Setting relevant requests");
        console.log(relevantRequests);
        this.setDonorRelevantRequests(relevantRequests);
      } else {
        console.log("Could Not get relevantRequests");
      }
    },
    async acceptRequest(requestID) {
      if (!this.requestAccepted) {
        const response = await acceptDonationRequest(
          requestID,
          this.donorDetails.email
        );
        if (response) {
          console.log(response);
          this.requestAccepted = true;
          this.getRequests();
        } else {
          console.log("Error accepting response");
        }
      }
    },
  },
  mounted() {
    this.getRequests();
  },
};
</script>