<template>
  <el-container>
    <el-aside width="200px">
      <Nav></Nav>
    </el-aside>
    <el-container>
      <el-header height>
        <!-- Header content -->
        <Header></Header>
      </el-header>
      <el-main height>
        <!-- Main content -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from "@/components/Header";
import Nav from "@/components/Nav";
export default {
  components: {
    Header,
    Nav,
  },
  props: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  computed: {},
  watch: {},
};
</script>

<style scoped>
.layout {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
  display: flex;
}
.nav {
  width: 100%;
  background-color: #777;
  height: 100vh;
}
.container {
  flex: 1;
  height: 100vh;
  background-color: orange;
  display: flex;
  flex-direction: column;
}
.header {
  background-color: lightblue;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  padding: 0 20px;
}
.header a {
  color: inherit;
}
.main {
  border: 10px solid green;
  flex: 1;
}
</style>
