<template>
  <div class="crumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/menu' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{name}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: "sssss",
    },
  },
  // props:["msg"],
  data() {
    return {};
  },
  methods: {},
  activated() {},
};
</script>
<style scoped>
/* 面包屑div通用 */
.crumb{
  padding-bottom:20px;
}
</style>