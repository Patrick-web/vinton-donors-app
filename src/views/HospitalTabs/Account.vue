<template>
  <div class="tab account_tab">
    <div class="tab_header">
      <div class="abs_center_xy z3 width_full">
        <h2 class="tsz2_2 ta_center">{{ hospitalAccountDetails.username }}</h2>
      </div>
      <img class="pos_abs width_full" src="@/assets/images/split.svg" alt="" />
    </div>
    <v-card class="ma20 round20">
      <v-card-text>
        <h2 class="ta_center">Edit Hospital Details</h2>
      </v-card-text>
      <form class="form_page_form ma10 pa10">
        <v-text-field
          v-model="newUsername"
          :counter="10"
          label="Username"
          required
        />
        <v-text-field v-model="newEmail" label="Email" required></v-text-field>
        <v-text-field
          v-model="newLocation"
          label="Location"
          required
        ></v-text-field>
        <v-btn class="mr-4 mt10" rounded block color="#E5006E" @click="submit">
          Save Changes
        </v-btn>
      </form>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { updateHospitalDetails } from "@/global/supa.js";
export default {
  data() {
    return {
      newUsername: "",
      newLocation: "",
      newEmail: "",
    };
  },
  computed: {
    ...mapGetters(["hospitalAccountDetails"]),
  },
  methods: {
    ...mapMutations(["setHospitalDetails"]),
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
      const update = await updateHospitalDetails(
        updatedDetails,
        this.hospitalAccountDetails.email
      );
      if (update) {
        this.setHospitalDetails(update);
        this.setCurrentAccountDetails();
      } else {
        console.log("Could not updated hospital details");
      }
    },
    setCurrentAccountDetails() {
      this.newUsername = this.hospitalAccountDetails.username;
      this.newEmail = this.hospitalAccountDetails.email;
      this.newLocation = this.hospitalAccountDetails.location;
    },
  },
  mounted() {
    this.setCurrentAccountDetails();
  },
};
</script>

<style>
</style>