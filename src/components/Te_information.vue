<template>
  <div>
    <h1>教师信息</h1>
    <el-input v-model="mytext" placeholder="搜索名字"></el-input>
    <button @click="search()" type="text" size="small">查询</button>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="tid"
        label="教师编号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="tname"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="tsex"
        label="性别"
        width="120">
      </el-table-column>
      <el-table-column
        prop="tclass"
        label="授课班级"
        width="120">
      </el-table-column>
      <el-table-column
        prop="tphone"
        label="手机号码"
        width="300">
      </el-table-column>
      <el-table-column
        prop="tpassword"
        label="密码"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="deleteTe(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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

<script>
  const axios = require('../../node_modules/axios');
  export default {
    name: 'Teinformation',
    data () {
      return {
        total: null,
        tableData: null,
        mytext: null
      };
    },
    created () {
      const _this = this;
      axios.get('http://localhost:8181/t_information/findAll/1/6').then(function (resp) {
        console.log(resp);
        _this.tableData = resp.data.content;
        _this.total = resp.data.totalElements;
      });
    },
    methods: {
      deleteTe (row) {
        const _this = this;
        axios.delete('http://localhost:8181/t_information/deleteById/' + row.tid).then(function (resp) {
          _this.$alert(row.tname + '------删除成功！', '消息', {
            confirmButtonText: '确定',
            callback: action => {
              window.location.reload();
            }
          });
        });
      },
      edit (row) {
        this.$router.push({
          path: '/updata_te_inform',
          query: {
            id: row.tid
          }
        });
      },
      search () { // 搜索功能
        const _this = this;
        axios.get('http://localhost:8181/t_information/findByTname/' + this.mytext).then(function (resp) {
          console.log(resp.data);
          _this.$alert(_this.mytext + '------查询成功！', '消息', {
            confirmButtonText: '确定',
            callback: action => {
              _this.tableData = resp.data;// tableData是一个数组，resp.data也是一个数组
            }
          });
        });
      },
      page (currentPage) {
        const _this = this;
        axios.get('http://localhost:8181/t_information/findAll/' + currentPage + '/6').then(function (resp) {
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
