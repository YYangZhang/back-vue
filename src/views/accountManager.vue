<template>
  <div class="fullscreen">
    <crumb :name="crumbName"></crumb>
    <divbar :name="divbarName"></divbar>
    <div class="searchInfo">
      <el-form class="searchInfoFrom" :model="searchForm">
        <el-form-item label="医生工号">
          <el-input
            style="width:270px"
            placeholder="请输入医生工号"
            size="medium"
            v-model="searchForm.docid"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" size="medium" class="searchInfobtn searchInfoBet">搜 索</el-button>
    </div>
    <div class="maintable1">
      <el-table
        :data="tableData"
        style="width: 100%"
        highlight-current-row
        stripe
        :height="tableHeight"
        :header-cell-style="headerstyle"
        header-row-class-name="tableHead"
        cell-class-name="tableTbody"
      >
        <el-table-column prop="a" align="center" label="登陆时间"></el-table-column>
        <el-table-column prop="b" align="center" label="医生工号"></el-table-column>
        <el-table-column prop="c" align="center" label="医生姓名"></el-table-column>
        <el-table-column prop="d" align="center" label="手机号码"></el-table-column>
      </el-table>
    </div>
    <div class="pagenation">
      <el-pagination
        :background="true"
        :small="true"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="pagesizes"
        :page-size="pagesize"
        :page-count="7"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagetotal"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import util from "../components/util";
export default util.useCommon({
  data() {
    return {
      tableHeight: window.innerHeight - 316, // 表格高度
      crumbName: "登录日志",
      divbarName: "登录日志",
      pagesizes: [10, 25, 50, 100], // 选择每页显示多少数据
      pagesize: 10, //每页显示多少条数据
      pagetotal: 100, //数据总数
      searchForm: {
        docid: "", // 医生工号
      },
      tableData: [
        {
          a: "2018-8-15  17:55:32",
          b: "111223",
          c: "医生姓名",
          d: "1388888888",
        },
        {
          a: "2018-8-15  17:55:32",
          b: "111223",
          c: "医生姓名",
          d: "1388888888",
        },
        {
          a: "2018-8-15  17:55:32",
          b: "111223",
          c: "医生姓名",
          d: "1388888888",
        },
        {
          a: "2018-8-15  17:55:32",
          b: "111223",
          c: "医生姓名",
          d: "1388888888",
        },
        {
          a: "2018-8-15  17:55:32",
          b: "111223",
          c: "医生姓名",
          d: "1388888888",
        },
        {
          a: "2018-8-15  17:55:32",
          b: "111223",
          c: "医生姓名",
          d: "1388888888",
        },
        {
          a: "2018-8-15  17:55:32",
          b: "111223",
          c: "医生姓名",
          d: "1388888888",
        },
        {
          a: "2018-8-15  17:55:32",
          b: "111223",
          c: "医生姓名",
          d: "1388888888",
        },
        {
          a: "2018-8-15  17:55:32",
          b: "111223",
          c: "医生姓名",
          d: "1388888888",
        },
        {
          a: "2018-8-15  17:55:32",
          b: "111223",
          c: "医生姓名",
          d: "1388888888",
        },
      ],
    };
  },
  methods: {
    headerstyle() {
      return "color:#333333;background-color:#fcf3ed;";
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
  watch: {
    // 这里的定时器是为了优化，如果频繁调用window.onresize方法会造成页面卡顿，增加定时器会避免频繁调用window.onresize方法
    // timer默认值设置为false，这里相当于一个按钮，防止频繁改变时引起卡顿
    tableHeight(val) {
      if (!this.timer) {
        this.tableHeight = val;
        this.timer = true;
        const that = this;
        setTimeout(function () {
          that.timer = false;
        }, 400);
      }
    },
  },
  mounted() {
    var v = this;
    window.onresize = () => {
      return (() => {
        var tbheight = window.innerHeight - 316;
        if (tbheight < 280) {
          tbheight = 280;
        }
        window.tableHeight = tbheight;
        v.tableHeight = window.tableHeight;
      })();
    };
  },
  activated() {},
});
</script>
<style scoped>
</style>
