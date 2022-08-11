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
        size="large"
        @focus="testFlag2 = false"
        :prefix-icon="Key"
        type="password"
        placeholder="请输入密码"
      />
      <p v-show="testFlag2">只能包含数字、字母、下划线6-12位</p>
    </div>
    <div class="inputs">
      <el-input
        v-model="pwd2"
        :prefix-icon="Key"
        size="large"
        @focus="testFlag3 = false"
        type="password"
        placeholder="请确认密码"
      />
      <p v-show="testFlag3">两次输入的密码不一致</p>
    </div>
    <div class="inputs">
      <el-row>
        <el-button type="success" :plain="true" size="large" @click="sumbits"
          >登录</el-button
        >
      </el-row>
    </div>

    <!-- 消息提醒、 -->
  </div>
</template>
<script setup>
import { Key,Avatar } from "@element-plus/icons-vue";
</script>


<script>
import { getGoodList, getRegister } from "../tools/ajax.js";
export default {
  data() {
    return {
      inner: "",
      pwd: "",
      pwd2: "",
      testFlag1: false,
      testFlag2: false,
      testFlag3: false,
    };
  },
  created() {
    getGoodList({
      page: 1,
    }).then((res) => {
      console.log(res);
    });
  },
  methods: {
    sumbits() {
      let p = /^[0-9a-zA-Z_]{6,12}$/;

      // 验证账号格式
      if (p.test(this.inner)) {
        // 验证密码格式
        if (p.test(this.pwd)) {
          // 验证两次密码是否相同
          if (this.pwd == this.pwd2) {
            // 通过验证

            getRegister({
              userName: this.inner.toString(),
              password: this.pwd.toString(),
            }).then((res) => {
              if (res.code == 1) {
                this.open2("恭喜你，注册成功","success");

                setTimeout(() => {
                  this.$router.push("/go");
                }, 2000);
              }else{
                  this.open2("用户名被占用","warning");
              }
            });
          } else {
            this.testFlag3 = true;
          }
        } else {
          this.testFlag2 = true;
        }
      } else {
        this.testFlag1 = true;
      }
    },

    // 注册提醒方法
    open2(txt,typess) {
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