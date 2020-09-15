<template>
  <div class="header">
    <div class="box">
      <el-button @click="TOGGLE">展开</el-button>

      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-dropdown>
        <span class="el-dropdown-link">
          欢迎
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <i class="el-icon-full-screen"></i> 全屏操作
          </el-dropdown-item>
          <el-dropdown-item>
            <i class="el-icon-switch-button"></i>
            <span  @click="QUIT">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {
    ...mapMutations({ TOGGLE: "TOGGLE", QUIT: "user/QUIT" }),
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
</style>
