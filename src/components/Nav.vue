<template>
  <el-row class="tac">
    <el-col :span="12">
      <h3>小U商城后台管理</h3>
      <!-- <el-menu class="el-menu-vertical-demo" router > -->
      <el-menu class="page-menu" router :default-active="$route.path" :collapse="iscollapse">
        <el-menu-item index="/index">
          <i class="el-icon-house"></i>
          <span slot="title">后台首页</span>
        </el-menu-item>
        <template v-for="(item,index) in menus">
          <el-menu-item v-if="item.type==2" :index="item.url">
            <i :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
          <el-submenu v-else :index="index+''">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{item.title}}</span>
            </template>
            <el-menu-item
              :index="val.url"
              v-for="(val,idx) in item.children"
              :key="idx"
            >{{val.title}}</el-menu-item>
          </el-submenu>
        </template>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  computed: {
    ...mapState(["iscollapse"]),
    ...mapGetters({
      menus: "user/menus",
    }),
  },
  watch: {},
};
</script>

<style scoped >
.tac {
  margin-top: 100px;
}
.tac div h3 {
  text-align: center;
}
.el-col-12 {
  width: 100%;
}
</style>
