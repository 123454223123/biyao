<template>
  <div>
    <div class="mark" v-show="flag">
      <img src="./assets/loading.4bbc20d4.gif" alt="" />
    </div>

    
        <Headers></Headers>
      <router-view></router-view>
  </div>
</template>

<script>
import Headers from "./components/Headers.vue";
export default {
  data() {
    return {
      flag: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.flag = false;
    }, 1000);
  },
  watch: {
    $route() {
      this.flag = true;
      setTimeout(() => {
        this.flag = false;
      }, 500);
    },
  },
  components: {
    Headers,
  },
};
</script>
<style lang="scss">
.mark {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
  position: absolute;
  z-index: 999;
}
.mark img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}

a {
  text-decoration: none;
  color: #2c3e50;
}
li {
  list-style: none;
}
* {
  padding: 0;
  margin: 0;
}
</style>
