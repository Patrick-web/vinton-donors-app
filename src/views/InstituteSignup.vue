<template>
  <div class="page form_page">
    <div class="form_page_header pos-rel">
      <div class="form_page_header_info abs_center_xy">
        <h2>Sign up</h2>
        <p>as Hospital</p>
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
    <form class="form_page_form ma10 pa20 round20">
      <v-text-field
        v-model="username"
        :counter="10"
        label="Username"
        required
      ></v-text-field>
      <v-text-field v-model="password" label="Password" required></v-text-field>
      <v-text-field v-model="email" label="Email" required></v-text-field>
      <v-text-field v-model="location" label="Location" required></v-text-field>
      <router-link to="/institute_home">
        <v-btn class="mr-4 mt10" rounded block color="#E5006E" @click="submit">
          submit
        </v-btn>
      </router-link>
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    username: "",
    password: "",
    email: "",
    location: "",
  }),

  methods: {
    submit() {
      this.$v.$touch();
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
</style>