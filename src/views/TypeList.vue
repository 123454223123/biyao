<template>
  <div>
    <Navs></Navs>
    <!-- <h1>{{ $route.query.name }}</h1> -->
    <!-- 侧边标题页面 -->
    <ul class="navs">
      <li
        v-for="(item, index) in new_list"
        :class="{ active: currentIndex == index, type_title: true }"
        @click="goIndex(index)"
        :key="item.type"
      >
        {{ item.type }}
      </li>
    </ul>

    <!-- 列表页面 -->
    <ol class="box">
      <li v-for="item in new_list" :key="item.type">
        <h2 ref="type_view">{{ item.type }}</h2>
        <ul class="shopWrap">
          <li v-for="item2 in item.list" :key="item2.Id">
            <router-link :to="'/detail?id=' + item2.Id">
              <img v-lazy="item2.imageUrl" alt="" />
              <h4>{{ item2.title }}</h4>
              <p>
                <span class="price">￥{{ item2.priceStr }}</span>
                <span class="mack">
                  <span
                    style="
                      color: #ffffff;
                      background: #ab7fd1;
                      border-color: #ab7fd1;
                    "
                    >爆品</span
                  >
                  <span
                    style="color: #fb4c81; background: ; border-color: #fb4c81"
                    >一起拼</span
                  >
                </span>
              </p>
            </router-link>
          </li>
        </ul>
      </li>
    </ol>
  </div>
</template>

<script>
import Navs from "../components/Navs.vue";
import { getGoodList } from "../tools/ajax";
export default {
  name: "TypeList",

  data() {
    return {
      list: [],
      count: 0,
      currentIndex: 0,
    };
  },

  // 路由进入时,第一次请求数据
  beforeRouteEnter(to, from, next) {
    console.log("路由进入");
    //在路由进入之前, 组件还没有创建,所在这个函数中不能用this, next函数一旦执行,表示允许路由进入, 组件随之开始创建并初始化
    next((vm) => {
      // next的参数是组件创建之后的回调函数, 参数vm就表示即将创建创建的当前组件
      vm.getLists(to);
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.getLists(to);
    next();
  },
  components: {
    Navs,
  },
  computed: {
    // 重置商品列表的结构
    new_list() {
      var newList = [];
      for (var i = 0; i < this.list.length; i++) {
        // 默认标记新数组中没有对应分类和当前商品的二级分类相同
        var hasType = false;
        // 循环新数组
        for (var j = 0; j < newList.length; j++) {
          // 判断如果新数组中已经存在当前商品的二级类型
          if (this.list[i].type_two == newList[j].type) {
            // 把当前商品添加到新数组中对应的分类列表
            newList[j].list.push(this.list[i]);
            // 标记当前存在对应的分类
            hasType = true;
            // 找到对应分类之后,结束本次新数组的循环
            break;
          }
        }
        // 如果判断结果是,新数组中没有对应的二级分类
        if (!hasType) {
          newList.push({
            type: this.list[i].type_two,
            list: [this.list[i]],
          });
        }
      }
      console.log(2, newList);
      return newList;
    },
  },
  methods: {
    getLists(to) {
      getGoodList({
        type_one: to.query.name,
      }).then((data) => {
        console.log(1, data);
        this.list = data;
      });
    },
    goIndex(index) {
      this.currentIndex = index;

      var h = this.$refs.type_view[index].offsetTop;
      document.body.scrollTop = document.documentElement.scrollTop = h - 70;
    },

    // 滚动监听函数, 当网页滚动时,左侧二级分类标题联动
    scrollHandle() {
      // 因为滚动事件触发过于频繁,造成性能浪费,可以做限流, 每触发10次滚动事件,执行1次计算
      this.count++;
      if (this.count % 10 != 0) return;

      // 当前网页滚动距离
      var scrollTop = document.scrollingElement.scrollTop;
      // 二级分类商品列表父标签
      var content = this.$refs.type_  ;
      // 循环父标签中的每一个子标签, 指得就是每一个分类标签
      for (var i = content.length - 1; i >= 0; i--) {
        // 获取每一个分类标签(.type_item)到网页顶部的距离
        var offsetTop = content[i].offsetTop;
        // 分类标签与网页顶部距离 - 网页滚动距离 = 分类标签与窗口顶部距离
        // 判断如果分类标签与窗口顶部距离小于100说明已经滚动到这个分类了
        if (offsetTop - scrollTop < 200) {
          this.currentIndex = i;
          // 从后向前判断时,如果有一个分类位置小于窗口下200px位置,结束判断
          break;
        }
      }
    },
    bindScroll() {
      window.addEventListener("scroll", this.scrollHandle);
    },
    clearScroll() {
      window.removeEventListener("scroll", this.scrollHandle);
    },
  },
  created() {
    // 开始滚动监听
    this.bindScroll();
    // 定义全局变量
    this.count = 0;
  },
  destroyed() {
    // 取消滚动监听
    this.clearScroll();
  },
  // 当路由出口添加keep-alive缓存之后, 单页面不再重新销毁和创建, 导致页面切换时,滚动监听不能取消和添加, 所以在页面显示隐藏函数中绑定和取消事件即可
  activated() {
    this.bindScroll();
  },
  deactivated() {
    this.clearScroll();
  },
};
</script>

<style lang="scss" scoped>
body,
html {
  scroll-behavior: smooth;
}

.box {
  h2 {
    background-color: #f0f8ff;
    text-shadow: 2px 2px 2px #dcdcdc;
    padding: 20px 0;
    margin: 30px auto;
    width: 1200px;
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

.navs {
  position: fixed;
  top: 180px;
  left: 10px;
  width: 120px;
  background: #fff;
  padding: 10px;
  border: 1px solid #773f77;
  border-radius: 5px;
  list-style: none;
  li {
    line-height: 30px;
    text-align: center;
    cursor: pointer;
  }
  .active {
    color: purple;
    font-weight: bolder;
    filter: drop-shadow(0 0 10px purple);
  }
}
</style>