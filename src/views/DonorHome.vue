
<template>
  <div class="page donor_home pos_rel">
    <v-tabs-items v-model="tab">
      <v-tab-item value="tab-1">
        <donations v-on:totalDonation="(d) => (this.donationCount = d)" />
      </v-tab-item>
      <v-tab-item value="tab-2">
        <requests />
      </v-tab-item>
      <v-tab-item value="tab-3">
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
        Donations
        <v-icon>mdi-timeline-text-outline</v-icon>
      </v-tab>

      <v-tab href="#tab-2">
        Requests
        <v-icon>mdi-bell-ring</v-icon>
      </v-tab>

      <v-tab href="#tab-3">
        Account
        <v-icon>mdi-account</v-icon>
      </v-tab>
    </v-tabs>
  </div>
</template>
<script>
import Donations from "./DonorTabs/Donations.vue";
import Requests from "./DonorTabs/Requests.vue";
import Account from "./DonorTabs/Account.vue";
export default {
  components: { Donations, Requests, Account },
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