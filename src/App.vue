<template>
  <v-app>
    <!-- <div class="full" @click="goFullScreen"></div> -->
    <v-main class="pos-rel">
      <v-btn
        @click="goBack"
        id="pos_route"
        fab
        dark
        small
        color="transparent"
        depressed
        v-if="$route.path !== '/'"
      >
        <v-icon dark> mdi-arrow-left </v-icon>
      </v-btn>
      <transition
        enter-active-class="animated fadeInUp fast"
        leave-active-class="animated fadeOutDown fast"
      >
        <router-view />
      </transition>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
  methods: {
    goBack() {
      console.log(this.$router.back());
    },
    goFullScreen() {
      document
        .querySelector(".v-application--wrap")
        .removeChild(document.querySelector(".full"));
      document.body
        .requestFullscreen()
        .then((e) => {
          console.log(e);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {},
};
</script>
<style>
@import "./assets/styles/utilityClasses.css";
@import "./assets/styles/animate.css";
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: black;
}
#pos_route {
  position: fixed;
  z-index: 10;
}
.full {
  position: fixed;
  z-index: 4;
  width: 100vw;
  height: 100vh;
}
.page {
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
}
.v-slide-group__prev {
  display: none !important;
  width: 0 !important;
}
</style>