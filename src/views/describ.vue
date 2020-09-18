<template>
  <div class="fullscreen">
    <crumb :name="crumbName"></crumb>
    <divbar :name="divbarName"></divbar>
    <div class="maintable">
      <el-table
        :data="tableData"
        style="width: 100%"
        highlight-current-row
        stripe
        :header-cell-style="headerstyle"
        header-row-class-name="tableHead"
        row-class-name="tableTbody"
        :cell-class-name="boldrow"
      >
        <el-table-column prop="a" align="center"></el-table-column>
        <el-table-column prop="b" align="center" label="注册用户"></el-table-column>
        <el-table-column prop="c" align="center" label="就诊人"></el-table-column>
        <el-table-column prop="d" align="center" label="普通门诊预约数"></el-table-column>
        <el-table-column prop="e" align="center" label="专家门诊预约数"></el-table-column>
        <el-table-column prop="f" align="center" label="爽约数"></el-table-column>
        <el-table-column prop="g" align="center" label="报告查询次数"></el-table-column>
        <el-table-column prop="h" align="center" label="报告推送次数"></el-table-column>
        <el-table-column prop="i" align="center" label="处方查询次数"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import util from "../components/util";
export default util.useCommon({
  data() {
    return {
      crumbName:'系统概述',
      divbarName:'系统概述',
      tableData: [
        {
          a: "今日新增",
          b: "5",
          c: "283",
          d: "46",
          e: "283",
          f: "46",
          g: "283",
          h: "283",
          i: "283",
        },
        {
          a: "昨日新增",
          b: "5",
          c: "283",
          d: "46",
          e: "283",
          f: "46",
          g: "283",
          h: "283",
          i: "283",
        },
        {
          a: "本周新增",
          b: "5",
          c: "283",
          d: "46",
          e: "283",
          f: "46",
          g: "283",
          h: "283",
          i: "283",
        },
        {
          a: "上周新增",
          b: "5",
          c: "283",
          d: "46",
          e: "283",
          f: "46",
          g: "283",
          h: "283",
          i: "283",
        },
        {
          a: "本月新增",
          b: "5",
          c: "283",
          d: "46",
          e: "283",
          f: "46",
          g: "283",
          h: "283",
          i: "283",
        },
        {
          a: "上月新增",
          b: "5",
          c: "283",
          d: "46",
          e: "283",
          f: "46",
          g: "283",
          h: "283",
          i: "283",
        },
        {
          a: "系统总数",
          b: "100",
          c: "1283",
          d: "146",
          e: "1283",
          f: "146",
          g: "1283",
          h: "1283",
          i: "1283",
        },
      ],
    };
  },
  methods: {
    headerstyle() {
      return "color:#333333;background-color:#fcf3ed;";
    },
    boldrow({ rowIndex }) {
      var v = this;
      var length = v.tableData.length;
      if (rowIndex === length - 1) {
        return "boldtr";
      }
      return "";
    },
  },
  activated() {},
});
</script>
<style scoped>

</style>
