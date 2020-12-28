<template>
  <div>
  <el-container style="height: 748px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router>
        <!--循环菜单-->
        <el-submenu>
          <el-submenu v-for="(item,index) in $router.options.routes" :key="index" :index="index+''" v-if="item.show">
            <template slot="title"><i class="el-icon-setting"></i>{{item.name}}</template>
            <el-menu-item v-for="(item2,index2) in item.children" :key="index2" :index="item2.path" :class="$route.path==item2.path?'is-active':''">
              {{item2.name}}</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-main>
    <router-view></router-view>
    </el-main>
  </el-container>
  </div>
</template>

<script>
    export default {
        name: 'Index'
    };
</script>

<style scoped>

</style>
