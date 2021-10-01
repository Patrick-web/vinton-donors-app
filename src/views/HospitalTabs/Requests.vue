<template>
  <div class="tab">
    <div class="tab_header">
      <div class="abs_center_xy z3 width_full">
        <h3 class="ta_center tsz_2">
          {{ bloodRequests.pending.length }} Pending Requests
        </h3>
        <h3 class="ta_center tsz_2">
          {{ bloodRequests.answered.length }} Requests Accepted
        </h3>
      </div>

      <img class="pos_abs width_full" src="@/assets/images/split.svg" alt="" />
    </div>
    <v-card class="pa10 mb10">
      <h3>Accepted Requests</h3>
      <div>
        <v-card-text
          v-for="request in bloodRequests.answered"
          :key="request.id"
        >
          <h4 class="text--primary">{{ request.bloodType }}</h4>
          <p>Request</p>
          <div class="text--primary">
            Answered by {{ request.accept_donor }}
          </div>
        </v-card-text>
        <v-card-actions> </v-card-actions>
      </div>
    </v-card>
    <v-card class="pa10">
      <h3>Pending Requests</h3>
      <div class="mx-auto mb10">
        <v-card-text v-for="request in bloodRequests.pending" :key="request.id">
          <p class="text--primary">{{ request.bloodType }}</p>
          <div class="text--primary">
            {{ request.description }}
          </div>
        </v-card-text>
      </div>
    </v-card>
    <v-dialog v-model="showForm" width="500">
      <v-card>
        <form class="form_page_form ma10 pa20 round20">
          <h2>Send out New Request</h2>
          <v-select
            v-model="bloodType"
            :items="bloodTypes"
            item-text="Blood Type"
            item-value="abr"
            label="Blood Type"
            required
          ></v-select>
          <v-text-field
            v-model="description"
            label="Description"
            required
          ></v-text-field>
          <v-btn
            class="mr-4 mb10"
            rounded
            block
            color="#E5006E"
            @click="addRequest"
          >
            Send
          </v-btn>
          <v-btn class="mr-4" rounded block @click="showForm = false">
            Cancel
          </v-btn>
        </form>
      </v-card>
    </v-dialog>
    <v-btn
      id="req_fab"
      class="mx-2"
      fab
      dark
      @click="showForm = true"
      small
      color="primary"
    >
      <v-icon dark> mdi-plus </v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
import { newDonationRequest, getDonationRequests } from "@/global/supa.js";
export default {
  data() {
    return {
      showForm: false,
      bloodType: "",
      bloodTypes: ["A+", "A-", "B+", "B-", "0+", "0-", "AB+", "AB-"],
      description: "",
    };
  },
  computed: {
    ...mapGetters(["bloodRequests"]),
    ...mapState(["hospitalDetails"]),
  },
  methods: {
    ...mapMutations(["addBloodRequest", "setDonationRequest"]),
    async addRequest() {
      const newRequest = {
        hospital: this.hospitalDetails.username,
        bloodType: this.bloodType,
        description: this.description,
      };
      const result = await newDonationRequest(newRequest);
      if (result) {
        console.log(result[0]);
        this.addBloodRequest(result[0]);
      } else {
        console.log("Error");
      }
      this.showForm = false;
    },
    async getAllRequests() {
      const donations = await getDonationRequests({
        column: "hospital",
        value: this.hospitalDetails.username,
      });
      if (donations) {
        this.setDonationRequest(donations);
        console.log(donations);
      } else {
        console.log("Error while getting donations");
      }
    },
  },
  mounted() {
    this.getAllRequests();
  },
};
</script>

<style scoped>
#req_fab {
  position: fixed !important;
  bottom: 80px;
  right: 10px;
}
</style>