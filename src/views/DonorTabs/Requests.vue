<template>
  <div class="tab">
    <div class="tab_header">
      <div class="abs_center_xy z3 width_full">
        <h2 class="tsz2_2 ta_center">5 Donation</h2>
        <h3 class="ta_center tsz_2">Requests</h3>
      </div>
      <img class="pos_abs width_full" src="@/assets/images/split.svg" alt="" />
    </div>
    <v-card class="mx-auto" max-width="344">
      <v-card-text>
        <p class="text-h4 text--primary">B+ Requested at</p>
        <p>Nyeri Level 5 Hospital</p>
        <div class="text--primary">
          This request comes from Jane Kimani. A student at JKUAT university who
          got involved in accident while crossing the East road bypass. Great
          efforts have been made for her and she would greatly appreciate any
          help.
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="reveal = true"> Accept Request </v-btn>
      </v-card-actions>

      <!-- <v-expand-transition>
        <v-card
          v-if="reveal"
          class="transition-fast-in-fast-out v-card--reveal"
          style="height: 100%"
        >
          <v-card-text class="pb-0">
            <p class="text-h4 text--primary">Origin</p>
            <p>
              late 16th century (as a noun denoting a place where alms were
              distributed): from medieval Latin eleemosynarius, from late Latin
              eleemosyna ‘alms’, from Greek eleēmosunē ‘compassion’
            </p>
          </v-card-text>
          <v-card-actions class="pt-0">
            <v-btn text color="teal accent-4" @click="reveal = false">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-expand-transition> -->
    </v-card>
  </div>
</template>