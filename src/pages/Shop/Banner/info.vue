<template>
  <el-dialog
    ref="dialog"
    :title="info.isAdd ? '添加':'修改'"
    @close="cancel"
    :visible.sync="info.isShow"
    width="40%"
  >
    <!-- :rules="rules"  -->
    <!-- 表单 -->
    <el-form :model="formInfo" ref="form" label-width="100px">
      <el-form-item label="分类名称" prop="title">
        <el-input v-model="formInfo.title" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="分类图片">
        <el-upload
          action
          :auto-upload="false"
          list-type="picture-card"
          :limit="1"
          :on-preview="see"
          :on-change="change"
          :on-remove="remove"
          :file-list="filelist"
        >
          <i slot="default" class="el-icon-plus"></i>
        </el-upload>
        <el-dialog title="查看图片" :visible.sync="dialogVisible" :append-to-body="true">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="formInfo.status" :active-value="1" :inactive-value="2"></el-switch>
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
import { addBanner, editBanner } from "@/request/banner";
import { mapGetters, mapActions } from "vuex";
let defaultItem = {
  title: "",
  img: "",
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
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      rules: {
        // 验证规则对象！
        catename: [{ required: true, message: "必填！", trigger: "blur" }],
      },
      filelist: [], // [{name:'',url:''}]
    };
  },
  computed: {
    ...mapGetters({
      bannerlist: "banner/bannerlist",
    }),
  },
  mounted() {
    if (!this.bannerlist.length) {
      this.get_banner_list();
    }
    this.cancel();
  },
  methods: {
    see(file) {
      this.dialogVisible = true;
      this.dialogImageUrl = file.url; // JS 生成的预览地址！
    },
    change(file, fileList) {
      this.formInfo.img = file.raw; // file.raw 是原生文件信息！
    },
    remove(file, fileList) {
      this.formInfo.img = "";
    },
    ...mapActions({
      get_banner_list: "banner/get_banner_list",
    }),
    setinfo(val) {
      // 将数据赋给默认defaultItem; 赋给表单
      if (val.img) {
        this.filelist = [
          {
            name: val.catename,
            url: this.$host + val.img,
          },
        ];
      }
      val.children ? delete val.children : "";
      defaultItem = { ...val };
      this.formInfo = { ...val };
    },
    async sumbit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let res;
          let fd = new FormData();
          for (let k in this.formInfo) {
            fd.append(k, this.formInfo[k]);
          }
          if (this.info.isAdd) {
            res = await addBanner(fd);
          } else {
            res = await editBanner(fd);
          }
          // return
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.info.isShow = false;
            this.get_banner_list();
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
      this.filelist = [];

      this.formInfo = { ...resetItem };
    },
  },
  components: {},
};
</script>
<style scoped>
</style>