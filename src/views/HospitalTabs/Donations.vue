<template>
  <div class="tab">
    <div class="tab_header">
      <div class="abs_center_xy z3 width_full">
        <div class="abs_center_xy z3 width_full">
          <h2 class="tsz2_2 ta_center">{{ hospitalDonations.length }}</h2>
          <h3 class="ta_center tsz_2">Donations Completed</h3>
        </div>
      </div>
    </div>
    <img
      class="pos_abs top0 width_full"
      src="@/assets/images/split.svg"
      alt=""
    />
    <v-data-table
      dense
      :headers="headers"
      :items="hospitalDonations"
      item-key="name"
      class="elevation-1 pos_rel z3"
    ></v-data-table>
    <v-dialog v-model="showForm" width="500">
      <v-card>
        <form class="form_page_form ma10 pa20 round20">
          <h2>Add new Donation</h2>
          <v-select
            v-model="bloodType"
            :items="bloodTypes"
            item-text="Blood Type"
            item-value="abr"
            label="Blood Type"
            required
          ></v-select>
          <v-text-field
            v-model="donor"
            label="Donor Email"
            required
          ></v-text-field>
          <v-text-field
            v-model="recipient"
            label="Recipient"
            required
          ></v-text-field>
          <v-btn
            class="mr-4 mb10"
            rounded
            block
            color="#E5006E"
            @click="addDonation"
          >
            Add
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
import { hospital_addBloodDonation } from "@/global/supa.js";
export default {
  data() {
    return {
      showForm: false,
      bloodType: "",
      donor: "",
      recipient: "",
      bloodTypes: ["A+", "A-", "B+", "B-", "0+", "0-", "AB+", "AB-"],
      headers: [
        {
          text: "Blood Type",
          align: "start",
          sortable: false,
          value: "type",
        },
        {
          text: "Donor",
          align: "start",
          sortable: false,
          value: "donor",
        },
        {
          text: "Recipient",
          align: "start",
          sortable: false,
          value: "recipient",
        },
        {
          text: "Date",
          align: "start",
          sortable: false,
          value: "date",
        },
      ],
    };
  },
  computed: {
    ...mapState(["hospitalDetails"]),
    ...mapGetters(["hospitalDonations"]),
  },
  methods: {
    ...mapMutations(["setHospitalDonations"]),
    async addDonation() {
      const newDonation = {
        type: this.bloodType,
        donor: this.donor,
        recipient: this.recipient,
        date: new Date().toLocaleString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        hospital: this.hospitalDetails.username,
        location: this.hospitalDetails.location,
      };
      const currentDonations = this.hospitalDetails.donationsCompleted;
      currentDonations.unshift(newDonation);
      const updatedDonations = await hospital_addBloodDonation(
        currentDonations,
        this.hospitalDetails.email
      );
      if (updatedDonations) {
        console.log("Setting this/");
        console.log(updatedDonations);
        this.setHospitalDonations(updatedDonations);
      } else {
        console.log("Error updating  donations");
      }
      this.showForm = false;
    },
  },
};
</script>

<style>
#req_fab {
  position: fixed !important;
  bottom: 80px;
  right: 10px;
  z-index: 5;
}
</style>