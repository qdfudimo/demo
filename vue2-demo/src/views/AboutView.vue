<template>
  <div class="about">
    <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>
    <el-button type="text" @click="opendialog">打开有数据的嵌套表单的 Dialog</el-button>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible" @close="cancelDialog">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="活动名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="cofirmFormDialog">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'about',
  data() {
    return {
      dialogFormVisible: false,
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
      },
      form: {
        name: '',
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    cancelDialog() {
      this.$refs.ruleForm.resetFields();
    },
    opendialog() {
      this.dialogFormVisible = true;
      this.form = {
        name: "你好啊"
      }
    },
    cofirmFormDialog() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false;
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  }
}
</script>
