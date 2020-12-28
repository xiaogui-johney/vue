<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="学号" >
      <el-input v-model="ruleForm.sid" readOnly></el-input>
    </el-form-item>
    <el-form-item label="姓名" prop="sname">
      <el-input v-model="ruleForm.sname"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="spassword">
      <el-input v-model="ruleForm.spassword"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="ssex">
      <el-input v-model="ruleForm.ssex"></el-input>
    </el-form-item>
    <el-form-item label="班级" prop="sclass">
      <el-input v-model="ruleForm.sclass"></el-input>
    </el-form-item>
    <el-form-item label="电话号码" prop="sphone">
      <el-input v-model="ruleForm.sphone"></el-input>
    </el-form-item>
    <el-form-item label="实习公司" prop="company">
      <el-input v-model="ruleForm.company"></el-input>
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
        name: 'Updata_st_inform',
      data () {
        return {
          ruleForm: {
            sid: '',
            sname: '',
            spassword: '',
            ssex: '',
            sphone: '',
            sclass: '',
            company: ''
          },
          rules: {
            sname: [
              { required: true, message: '请输出姓名', trigger: 'blur' },
              { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
            ],
            spassword: [
              { required: true, message: '请输入密码', trigger: 'blur' },
              { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
            ],
            ssex: [
              { required: true, message: '请输入性别', trigger: 'blur' },
              { min: 1, max: 1, message: '长度在 1 个字符', trigger: 'blur' }
            ],
            sclass: [
              { required: true, message: '请输入班级', trigger: 'blur' },
              { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            company: [
              { required: true, message: '请输入实习公司名称', trigger: 'blur' },
              { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
            ],
            sphone: [
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
              axios.put('http://localhost:8181/s_information/updata_st', this.ruleForm).then(function (resp) {
                if (resp.data === 'success') {
                  _this.$alert(_this.ruleForm.sname + '------修改成功！', '消息', {
                    confirmButtonText: '确定',
                    callback: action => {
                      _this.$router.push('/st_information');
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
          this.$refs[formName].resetFields();
        }
      },
      created () {
          const _this = this;
          axios.get('http://localhost:8181/s_information/findById/' + this.$route.query.id).then(function (resp) {
          _this.ruleForm = resp.data;
          });
      }
    };
</script>

<style scoped>

</style>
