<template>
  <div class="tab account_tab">
    <div class="tab_header">
      <div class="abs_center_xy z3 width_full">
        <h2 class="tsz2_2 ta_center">Good Morning</h2>
        <h3 class="ta_center tsz1">Vinton</h3>
      </div>
      <img class="pos_abs width_full" src="@/assets/images/split.svg" alt="" />
    </div>
    <v-card class="ma20 round20">
      <v-card-text>
        <h2 class="ta_center">Edit Your Details</h2>
      </v-card-text>
      <form class="form_page_form ma10 pa10">
        <v-text-field
          v-model="username"
          :counter="10"
          label="Username"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          type="password"
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
          Save Changes
        </v-btn>
      </form>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    username: "",
    password: "",
    email: "",
    location: "",
    bloodType: "",
    bloodTypes: ["A+", "A-", "B+", "B-", "0+", "0-", "AB+", "AB-"],
  }),
};
</script>

<style>
</style>