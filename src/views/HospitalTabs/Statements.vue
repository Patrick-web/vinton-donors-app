<template>
  <div class="Donor_Tab tab">
    <div class="tab_header">
      <div class="abs_center_xy z3 width_full">
        <h3 class="ta_center tsz2_2">Blood Bank</h3>
      </div>
    </div>
    <!-- <v-data-table
      dense
      :headers="headers"
      :items="bloodDatabase"
      item-key="name"
      class="elevation-1 pos_rel z3 mt20"
    ></v-data-table> -->
    <div class="grid3">
      <div
        class="blood_card flex flex-col center-v round10"
        v-for="blood in bloodDatabase"
        :key="blood.bloodType"
      >
        <h4 class="mb10">{{ blood.bloodType }}</h4>
        <div class="flex_between w-80">
          <p>Available</p>
          <p>{{ blood.balance }}</p>
        </div>
        <div class="flex_between w-80">
          <p>Minimum</p>
          <p>{{ blood.minimum }}</p>
        </div>
      </div>
    </div>
    <!-- <img
      class="pos_abs top0 width_full"
      src="@/assets/images/split.svg"
      alt=""
    /> -->
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
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
      ],
    };
  },
  computed: {
    ...mapGetters(["bloodDatabase"]),
  },
  mounted() {
    console.log("=============");
  },
};
</script>

<style lang="scss">
.tab {
  background: black;
}
.deficits {
  position: absolute;

  width: 100%;
  div {
    margin-left: 40px;
    // width: 100%;
    border-right: 2px solid white;
  }
}
.blood_card {
  color: white;
  margin: 10px;
  background: rgb(16, 16, 16);
  overflow: hidden;
  h4 {
    color: crimson;
    background: rgb(255, 199, 210);
    width: 100%;
    font-size: 3rem;
    text-align: center;
  }
}
</style>