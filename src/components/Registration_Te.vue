<template>
  <el-form style="width: 60%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="教师编号" prop="tid">
      <el-input v-model="ruleForm.tid"></el-input>
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
      <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
      const axios = require('../../node_modules/axios');
    export default {
      name: 'Registration_Te',
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
            tid: [
              { required: true, message: '请输入教师编号', trigger: 'blur' },
              { min: 4, max: 4, message: '长度在 4 个字符', trigger: 'blur' }
            ],
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
              axios.post('http://localhost:8181/t_information/save_te', this.ruleForm).then(function (resp) {
                if (resp.data === 'success') {
                  _this.$alert(_this.ruleForm.tname + '------注册成功！', '消息', {
                    confirmButtonText: '确定',
                    callback: action => {
                      _this.$router.push('/te_information');
                    }
                  });
                } else {
                  _this.$message('注册失败');
                }
              });
            } else {
              console.log('注册失败！');
              return false;
            }
          });
        },
        resetForm (formName) {
          this.$refs[formName].resetFields();
        }
      }
    };
</script>

<style scoped>

</style>
