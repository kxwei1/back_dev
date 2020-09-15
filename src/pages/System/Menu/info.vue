<template>
  <el-dialog
    ref="dialog"
    :title="info.isAdd ? '添加':'修改'"
    @close="cancel"
    :visible.sync="info.isShow"
    width="40%"
  >
    <!-- 表单 -->
    <el-form :model="formInfo" :rules="rules" ref="form" label-width="100px">
      <el-form-item>
        <el-radio-group v-model="formInfo.type">
          <el-radio :label="1">目录</el-radio>
          <el-radio :label="2">菜单</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="上级目录" v-if="formInfo.type==2">
        <el-select v-model="formInfo.pid" placeholder="请选择活动区域">
          <el-option label="顶级目录" :value="0"></el-option>
          <el-option
            v-for="(item,index) in menulist"
            :key="index"
            :label="item.title"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="formInfo.type==1?'目录名称':'菜单名称'" prop="title">
        <el-input v-model="formInfo.title" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-input v-model="formInfo.icon" placeholder="请输入图标class"></el-input>
      </el-form-item>
      <el-form-item v-if="formInfo.type==2" label="菜单地址" prop="url">
        <el-input v-model="formInfo.url" placeholder="请输入菜单地址"></el-input>
      </el-form-item>
      <el-form-item label>
        <el-button type="primary" @click="sumbit">提交</el-button>
        <el-button type="warning" v-if="info.isAdd" @click="cancel">重置</el-button>
        <el-button type="warning" v-else @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
// 导入  添加和修改的 请求封装方法！
import { addMenu, editMenu } from "@/request/menu";
import { mapGetters, mapActions } from "vuex";
let defaultItem = {
  pid: 0,
  title: "",
  icon: "",
  type: 1,
  url: "",
  status: 1,
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
      formInfo: { ...defaultItem },
      rules: {
        // 验证规则对象！
        title: [{ required: true, message: "必填！", trigger: "blur" }],
        url: [{ required: true, message: "必填！", trigger: "blur" }],
      },
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
    this.cancel();
  },
  methods: {
    ...mapActions({
      get_menu_list: "menu/get_menu_list",
    }),
    setinfo(val) {
      // 将数据赋给默认defaultItem; 赋给表单

      defaultItem = { ...val };
      this.formInfo = { ...val };
    },
    async sumbit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let res;
          if (this.info.isAdd) {
            res = await addMenu(this.formInfo);
          } else {
            res = await editMenu(this.formInfo);
          }
          console.log(res);
          // return
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.info.isShow = false;
            this.get_menu_list();
            this.formInfo = { ...resetItem };
          } else {
            this.$message.error(res.msg);
          }
        }
      });
    },
    reset() {
      this.formInfo = { ...defaultItem };
    },
    cancel() {
      this.formInfo = { ...resetItem };
    },
  },
  components: {},
};
</script>
<style scoped>
</style>