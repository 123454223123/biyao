<template>
  <div>
    <div class="wuShop" v-if="yeFlag">
      <h1>购物车空空如也</h1>
    </div>
    <ul class="youShop" v-else>
      <li v-for="item in list" :key="item.Id">
        <input type="checkbox" />
        <img :src="item.imageUrl" alt="" />
        <h3>{{ item.title }}</h3>

        <div class="jisuan">
          <p>￥{{ item.priceStr }}</p>
          <div>
            <button @click="ced(item.count,item.Id)">-</button>
            {{ item.count }}
            <button>+</button>
          </div>
        </div>
        <button>删除</button>
      </li>
    </ul>

    <div class="fooder">
      <div class="fooder-main">
        <!-- 全选 -->
        <div class="btns">
          <label>
            <input type="checkbox" v-model="zflag" />
            全选
          </label>
        </div>
        <!-- 总计 -->
        <div class="zj">总计 {{ num }}</div>

        <div class="js">结算</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import { getShopWrap, getRemove } from "../tools/ajax";
import { mapState } from "vuex";
export default {
  name: "Shops",

  data() {
    return {
      num: 0,
      // 绑定全选
      zflag: false,
      list: [],
      yeFlag: false,
    };
  },

  mounted() {
    // 发送添加购物车请求
    getShopWrap({
      token: this.token,
    }).then((res) => {
      this.list = res;
      console.log(res);
    });
  },

  methods: {
    // 数量减一
    ced(num,id) {
      console.log(id);
      if (num == 1) {
        console.log("ss");
        ElMessage.warning({
          message: "最后一个了，不能再减了",
          offset: 100,
        });
      } else {
        getRemove({
          token: this.token,
          goodId:id
        }).then((res) => {
            console.log(res);
        });
      }
    },
  },
  computed: {
    ...mapState(["token"]),
  },
  watch: {
    list: {
      deep: true,
      handler() {
        console.log(this.list == false);
        if (this.list == false) {
          this.yeFlag = true;
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.wuShop {
  width: 1000px;
  margin: 80px auto;
}
.youShop {
  width: 1000px;
  margin: 40px auto;
  li {
    height: 100px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: 1px solid #dcdcdc;
    border-radius: 20px;
    margin: 20px;
    padding: 20px;
  }
  img {
    width: 100px;
    height: 100px;
    border: 1px solid #dcdcdc;
    border-radius: 10px;
  }
  h3 {
    width: 400px;
  }
  .jisuan {
    width: 167px;
    height: 79px;
    p {
      color: red;
      font-size: 22px;
    }
  }
}
.fooder {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 120;
  width: 100%;
  height: 60px;
  background-color: beige;
}
.fooder-main {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.btns {
  width: 60px;
  height: 40px;
  cursor: pointer;
  margin-top: 20px;
}
.zj {
  font-weight: bold;
  font-size: 20px;
}
</style>