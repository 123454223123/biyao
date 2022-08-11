<template>
  <div class="box">
    <Navs></Navs>
    <!-- 轮播图代码 -->

    <div class="wrap">
      <div class="block text-center" m="t-4">
        <el-carousel trigger="click" height="500px">
          <el-carousel-item v-for="item in list" :key="item" initial-index="2">
            <img :src="item" alt="" />
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>

    <!-- 触底加载数据列表 -->
    <ul
      v-infinite-scroll="load"
      class="infinite-list shopWrap"
      infinite-scroll-distance="200"
    >
      <li v-for="(item, i) in goodList" :key="i">
        <router-link :to="'/detail?id='+item.Id">
            <img v-lazy="item.imageUrl" alt="" />
            <h4>{{ item.title }}</h4>
            <p>
              <span class="price">￥{{ item.priceStr }}</span>
              <span class="mack">
                <!-- <p v-html="item.mark"></p> -->
                <span
                  style="
                    color: #ffffff;
                    background: #ab7fd1;
                    border-color: #ab7fd1;
                  "
                  >爆品</span
                >
                <span style="color: #fb4c81; background: ; border-color: #fb4c81"
                  >一起拼</span
                >
              </span>
            </p>
        </router-link>
      </li>
    </ul>

    <el-backtop :bottom="100">
      <div
        style="
          height: 100%;
          width: 100%;
          background-color: purple;
          color: white;
          text-align: center;
          line-height: 40px;
          font-size: 10px;
        "
      >
        回到顶部
      </div>
    </el-backtop>
  </div>
</template>

<script>
import { getBanner, getGoodList } from "../tools/ajax.js";
import Navs from "../components/Navs.vue";

export default {
  name: "HomeView",
  data() {
    return {
      list: ["http://192.168.207.71:1024/images/a.jpg"],
      goodList: [],
      page: 1,
    };
  },
  components: {
    Navs,
  },
  created() {
    //请求轮播图
    getBanner().then((data) => {
      this.list = data.data;
    });
    // 请求列表数据
    getGoodList({
      page: this.page,
    }).then((data) => {
      console.log(data);
      this.goodList.push(...data);
    });
  },
  methods: {
    load() {
      this.page++;
      console.log(this.page);
    },
  },
  watch: {
    page() {
      // 请求列表数据
      getGoodList({
        page: this.page,
      }).then((data) => {
        this.goodList.push(...data);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.box {
  width: 100%;
}
.wrap {
  width: 1200px;
  height: 500px;
  margin: auto;
  border-radius: 20px;
  overflow: hidden;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.shopWrap {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  li {
    width: 220px;
    text-decoration: none;
    color: #000;
    text-align: left;
    border: 1px solid #d3d3d3;
    margin: 30px 0 0 17px;
    p {
      display: flex;
      justify-content: space-between;
    }
    img {
      width: 160px;
      height: 160px;
      margin: 20px 30px;
      display: block;
    }
  }
  .price {
    color: #ff4500;
    font-weight: bolder;
    font-size: 18px;
  }
}
</style>