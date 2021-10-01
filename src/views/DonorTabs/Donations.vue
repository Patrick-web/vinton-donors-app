<template>
  <div class="Donor_Tab tab">
    <div class="tab_header">
      <div class="abs_center_xy z3 width_full">
        <h2 class="tsz2_2 ta_center">
          <!-- {{ donorDonations.map((group) => group.donations).length }} -->
          {{ donorDonations[0].donations.length }}
        </h2>
        <h3 class="ta_center tsz_2">Donations so far</h3>
      </div>
    </div>
    <img
      class="pos_abs top0 width_full"
      src="@/assets/images/split.svg"
      alt=""
    />
    <v-card
      flat
      v-for="monthDonation in donorDonations"
      :key="monthDonation.month"
      class="ma10"
    >
      <v-card-text>
        <div class="font-weight-bold ml-1">{{ monthDonation.month }}</div>

        <v-timeline align-top dense>
          <v-timeline-item
            v-for="donation in monthDonation.donations"
            :key="donation.date"
            small
            color="orange"
          >
            <div class="mb-5">
              <div class="font-weight-normal donation_card tsz1">
                <strong>{{ donation.date }}</strong>
              </div>
              <div>
                <v-icon color="primary" class="mr-1">mdi-hospital</v-icon>
                {{ donation.hospital }}
              </div>
              <div>
                <v-icon color="primary" class="mr-2">mdi-map</v-icon
                >{{ donation.location }}
              </div>
            </div>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { getDonorDonations } from "@/global/supa.js";
export default {
  data() {
    return {
      // monthDonations: [
      //   {
      //     month: "June",
      //     donations: [
      //       {
      //         date: "10 June 2020",
      //         hospital: "Kenyatta National Hospital",
      //         location: "Dedan Kimathi University",
      //       },
      //     ],
      //   },
      //   {
      //     month: "July",
      //     donations: [
      //       {
      //         date: "2 June 2020",
      //         hospital: "Kenyatta National Hospital",
      //         location: "Dedan Kimathi University",
      //       },
      //       {
      //         date: "25 June 2020",
      //         hospital: "Murang'a level 5 Hospital",
      //         location: "Muranga Township Hall",
      //       },
      //     ],
      //   },
      //   {
      //     month: "August",
      //     donations: [
      //       {
      //         date: "15 August 2020",
      //         hospital: "Kenyatta National Hospital",
      //         location: "Dedan Kimathi University",
      //       },
      //       {
      //         date: "30 August 2020",
      //         hospital: "Murang'a level 5 Hospital",
      //         location: "Muranga Township Hall",
      //       },
      //     ],
      //   },
      // ],
    };
  },
  methods: {
    ...mapMutations(["setDonorDonations"]),
    async setDonations() {
      const groupedDonations = await getDonorDonations(this.donorDetails.email);
      console.log("Setting donations...");
      console.log(groupedDonations);
      this.setDonorDonations(groupedDonations);
    },
  },
  computed: {
    ...mapState(["donorDetails", "donorDonations"]),
  },
  mounted() {
    this.setDonations();
  },
};
</script>

<style>
.v-timeline {
  transform: translateX(-40px);
}
.tab_header {
  position: relative;
  top: 0px;
  left: 0px;
  height: 15%;
  color: white;
}
.v-tabs {
  background: #f0f0f0;
  position: fixed;
  bottom: 0px;
}
.v-tabs-items {
  /* height: 100%; */
}
.tab {
  height: 90vh;
  overflow: hidden;
  overflow-y: scroll;
}
</style>