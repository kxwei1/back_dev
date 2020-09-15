<template>
  <el-row class="login-bg">
    <el-col :span="8" class="login-box">
      <h3>xxx后台管理</h3>
      <el-form
        :model="userInfo"
        status-icon
        ref="form"
        label-width="100px"
        class="demo-ruleForm"
        :rules="rules"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="userInfo.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password">
          <el-input type="password" v-model="userInfo.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="submit()">登陆</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import { mapActions } from "vuex";

export default {
  components: {},
  props: {},
  data() {
    return {
      userInfo: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ required: true, message: "必填！", trigger: "blur" }],
        password: [{ required: true, message: "必填！", trigger: "blur" }],
      },
    };
  },
  mounted() {},
  methods: {
    ...mapActions({
      login: "user/login",
    }),
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.login(this.userInfo);
        }
      });
    },
  },
  computed: {},
  watch: {},
};
</script>

<style scoped>
.login-bg {
  background-color: aquamarine;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-box {
  height: 400px;
  background-color: beige;
  padding: 20px 40px;
  text-align: center;
  border-radius: 10px;
}
.login-box h3 {
  margin: 50px 0 20px;
}
</style>
