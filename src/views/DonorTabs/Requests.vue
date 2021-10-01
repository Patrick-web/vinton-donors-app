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
        <v-btn text @click="reveal = true"> Accept Request </v-btn>
      </v-card-actions>

      <!-- <v-expand-transition>
        <v-card
          v-if="reveal"
          class="transition-fast-in-fast-out v-card--reveal"
          style="height: 100%"
        >
          <v-card-text class="pb-0">
            <p class="text-h4 text--primary">Origin</p>
            <p>
              late 16th century (as a noun denoting a place where alms were
              distributed): from medieval Latin eleemosynarius, from late Latin
              eleemosyna ‘alms’, from Greek eleēmosunē ‘compassion’
            </p>
          </v-card-text>
          <v-card-actions class="pt-0">
            <v-btn text color="teal accent-4" @click="reveal = false">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-expand-transition> -->
    </v-card>
  </div>
</template>
<script>
import { getDonationRequestsRelevantToUser } from "@/global/supa.js";
import { mapMutations, mapState } from "vuex";
export default {
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
  },
  mounted() {
    this.getRequests();
  },
};
</script>