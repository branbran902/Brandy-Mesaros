<template>
  <div id="app">
    <Header />
    <Resume />
    

    <b-button type="button" id="menuBtn" class="btn right">
     <b-icon icon="menu-up"></b-icon>
    </b-button>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Resume from "./components/Resume.vue";

export default {
  name: "App",
  components: {
    Header,
    Resume,
  },
};
</script>

<style>
#app {
  font-family: Segoe UI;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
</style>
