<template>
  <div>
    <el-button type="primary" @click="add">添加菜单</el-button>
    <List @edit="edit" />
    <Info :info="info" ref="dialog" />
  </div>
</template>

<script>
import Info from "@/pages/System/Menu/info";
import List from "@/pages/System/Menu/list";
export default {
  components: {
    Info,
    List,
  },
  props: {},
  data() {
    return {
      info: {
        isAdd: true,
        isShow: false,
      },
    };
  },
  mounted() {},
  methods: {
    add() {
      this.info.isAdd = this.info.isShow = true;
    },
    edit(val) {
      this.info.isAdd = false;
      this.info.isShow = true;
      // 调用弹框组件的setinfo方法！
      console.log(val);
      this.$refs.dialog.setinfo(val);
    },
  },
  computed: {},
  watch: {},
};
</script>

<style scoped>
</style>
