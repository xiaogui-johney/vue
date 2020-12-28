<template>
  <div>
    <h1>学生信息</h1>
      <el-input v-model="mytext" placeholder="搜索名字"></el-input>
      <button @click="search()" type="text" size="small">查询</button>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="sid"
        label="学号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="sname"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="ssex"
        label="性别"
        width="120">
      </el-table-column>
      <el-table-column
        prop="sphone"
        label="手机号码"
        width="120">
      </el-table-column>
      <el-table-column
        prop="company"
        label="实习公司"
        width="300">
      </el-table-column>
      <el-table-column
        prop="spassword"
        label="密码"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="deleteSt(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--设计每页展示的数据条数-->
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="6"
      :total="total"
      @current-change="page">
    </el-pagination>
    <router-view></router-view>
  </div>
</template>
<!--Ajax的使用，第一个参数是后端服务地址，第二参数是前端传给后端的值，第三个是后端传给前端的值-->
<script>
  const axios = require('../../node_modules/axios');
  export default {
    name: 'Stinformation',
    data () {
      return {
        total: null,
        tableData: null,
        mytext: null
      };
    },
    created () { // 数据初始化
      const _this = this;
      axios.get('http://localhost:8181/s_information/findAll/1/6').then(function (resp) {
        console.log(resp);
        _this.tableData = resp.data.content;
        _this.total = resp.data.totalElements;
      });
    },
    methods: {
      deleteSt (row) { // 删除功能
        const _this = this;
        axios.delete('http://localhost:8181/s_information/deleteById/' + row.sid).then(function (resp) {
            _this.$alert(row.sname + '------删除成功！', '消息', {
              confirmButtonText: '确定',
              callback: action => {
                window.location.reload();
              }
            });
        });
        },
      // 修改功能，把当前修改信息的id传给后端，后端返回该id相关信息
      edit (row) {
        this.$router.push({
          path: '/updata_st_inform',
          query: {
            id: row.sid
          }
        });
      },
      search () { // 搜索功能
          const _this = this;
          axios.get('http://localhost:8181/s_information/findBySname/' + this.mytext).then(function (resp) {
              _this.$alert(_this.mytext + '------查询成功！', '消息', {
                confirmButtonText: '确定',
                callback: action => {
                  window.location.reload();
                }
              });
          });
        },
      page (currentPage) { // 回传当前页数
        const _this = this;
        axios.get('http://localhost:8181/s_information/findAll/' + currentPage + '/6').then(function (resp) {
          console.log(resp.data);
          _this.tableData = resp.data.content;
          _this.total = resp.data.totalElements;
        });
      }
    }
  };
</script>

<style scoped>

</style>
