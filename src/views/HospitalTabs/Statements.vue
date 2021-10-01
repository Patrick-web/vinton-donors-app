<template>
  <div class="Donor_Tab tab">
    <div class="tab_header">
      <div class="abs_center_xy z3 width_full">
        <h3 class="ta_center tsz2_2">Blood Bank</h3>
      </div>
    </div>
    <div class="grid3">
      <div
        class="blood_card flex flex-col center-v round10"
        v-for="blood in bloodDatabase"
        :key="blood.bloodType"
        @click="
          bloodTypeInfo = blood;
          showForm = true;
        "
      >
        <h4 class="mb10">{{ blood.bloodType }}</h4>
        <div class="flex_between w-100 border_split">
          <p>Available</p>
          <p>{{ blood.balance }}</p>
        </div>
        <div class="flex_between w-100">
          <p>Minimum</p>
          <p>{{ blood.minimum }}</p>
        </div>
      </div>
    </div>
    <img
      class="pos_abs top0 width_full no_pointer"
      src="@/assets/images/split.svg"
      alt=""
    />
    <v-dialog v-model="showForm" width="500">
      <v-card>
        <form class="form_page_form ma10 pa10 round20">
          <h2 class="ta_center">{{ bloodTypeInfo.bloodType }} Bags</h2>

          <v-text-field
            v-model="bloodTypeInfo.balance"
            label="Available Blood Bags"
            required
            type="number"
          ></v-text-field>
          <v-text-field
            v-model="bloodTypeInfo.minimum"
            label="Minimum number of Bags "
            required
            type="number"
          ></v-text-field>
          <v-btn
            class="mr-4 mb10"
            rounded
            block
            color="#E5006E"
            @click="saveChanges"
          >
            Update
          </v-btn>
          <v-btn class="mr-4" rounded block @click="showForm = false">
            Cancel
          </v-btn>
        </form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import { updateBloodBank } from "@/global/supa.js";
export default {
  data() {
    return {
      showForm: false,
      bloodTypeInfo: {
        bloodType: "A+",
        balance: 0,
        minimum: 0,
      },
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
    ...mapState(["hospitalDetails"]),
  },
  methods: {
    ...mapMutations(["setHospitalDetails"]),
    async saveChanges() {
      const dbSnapshot = this.bloodDatabase;
      console.log(dbSnapshot);
      const index = dbSnapshot.findIndex(
        (type) => type.bloodType == this.bloodTypeInfo.bloodType
      );
      console.log(index);
      dbSnapshot[index] = this.bloodTypeInfo;
      const updatedHospitalDetails = await updateBloodBank(
        dbSnapshot,
        this.hospitalDetails.email
      );
      if (updatedHospitalDetails) {
        console.log("Updated blood bank");
        console.log(updatedHospitalDetails);
        this.setHospitalDetails(updatedHospitalDetails);
      } else {
        console.log("Error updating blood bank");
      }
      this.showForm = false;
    },
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
  margin: 0px 5px;
  background: rgb(16, 16, 16);
  overflow: hidden;
  position: relative;
  z-index: 20;
  cursor: pointer;
  div {
    padding: 5px 10px;
  }
  p {
    margin: 0px;
  }
  &:hover {
    background: rgb(27, 27, 27);
  }
  h4 {
    color: crimson;
    background: rgb(255, 199, 210);
    width: 100%;
    font-size: 3rem;
    text-align: center;
  }
}
</style>