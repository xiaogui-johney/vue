<template>
  <el-form style="width: 60%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="教师编号">
      <el-input v-model="ruleForm.tid" readOnly></el-input>
    </el-form-item>
    <el-form-item label="姓名" prop="tname">
      <el-input v-model="ruleForm.tname"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="tpassword">
      <el-input v-model="ruleForm.tpassword"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="tsex">
      <el-input v-model="ruleForm.tsex"></el-input>
    </el-form-item>
    <el-form-item label="教授班级" prop="tclass">
      <el-input v-model="ruleForm.tclass"></el-input>
    </el-form-item>
    <el-form-item label="电话号码" prop="tphone">
      <el-input v-model="ruleForm.tphone"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  const axios = require('../../node_modules/axios');
  export default {
    name: 'Updata_te_inform',
    data () {
      return {
        ruleForm: {
          tid: '',
          tname: '',
          tpassword: '',
          tsex: '',
          tphone: '',
          tclass: ''
        },
        rules: {
          tname: [
            { required: true, message: '请输出姓名', trigger: 'blur' },
            { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
          ],
          tpassword: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          tsex: [
            { required: true, message: '请输入性别', trigger: 'blur' },
            { min: 1, max: 1, message: '长度在 1 个字符', trigger: 'blur' }
          ],
          tclass: [
            { required: true, message: '请输入所教授的班级', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          ],
          tphone: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { min: 11, max: 11, message: '长度在11个字符', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm (formName) {
        const _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.put('http://localhost:8181/t_information/updata_te', this.ruleForm).then(function (resp) {
              if (resp.data === 'success') {
                _this.$alert(_this.ruleForm.tname + '------修改成功！', '消息', {
                  confirmButtonText: '确定',
                  callback: action => {
                    _this.$router.push('/te_information');
                  }
                });
              } else {
                _this.$message('修改失败');
              }
            });
          } else {
            console.log('修改失败！');
            return false;
          }
        });
      },
      resetForm (formName) {
        this.$refs[formName].resetFields(); // 获取表单信息
      }
    },
    created () {
      const _this = this;
      axios.get('http://localhost:8181/t_information/findById/' + this.$route.query.id).then(function (resp) {
        _this.ruleForm = resp.data; // 获得Id号码
      });
    }
  };
</script>

<style scoped>

</style>
