<template>
  <div>
    <ul class="box">
      <li
        v-for="(item, i) in list"
        :key="i"
        @click="ovs = item"
       
        :class="{ active: ovs == item }"
      >
        <router-link
          :to="{
            name: 'typeList',
            query: {
              name: item,
            },
          }"
          >{{ item }}</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { getType } from "../tools/ajax";
export default {
  name: "Navs",

  data() {
    return {
      list: [],
      ovs: "",
    };
  },
  created() {
    getType().then((data) => {
      this.list = data.splice(0, 9);
    });
  },
  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.box {
  width: 1220px;
  height: 50px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  li:hover {
    background: purple;
    color: #dedede;
  }
  li a {
    padding: 0 40px;
    border-radius: 20px;
    line-height: 30px;
    transition: all 0.3s;
  }
  .active {
    background: purple;
  }
    .active a{
    color: white;
    }
  li {
    // overflow: hidden;
    border-radius: 20px;
    line-height: 30px;
    transition: all 0.3s;
  }
}
// $color : purple;
// .router-link-exact-active {
//   border-bottom: 1px solid $color;
// }
</style>