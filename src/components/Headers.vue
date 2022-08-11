<template>
  <div class="box" ref="top">
    <div class="top">
      <img src="http://192.168.207.71:1024/img/logo.57933597.png" alt="" />
      <div class="top-search" v-show="flag">
        <input
          type="text"
          placeholder="请输入想要的商品"
          @focus="ju"
          @blur="shi"
          v-model="txts"
          ref="inputss"
        />
        <button @click="gogo">
          <img src="../assets/搜索(1).png" alt="" />
          搜索
        </button>
      </div>
    </div>

    <!-- 登录页面 -->
    <div class="boxs" ref="bottom" v-if="!token">
      <div class="boxss">
        <ul class="bottom">
          <li><router-link to="/">首页</router-link></li>
          <li><router-link to="/go">登录</router-link></li>
          <li><router-link to="/register">注册</router-link></li>
        </ul>

        <div class="top-search top-search2" v-show="!flag">
          <input
            type="text"
            placeholder="请输入想要的商品"
            @focus="ju"
            @blur="shi"
            v-model="txts"
            ref="inputss"
          />
          <button @click="gogo">
            <img src="../assets/搜索(1).png" alt="" />
            搜索
          </button>
        </div>
      </div>
    </div>

    <!-- 购物车页面 -->

    <div class="boxs" ref="bottom" v-else>
      <div class="boxss">
        <ul class="bottom">
          <li><router-link to="/">首页</router-link></li>
          <li><router-link to="/shops">购物车</router-link></li>
          <li @click="logout" style="cursor: pointer">退出登录</li>
        </ul>

        <div class="top-search top-search2" v-show="!flag">
          <input
            type="text"
            placeholder="请输入想要的商品"
            @focus="ju"
            @blur="shi"
            v-model="txts"
            ref="inputss"
          />
          <button @click="gogo">
            <img src="../assets/搜索(1).png" alt="" />
            搜索
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Headers",

  data() {
    return {
      flag: true,
      txts: "",
    };
  },

  mounted() {
    // 滚动窗口时触发
    window.onscroll = () => {
      // 页面滚动高度
      var st = document.body.scrollTop || document.documentElement.scrollTop;
      if (st > 100) {
        this.flag = false;
        this.$refs.bottom.classList.add("actives");
      }

      if (st < 100) {
        this.flag = true;
        this.$refs.bottom.classList.remove("actives");
      }
    };
  },
  computed: {
    ...mapState(["token"]),
  },
  methods: {
    ju() {
      this.$refs.inputss.style.border = " 1px solid purple";
    },
    shi() {
      this.$refs.inputss.style.border = "1px solid #dcdfe6";
    },
    logout() {
      // 清理状态管理和本地登录状态
      this.$store.commit("setToken", "");
      // 提示已退出
      this.open2("账号已退出", "message");
      // 如果当前是购物车页就跳回到主页
      // if (this.$route.path == "/shopCar") {
      setTimeout(() => {
        this.$router.push("/");
      }, 0);
      // }
    },
    // 注册提醒方法
    open2(txt, typess) {
      this.$message({
        message: txt,
        type: typess,
      });
    },
    gogo() {
      if (!this.txts) {
          this.open2("搜索内容不能为空", "warning");
      } else {
        // 有关键字时,跳转到搜索页
        // 如果两次跳转的页面路径和参数相同,会报错, 搜索关键字不同时再跳转
        if (this.$route.query.key != this.txts) {
          this.$router.push("/searchlist?key=" + this.txts);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$color: purple;
.box {
  width: 100%;
  box-shadow: 0 2px 6px #999;
  padding-top: 20px;
  margin-bottom: 10px;
  height: 140px;
}
.top {
  width: 1200px;
  margin: 0 auto;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    width: 188px;
    display: block;
  }
}
.top-search {
  width: 600px;
  height: 40px;
  display: flex;
  input {
    width: 400px;
    height: 40px;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid #dcdfe6;
    color: #606266;
    display: inline-block;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  button {
    width: 89px;
    height: 100%;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    display: flex;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    transition: 0.1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    img {
      width: 14px;
      height: 14px;
      display: inline-block;
      padding-right: 4px;
    }
  }
  button:hover {
    background-color: rgba(128, 0, 128, 0.06274509803921569);
    color: purple;
    border: 0.5px solid rgba(128, 0, 128, 0.26666666666666666);
  }
}
.boxs {
  width: 100%;
  background: #fff;
  z-index: 99999;
}
.actives {
  position: fixed;
  top: 0;
  box-shadow: 0 2px 6px #999;
}
.boxss {
  width: 1200px;
  height: 61px;
  margin: 0 auto;
  position: relative;
  .top-search2 {
    position: absolute;
    right: 0px;
    top: 12px;
  }
}
.bottom {
  width: 1200px;
  margin: 0 auto;
  height: 21px;
  display: flex;
  padding: 20px 0;
  li {
    margin: 0 10px 0 30px;
    padding: 0 10px 10px 0;
    font-weight: 700;
  }
  li a:hover {
    color: purple !important;
    padding-bottom: 5px;
    border-bottom: 2px solid purple;
  }
  .active {
    color: purple !important;
    padding-bottom: 5px;
    border-bottom: 2px solid purple;
  }
}

.router-link-exact-active {
  color: $color;
  border-bottom: 1px solid $color;
}
</style>