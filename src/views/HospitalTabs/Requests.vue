<template>
  <div class="tab">
    <div class="tab_header">
      <div class="abs_center_xy z3 width_full">
        <h3 class="ta_center tsz_2">5 Pending Requests</h3>
        <h3 class="ta_center tsz_2">2 Requests Accepted</h3>
      </div>

      <img class="pos_abs width_full" src="@/assets/images/split.svg" alt="" />
    </div>
    <v-card class="pa10 mb10">
      <h3>Accepted Requests</h3>
      <v-card class="mx-auto" max-width="344">
        <v-card-text v-for="accept in accepted" :key="accept.type">
          <p class="text--primary">{{ accept.type }} request, accepted by</p>
          <div class="text--primary">
            {{ accept.donorName }}
          </div>
          <div class="text--primary">
            {{ accept.donorEmail }}
          </div>
        </v-card-text>
        <v-card-actions> </v-card-actions>
      </v-card>
    </v-card>
    <v-card class="pa10">
      <h3>Pending Requests</h3>
      <v-card class="mx-auto mb10" max-width="344">
        <v-card-text v-for="pend in pending" :key="pend.type">
          <p class="text--primary">{{ pend.type }}</p>
          <div class="text--primary">
            {{ pend.description }}
          </div>
        </v-card-text>
      </v-card>
    </v-card>
    <v-dialog v-model="showForm" width="500">
      <v-card>
        <form class="form_page_form ma10 pa20 round20">
          <h2>Send out New Request</h2>
          <v-select
            v-model="bloodType"
            :items="bloodTypes"
            item-text="Blood Type"
            item-value="abr"
            label="Blood Type"
            required
          ></v-select>
          <v-text-field
            v-model="description"
            label="Description"
            required
          ></v-text-field>
          <v-btn
            class="mr-4 mb10"
            rounded
            block
            color="#E5006E"
            @click="addRequest"
          >
            Send
          </v-btn>
          <v-btn class="mr-4" rounded block @click="showForm = false">
            Cancel
          </v-btn>
        </form>
      </v-card>
    </v-dialog>
    <v-btn
      id="req_fab"
      class="mx-2"
      fab
      dark
      @click="showForm = true"
      small
      color="primary"
    >
      <v-icon dark> mdi-plus </v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showForm: false,
      bloodType: "",
      bloodTypes: ["A+", "A-", "B+", "B-", "0+", "0-", "AB+", "AB-"],
      description: "",
      accepted: [
        {
          type: "0+",
          donorName: "James Kimani",
          donorEmail: "jamesk@gmail.com",
        },
      ],
      pending: [
        {
          type: "B+ Request",
          description:
            "This request comes from Jane Kimani. A student at JKUAT university who got involved in accident while crossing the East road bypass. Great efforts have been made for her and she would greatly appreciate any help.",
        },
      ],
    };
  },
  methods: {
    addRequest() {
      const pending = {
        type: `${this.bloodType} Request`,
        description: this.description,
      };
      this.pending.unshift(pending);
      this.showForm = false;
      (this.bloodType = ""), (this.description = "");
    },
  },
};
</script>

<style scoped>
#req_fab {
  position: fixed !important;
  bottom: 80px;
  right: 10px;
}
</style>