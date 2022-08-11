<template>
  <div>
    <!-- 触底加载数据列表 -->
    <ul class="shopWrap">
      <li v-for="item in goodList" :key="item.Id">
        <router-link :to="'/detail?id=' + item.Id">
          <img v-lazy="item.imageUrl" alt="" />
          <h4>{{ item.title }}</h4>
          <p>
            <span class="price">￥{{ item.priceStr }}</span>
            <span class="mack">
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
    这是一个注册页面
    {{ this.$route.query.key }}
  </div>
</template>

<script>
import { getSearch } from "../tools/ajax.js";
export default {
  name: "SearchList",

  data() {
    return {
      goodList: [],
      page: 1,
    };
  },
  created() {
    // 请求列表数据
    getSearch({
      word: this.$route.query.key,
    }).then((data) => {
      this.goodList = data;
    });
  },
  methods: {},
  beforeRouteUpdate(to, from, next) {
    // 路由跳转前后的对应的组件相同(路由切换前后,路由path相同)时,会执行路由更新这个生命周期函数,  如当前是搜索页,点击按钮仍然跳转到搜索页
    console.log("路由更新", this.$route, from, to);
    // 当此页面路由更新时,通过路由中的关键字重新搜索商品,进行展示
    getSearch({ word: to.query.key }).then((res) => {
      this.goodList = res;
    });
    next();
  },
};
</script>

<style lang="scss" scoped>
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