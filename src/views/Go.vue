<template>
  <div class="box">
    <div class="inputs">
      <el-input
        v-model="inner"
        size="large"
        placeholder="请输入用户名"
        :prefix-icon="Avatar"
        @focus="testFlag1 = false"
      />
      <p v-show="testFlag1">只能包含数字、字母、下划线6-12位</p>
    </div>
    <div class="inputs">
      <el-input
        v-model="pwd"
        type="password"
        size="large"
        placeholder="请输入密码"
        :prefix-icon="Key"
        @focus="testFlag2 = false"
      />
      <p v-show="testFlag2">只能包含数字、字母、下划线6-12位</p>
    </div>
    <div class="inputs">
      <el-row>
        <el-button type="success" size="large" @click="sumbits" :plain="true"
          >登录</el-button
        >
      </el-row>
    </div>
  </div>
</template>
<script setup>
import { Key, Avatar } from "@element-plus/icons-vue";
</script>
<script>
import { getLogin } from "../tools/ajax.js";
export default {
  name: "Go",

  data() {
    return {
      inner: "",
      pwd: "",
      testFlag1: false,
      testFlag2: false,
    };
  },

  mounted() {},

  methods: {
    sumbits() {
      let p = /^[0-9a-zA-Z_]{6,12}$/;

      // 验证账号格式
      if (p.test(this.inner)) {
        // 验证密码格式
        if (p.test(this.pwd)) {
          setTimeout(() => {
            localStorage.setItem("s1", this.inner);
            var to = this.$route.query.to;

            getLogin({
              userName: this.inner.toString(),
              password: this.pwd.toString(),
            }).then((res) => {
              //判断是否登录成功
              if (res.code == 1) {
                this.open2("恭喜你登录成功", "success");
                this.$store.commit("setToken", res.token);

                setTimeout(() => {
                  this.$router.replace("/"); //没有历史记录
                }, 500);
              } else {
                this.open2("账号或密码错误", "error");
              }

              this.inner = this.pwd = "";
            });
          }, 2000);
        } else {
          this.testFlag2 = true;
        }
      } else {
        this.testFlag1 = true;
      }
    },
    // 注册提醒方法
    open2(txt, typess) {
      this.$message({
        message: txt,
        type: typess,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  width: 400px;
  margin: 80px auto;

  p {
    color: red;
    font-size: 12px;
  }

  .el-input__inner {
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    padding: 0 20px;
  }
  .inputs {
    margin-top: 20px;
    height: 40px;
  }

  button {
    display: block;
    width: 100%;
    margin-top: 10px;
    background: #85ce61;
    border-color: #85ce61;
    color: #fff;
  }
}
</style>