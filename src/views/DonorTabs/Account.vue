<template>
  <div class="tab account_tab">
    <div class="tab_header">
      <div class="abs_center_xy z3 width_full">
        <h2 class="tsz2_2 ta_center">Good Morning</h2>
        <h3 class="ta_center tsz1">{{ donorDetails.username }}</h3>
      </div>
      <img class="pos_abs width_full" src="@/assets/images/split.svg" alt="" />
    </div>
    <v-card class="ma20 round20">
      <v-card-text>
        <h2 class="ta_center">Edit Your Details</h2>
      </v-card-text>
      <form class="form_page_form ma10 pa10">
        <v-text-field
          v-model="newUsername"
          :counter="10"
          label="Username"
          required
        ></v-text-field>
        <v-text-field v-model="newEmail" label="Email" required></v-text-field>
        <v-text-field
          v-model="newLocation"
          label="Location"
          required
        ></v-text-field>
        <v-select
          v-model="newBloodType"
          :items="bloodTypes"
          item-text="Blood Type"
          item-value="abr"
          label="Blood Type"
          required
        ></v-select>
        <v-btn class="mr-4 mt10" rounded block color="#E5006E" @click="submit">
          Save Changes
        </v-btn>
      </form>
    </v-card>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { updateDonorDetails } from "@/global/supa.js";
export default {
  data: () => ({
    newUsername: "",
    newEmail: "",
    newLocation: "",
    newBloodType: "",
    bloodTypes: ["A+", "A-", "B+", "B-", "0+", "0-", "AB+", "AB-"],
  }),
  computed: {
    ...mapState(["donorDetails"]),
  },
  methods: {
    ...mapMutations(["setDonorDetails"]),
    async submit() {
      const updatedDetails = {};
      if (this.newUsername) {
        updatedDetails["username"] = this.newUsername;
      }
      if (this.newLocation) {
        updatedDetails["location"] = this.newLocation;
      }
      if (this.newEmail) {
        updatedDetails["email"] = this.newEmail;
      }
      if (this.newBloodType) {
        updatedDetails["bloodType"] = this.newBloodType;
      }
      const update = await updateDonorDetails(
        updatedDetails,
        this.donorDetails.email
      );
      if (update) {
        this.setDonorDetails(update);
        this.setCurrentAccountDetails();
      } else {
        console.log("Could not updated donor details");
      }
    },
    setCurrentAccountDetails() {
      this.newUsername = this.donorDetails.username;
      this.newEmail = this.donorDetails.email;
      this.newLocation = this.donorDetails.location;
      this.newBloodType = this.donorDetails.bloodType;
    },
  },
  mounted() {
    this.setCurrentAccountDetails();
  },
};
</script>

<style>
</style>