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
        <el-input v-model="forminfo.rolename" placeholder="请输入名称"></el-input>
      </el-form-item>

      <el-form-item label="权限">
        <el-tree
          check-on-click-node
          ref="tree"
          :data="menulist"
          show-checkbox
          node-key="id"
          default-expand-all
          :props="{children:'children',label:'title'}"
          :check-strictly="checkStrictly"
        ></el-tree>
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
import { addRole, editRole } from "@/request/role";
import { mapGetters, mapActions } from "vuex";
let defaultItem = {
  rolename: "",
  menus: [],
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
      menulist: "menu/menulist",
    }),
  },
  mounted() {
    if (!this.menulist.length) {
      this.get_menu_list();
    }
    this.forminfo = { ...resetItem };
  },
  methods: {
    ...mapActions({
      get_menu_list: "menu/get_menu_list",
      get_role_list: "role/get_role_list",
    }),
    setinfo(val) {
      let idarr = val.menus.split(",");
      if (idarr[0]) {
        this.checkStrictly = true;
        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys(idarr);
          this.checkStrictly = false;
        });
      }
      // 将数据赋给默认defaultItem; 赋给表单
      defaultItem = { ...val };
      this.forminfo = { ...val };
    },
    async sumbit() {
      let idarr = this.$refs.tree
        .getCheckedKeys()
        .concat(this.$refs.tree.getHalfCheckedKeys());
      if (idarr.length) {
        this.forminfo.menus = idarr;
      } else {
        this.$message.warning("请选择权限");
        return;
      }
      // 表单验证！

      this.$refs.form.validate(async (valid) => {
        if (valid) {
          // 如果验证通过！
          let res;
          if (this.info.isAdd) {
            // 添加还是修改！
            res = await addRole(this.forminfo);
          } else {
            res = await editRole(this.forminfo);
          }
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.info.isShow = false;
            this.get_role_list();
          } else {
            this.$message.error(res.msg);
          }
        }
      });
    },
    reset() {
      if (this.info.isAdd) {
        this.forminfo = { ...resetItem };
        this.$refs.tree.setCheckedKeys([]);
      } else {
        this.setinfo({ ...defaultItem });
      }
    },
    cancel() {
      this.forminfo = { ...resetItem };
      this.$refs.tree.setCheckedKeys([]);
    },
  },
  components: {},
};
</script>
<style scoped>
</style>