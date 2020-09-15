<template>
  <el-dialog
    :title="info.isAdd ? '添加菜单':'修改菜单'"
    @close="cancel"
    :visible.sync="info.isShow"
    width="40%"
  >
    <!-- 表单 -->
    <el-form :model="forminfo" ref="form" :rules="rules" label-width="140px">
      <el-form-item label="角色名称">
        <el-select v-model="forminfo.roleid" placeholder="请选择">
          <el-option
            v-for="(item,index) in rolelist"
            :key="index"
            :label="item.rolename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="管理员名称">
        <el-input v-model="forminfo.username" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="管理员密码">
        <el-input v-model="forminfo.password" show-password placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="forminfo.status" :active-value="1" :inactive-value="2"></el-switch>
      </el-form-item>
      <el-form-item label>
        <el-button type="primary" @click="sumbit">提交</el-button>
        <el-button type="warning" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
// 导入  添加和修改的 请求封装方法！
import { addUser, editUser } from "@/request/user";
import { mapGetters, mapActions } from "vuex";
let defaultItem = {
  roleid: "",
  username: "",
  password: "",
  status: 1, // 状态1正常2禁用
};
let resetItem = { ...defaultItem };
export default {
  props: {
    info: {
      type: Object,
      default() {
        return {
          isAdd: true,
          isShow: false,
        };
      },
    },
  },
  data() {
    return {
      forminfo: { ...defaultItem },
      rules: {
        title: [{ required: true, message: "必填！", trigger: "blur" }],
      },
      checkStrictly: false,
    };
  },
  computed: {
    ...mapGetters({
      rolelist: "role/rolelist",
    }),
  },
  mounted() {
    if (!this.rolelist.length) {
      this.get_role_list();
    }
    this.forminfo = { ...resetItem };
  },
  methods: {
    ...mapActions({
      get_role_list: "role/get_role_list",
      get_user_list: "user/get_user_list",
    }),
    setinfo(val) {
      // 将数据赋给默认defaultItem; 赋给表单
      defaultItem = { ...val };
      this.forminfo = { ...val };
    },
    async sumbit() {
      // 表单验证！
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          // 如果验证通过！
          let res;
          if (this.info.isAdd) {
            // 添加还是修改！
            res = await addUser(this.forminfo);
          } else {
            res = await editUser(this.forminfo);
          }
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.info.isShow = false;
            this.get_user_list();
          } else {
            this.$message.error(res.msg);
          }
        }
      });
    },
    reset() {
      if (this.info.isAdd) {
        this.forminfo = { ...resetItem };
      } else {
        this.setinfo({ ...defaultItem });
      }
    },
    cancel() {
      this.forminfo = { ...resetItem };
    },
  },
  components: {},
};
</script>
<style scoped>
</style>