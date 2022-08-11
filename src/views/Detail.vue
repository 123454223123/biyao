<template>
  <div class="box">
    <el-row>
      <el-button size="large" @click="backs">返回</el-button>
    </el-row>

    <div class="details">
      <div class="left">
        <img :src="item.imageUrl" alt="" @mouseover="moves" @mouseout="outs" />
        <ul>
          <li
            v-for="(item2, i) in imgs"
            :class="{ acitve: imgIndex == i }"
            @click="item.imageUrl = item2"
            :key="item2"
          >
            <img :src="item2" alt="" />
          </li>
        </ul>
      </div>
      <div class="right">
        <h2>{{ item.title }}</h2>
        <p class="sp1">{{ item.supplier }}</p>
        <p class="prive">￥{{ item.priceStr }}</p>
        <el-rate
          v-model="value"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}"
        />
        <el-button type="danger" size="large" @click="adds"
          >添加到购物车</el-button
        >
      </div>

      <div class="mark" v-show="flag">
        <img :src="item.imageUrl" alt="" />
      </div>
    </div>

    <!-- 相似商品推荐 -->
    <div class="leisi">相似商品推荐</div>
    <!-- 列表 -->
    <ul class="list shopWrap">
      <li v-for="(item, i) in tongGoList" :key="i">
        <router-link :to="'/detail?id=' + item.Id">
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

    <!-- 底部 -->
    <div class="fooder">
      <img src="http://192.168.207.71:1024/img/footer.0a9e9872.png" alt="" />
    </div>

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

    ----- {{ token }}
  </div>
</template>
<script setup>
import { Back } from "@element-plus/icons-vue";
</script>
<script>
import { getDetail, getSameList, getShopList } from "../tools/ajax";
import { mapState } from "vuex";
import {ElMessage } from "element-plus";
export default {
  name: "Detail",

  data() {
    return {
      item: {},
      imgs: [],
      value: 3.7,
      imgIndex: 0,
      flag: false,
      tongGoList: [],
    };
  },
  created() {
    getDetail({
      goodId: this.$route.query.id,
    }).then((res) => {
      this.item = res[0];

      this.imgs = this.item.imgs.split("[")[1].split(",").splice(0, 5);

      this.imgs.forEach((n, i) => {
        this.imgs[i] = n.split('"')[1];
      });
      console.log(this.item);

      // 请求同类商品
      this.tongList();
    });
  },
  mounted() {
    document.body.scrollTop= document.documentElement.scrollTop = 0
  },
  computed: {
    ...mapState(["token"]),
  },
  methods: {
    backs() {
      this.$router.back();
    },
    moves() {
      this.flag = true;
    },
    outs() {
      this.flag = false;
    },
    tongList() {
      getSameList({
        supplier: this.item.supplier,
      }).then((res) => {
        this.tongGoList = res;
        console.log(this.tongGoList);
      });
    },

    // 添加购物车方法
    adds() {
      // getShopList({
      //   token,
      // }).then(res=>{
      //   console.log(res);
      // })

      if (this.token) {
        // 发送添加购物车请求
        getShopList({
          goodId: this.item.Id,
          token: this.token,
        }).then((res) => {
          console.log(res.code);
          if (res.code == 0) {
            ElMessage.warning("登录过期，即将跳转到登录页");
            setTimeout(() => {
              this.$router.push("/go");
            }, 500);
          } else if (res.code == 1) {
            ElMessage.success("添加成功");
          } else {
            ElMessage.error("添加失败,请稍后再试");
          }
        });
      } else {
        ElMessage.warning("您还没有登录，即将跳转到登录页");
        setTimeout(() => {
          this.$router.push("/go");
        }, 2000);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  width: 1000px;
  height: 1000px;
  margin: 0 auto;
}
.details {
  width: 1000px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  .mark {
    position: absolute;
    width: 400px;
    height: 400px;
    right: 200px;
    top: 0px;
    overflow: hidden;
    img {
      width: 800px;
      height: 800px;
      display: block;
    }
  }
  .left {
    width: 400px;
    height: 483px;
    & > img {
      display: block;
      width: 400px;
      height: 400px;
      border: 1px solid black;
    }
    li {
      width: 82px;
      height: 82px;
      border: 2px solid #fff;
      overflow: hidden;
    }
    ul {
      display: flex;
      justify-content: space-between;
      margin-top: 5px;

      .active {
        border: 2px solid #6e496e;
      }
      img {
        width: 80px;
        display: inline-block;
        height: 80px;
      }
    }
  }
  .right {
    margin-right: 140px;
    width: 180px;
    height: 240px;
    text-align: left;
    h2 {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .prive {
      color: red;
    }
    .sp1 {
      margin: 10px 0;
    }
    .el-rate {
      margin: 20px 0;
    }
  }
}
.leisi {
  width: 100%;
  margin: 20px 0;
  padding: 10px 0;
  text-align: left;
  border-bottom: 1px solid #999;
}
.list {
  width: 100%;
  height: 288px;
}
.fooder {
  width: 100%;
  height: 392px;
  img {
    display: block;
    width: 100%;
    height: 392px;
  }
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