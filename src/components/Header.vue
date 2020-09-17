<template>
  <div class="header">
    <div class="box">
      <el-button @click="TOGGLE">展开</el-button>
      <el-breadcrumb class="nav" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button
        size="small"
        v-if="$route.path!='/index'"
        @click="$router.back()"
        icon="el-icon-back"
        circle
      ></el-button>
    </div>
    <div>
      <el-dropdown>
        <span class="el-dropdown-link">
          欢迎
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="togglescreenfull">
            <i class="el-icon-full-screen"></i>
            {{isfull ? '退出全屏':'全屏操作'}}
          </el-dropdown-item>
          <el-dropdown-item>
            <i class="el-icon-switch-button"></i>
            <span @click="QUIT">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import screenfull from 'screenfull'

export default {
  components: {},
  props: {},
  data() {
    return {
          isfull:false
    };
  },
  mounted() {},
  methods: {
    ...mapMutations({ TOGGLE: "TOGGLE", QUIT: "user/QUIT" }),
    togglescreenfull() {
      if (!screenfull.isEnabled) {
        this.$message.warning("您的浏览器不支持全屏");
        return false;
      }
      this.isfull = !this.isfull;
      screenfull.toggle();
    },
  },
  computed: {
    ...mapState(["iscollapse"]),
  },
  watch: {},
};
</script>

<style scoped>
.box {
  display: flex;
  align-items: center;
}
.nav {
  margin: 0 20px;
}
</style>
