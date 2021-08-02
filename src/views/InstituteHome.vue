
<template>
  <div class="page donor_home pos_rel">
    <v-tabs-items v-model="tab">
      <v-tab-item value="tab-1">
        <Statements />
      </v-tab-item>
      <v-tab-item value="tab-2">
        <requests />
      </v-tab-item>
      <v-tab-item value="tab-3">
        <Donations />
      </v-tab-item>
      <v-tab-item value="tab-4">
        <account />
      </v-tab-item>
    </v-tabs-items>
    <v-tabs
      v-model="tab"
      background-color=" F0F0F0"
      icons-and-text
      fixed-tabs
      class="tab_switcher pos_abs bottom0 left0 z3"
    >
      <v-tabs-slider color="#fc7434"></v-tabs-slider>

      <v-tab href="#tab-1">
        Home
        <v-icon>mdi-home</v-icon>
      </v-tab>

      <v-tab href="#tab-2">
        Requests
        <v-icon>mdi-bell-ring</v-icon>
      </v-tab>

      <v-tab href="#tab-3">
        Donations
        <v-icon>mdi-blood-bag</v-icon>
      </v-tab>
      <v-tab href="#tab-4">
        Account
        <v-icon>mdi-account</v-icon>
      </v-tab>
    </v-tabs>
  </div>
</template>
<script>
import Statements from "./HospitalTabs/Statements.vue";
import Requests from "./HospitalTabs/Requests.vue";
import Account from "./HospitalTabs/Account.vue";
import Donations from "./HospitalTabs/Donations.vue";
export default {
  components: { Statements, Requests, Account, Donations },
  data() {
    return {
      tab: null,
      donationCount: 0,
    };
  },
};
</script>

<style lang="scss">
.v-tab--active {
  color: #fc7434 !important;
}
</style>