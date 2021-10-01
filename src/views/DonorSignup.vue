<template>
  <div class="page form_page">
    <div class="form_page_header pos-rel">
      <div class="form_page_header_info abs_center_xy">
        <h2>Sign up</h2>
        <p>as Donor</p>
      </div>
      <svg
        width="414"
        height="293"
        viewBox="0 0 414 293"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0H414V197.761L0 293V0Z" fill="#E6006E" />
      </svg>
    </div>
    <v-form class="form_page_form ma10 round20">
      <v-card class="pa10 round20">
        <v-text-field
          v-model="username"
          :counter="10"
          label="Username"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          required
        ></v-text-field>
        <v-text-field v-model="email" label="Email" required></v-text-field>
        <v-text-field
          v-model="location"
          label="Location"
          required
        ></v-text-field>
        <v-select
          v-model="bloodType"
          :items="bloodTypes"
          item-text="Blood Type"
          item-value="abr"
          label="Blood Type"
          required
        ></v-select>
        <v-btn class="mr-4 mt10" rounded block color="#E5006E" @click="submit">
          submit
        </v-btn>
      </v-card>
    </v-form>
  </div>
</template>

<script>
import { registerDonor } from "@/global/supa.js";
import { mapMutations } from "vuex";

export default {
  data: () => ({
    username: "",
    password: "",
    email: "",
    location: "",
    bloodType: "",
    bloodTypes: ["A+", "A-", "B+", "B-", "0+", "0-", "AB+", "AB-"],
  }),

  methods: {
    ...mapMutations(["setDonorDetails"]),
    async submit() {
      const newDonor = {
        username: this.username,
        password: this.password,
        email: this.email,
        location: this.location,
        bloodType: this.bloodType,
      };
      const user = await registerDonor(newDonor);
      if (user) {
        this.setDonorDetails(user[0]);
        this.$router.push("/donor_home");
      }
    },
    clear() {
      this.$v.$reset();
      this.username = "";
      this.password = "";
    },
  },
};
</script>

<style lang="scss">
.form_page {
  .form_page_header {
    height: 30%;
    position: relative;
    .form_page_header_info {
      z-index: 3;
      color: white;
      h2 {
        font-size: 3rem;
      }
    }
    svg {
      position: absolute;
      top: 0;
    }
  }
  form {
    position: relative;
    z-index: 3;
    background: #fff9f9;
    .v-btn__content {
      color: white !important;
    }
  }
}
</style>