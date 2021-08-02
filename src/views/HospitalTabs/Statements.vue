<template>
  <div class="Donor_Tab tab">
    <div class="tab_header">
      <div class="abs_center_xy z3 width_full">
        <h3 class="ta_center tsz2_2">Blood Deficit</h3>
        <div class="flex center-h center-v deficits">
          <div
            class="flex center-h center-v"
            v-for="deficit in deficits"
            :key="deficit.type"
          >
            <p class="mr5">{{ deficit.type }} 👉</p>

            <p>{{ deficit.count }}</p>
          </div>
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
      :items="db"
      item-key="name"
      class="elevation-1 pos_rel z3 mt20"
    ></v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      deficits: [
        {
          type: "B+",
          count: 2,
        },
        {
          type: "0-",
          count: 3,
        },
        {
          type: "AB+",
          count: 1,
        },
      ],
      db: [
        {
          type: "A+",
          balance: 15,
          min: 5,
          max: 20,
        },
        {
          type: "A-",
          balance: 5,
          min: 5,
          max: 20,
        },
        {
          type: "B+",
          balance: 15,
          min: 5,
          max: 20,
        },
        {
          type: "B-",
          balance: 15,
          min: 5,
          max: 20,
        },
        {
          type: "AB+",
          balance: 15,
          min: 5,
          max: 20,
        },
        {
          type: "AB-",
          balance: 15,
          min: 5,
          max: 20,
        },
        {
          type: "0+",
          balance: 15,
          min: 5,
          max: 20,
        },
        {
          type: "0+",
          balance: 15,
          min: 5,
          max: 20,
        },
      ],
      headers: [
        {
          text: "Blood Type",
          align: "start",
          sortable: false,
          value: "type",
        },
        {
          text: "Balance",
          align: "start",
          sortable: false,
          value: "balance",
        },
        {
          text: "Minimum",
          align: "start",
          sortable: false,
          value: "min",
        },
        {
          text: "Maximum",
          align: "start",
          sortable: false,
          value: "max",
        },
      ],
    };
  },
  computed: {
    totalDonations() {
      return this.monthDonations
        .map((md) => md.donations.length)
        .reduce((acc, val) => acc + val, 0);
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
.deficits {
  position: absolute;

  width: 100%;
  div {
    margin-left: 40px;
    // width: 100%;
    border-right: 2px solid white;
  }
}
</style>