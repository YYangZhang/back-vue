<template>
  <div class="fullscreen">
    <crumb :name="crumbName"></crumb>
    <divbar :name="divbarName"></divbar>
    <div class="searchInfo">
      <el-row>
        <el-col :span="12">
          <el-select size="medium" v-model="roles">
            <el-option label="全部角色" value="0"></el-option>
            <el-option label="角色1" value="1"></el-option>
            <el-option label="角色2" value="2"></el-option>
            <el-option label="角色3" value="3"></el-option>
          </el-select>
        </el-col>
        <el-col :span="12" class="txt-right">
          <el-button
            type="primary"
            size="medium"
            class="searchInfobtn searchInfoBet primarybtn"
            @click="addRole"
            >新增角色</el-button
          >
        </el-col>
      </el-row>
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
        <el-table-column
          prop="a"
          align="center"
          label="角色列表"
        ></el-table-column>
        <el-table-column
          prop="b"
          align="center"
          label="职位描述"
        ></el-table-column>
        <el-table-column align="center" label="成员">
          <template>
            <span class="textbtn">查看</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="c"
          align="center"
          label="添加时间"
        ></el-table-column>
        <el-table-column align="center" label="是否启用">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.d"
              active-color="#f9b71e"
              inactive-color="#cccccc"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="f" align="center" label="操作">
          <template slot-scope="scope">
            <span class="textbtn" @click="auditshow = true">设置权限</span>
            <span
              class="textbtn tablebet disabletext"
              @click="editRole(scope.row)"
              >编辑</span
            >
            <span class="textbtn tablebet deltext" @click="delrole(scope.row.a)"
              >删除</span
            >
          </template>
        </el-table-column>
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
    <!-- 角色详情 -->
    <el-dialog
      :title="dlgtitle"
      :visible.sync="editroleshow"
      width="540px"
      class="pwdchangedlg"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :before-close="closeedit"
    >
      <div style="position: relative; padding-top: 30px">
        <span class="itemrequire">必填</span>
        <el-form
          label-width="100px"
          class="pwdchangeform"
          :model="detailfrom"
          ref="detailfrom"
          :rules="detailrules"
        >
          <el-form-item label="角色" prop="role">
            <el-input size="medium" v-model="detailfrom.role"></el-input>
          </el-form-item>
          <el-form-item label="职能描述" prop="desc">
            <el-input type="textarea" v-model="detailfrom.desc"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <el-row>
        <el-col :span="24" class="txt-center" style="padding-top: 20px">
          <el-button
            type="primary"
            class="dlgbtn dlgbtnprimary"
            @click="saveRole"
            >保 存</el-button
          >
          <el-button class="dlgbtn" @click="closeedit">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- 设置权限 -->
    <el-dialog
      title="设置权限"
      :visible.sync="auditshow"
      width="1200px"
      class="pwdchangedlg"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      top="2vh"
    >
      <!-- <div>请选择角色权限</div> -->
      <!-- <div class="roleTotal txt-center">
        <el-checkbox>全部权限</el-checkbox>
      </div> -->
      <div class="rolediv1" v-for="(func, index) in funcList" :key="index">
        <div class="roleTotal">
          <el-checkbox>{{ func.desc }}</el-checkbox>
        </div>
        <div class="roleDetails">
          <div class="roleDetail" v-for="(total, i) in func.total" :key="i">
            <el-checkbox>{{ total.de }}</el-checkbox>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer" style="text-align: center">
        <el-button
          type="primary"
          class="dlgbtn primarybtn"
          @click="auditshow = false"
          >确 定</el-button
        >
        <el-button class="dlgbtn" @click="auditshow = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import util from "../components/util";
export default util.useCommon({
  data() {
    return {
      auditshow: false,
      dlgtitle: "角色",
      funcList: [
        {
          desc: "全部权限",
          total: [],
        },
        {
          desc: "系统概述",
          total: [{ de: "系统概述" }, { de: "医生登录日志" }],
        },
        {
          desc: "配置医院",
          total: [
            { de: "微信公众号配置" },
            { de: "支付宝服务窗配置" },
            { de: "综合支付平台配置" },
            { de: "自定义菜单配置" },
            { de: "医院公共参数配置" },
            { de: "消息提示设置" },
            { de: "模板消息设置" },
          ],
        },
        {
          desc: "微官网管理",
          total: [
            { de: "医院基本信息" },
            { de: "内容管理" },
            { de: "分类管理" },
          ],
        },
        {
          desc: "业务信息管理",
          total: [
            { de: "科室管理" },
            { de: "医生管理" },
            { de: "排班管理" },
            { de: "预约管理" },
            { de: "挂号管理" },
            { de: "排队管理" },
            { de: "就医咨询管理" },
            { de: "就医评价管理" },
            { de: "职能导诊" },
            { de: "科室繁忙度" },
            { de: "满意调查度" },
            { de: "值班室管理" },
          ],
        },
        {
          desc: "统计分析",
          total: [
            { de: "注册用户管理" },
            { de: "就诊人管理" },
            { de: "缴费记录管理-有退费功能" },
            { de: "缴费记录管理-无退费功能" },
            { de: "补单功能" },
            { de: "退费记录管理" },
            { de: "自动对账管理" },
          ],
        },
        {
          desc: "线下缴费管理",
          total: [{ de: "设备管理" }, { de: "资料管理" }],
        },
        {
          desc: "药学管理",
          total: [{ de: "药品库管理" }, { de: "药学论坛管理" }],
        },
        { desc: "权限管理", total: [{ de: "角色管理" }, { de: "账户管理" }] },
      ],
      flag: "0", // 1为新增 2为编辑
      detailfrom: {
        role: "",
        desc: "",
      },
      editroleshow: false,
      detailrules: {
        role: [
          { required: true, message: "请输入角色名称！", trigger: "blur" },
        ],
      },
      tableHeight: window.innerHeight - 316, // 表格高度
      crumbName: "角色管理",
      divbarName: "角色列表",
      pagesizes: [10, 25, 50, 100], // 选择每页显示多少数据
      pagesize: 10, //每页显示多少条数据
      pagetotal: 100, //数据总数
      roles: "",
      tableData: [
        {
          a: "admin",
          b: "系统管理员",
          c: "2020-10-20 17:20:20",
          d: true,
        },
        {
          a: "角色1",
          b: "角色1",
          c: "2020-10-20 17:20:20",
          d: true,
        },
        {
          a: "角色2",
          b: "角色2",
          c: "2020-10-20 17:20:20",
          d: true,
        },
        {
          a: "角色3",
          b: "角色3",
          c: "2020-10-20 17:20:20",
          d: true,
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
    addRole() {
      // 新增角色
      var v = this;
      v.dlgtitle = "添加角色";
      v.flag = "1"; // 状态改为新增
      v.editroleshow = true;
    },
    editRole(row) {
      // 编辑角色
      var v = this;
      v.dlgtitle = "编辑角色";
      v.flag = "2"; // 状态改为编辑
      v.detailfrom.role = row.a;
      v.detailfrom.desc = row.b;
      v.editroleshow = true;
    },
    saveRole() {
      // 保存角色编辑
      var v = this;
      v.confirm("确定保存？", function (isOk) {
        if (isOk) {
          v.$message({
            message: "保存成功",
            type: "success",
          });
          v.closeedit();
        }
      });
    },
    delrole(roleid) {
      // 删除角色
      var v = this;
      v.confirm("确定删除该角色？", function (isOk) {
        if (isOk) {
          v.$message({
            message: "删除成功",
            type: "success",
          });
        }
      });
    },

    closeedit() {
      // 关闭编辑角色 dialog
      var v = this;
      this.$refs["detailfrom"].resetFields();
      this.editroleshow = false;
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
.itemrequire {
  top: 0px;
}
.roleTotal {
  width: 100%;
  background-color: #c1e5f2;
  padding: 12px 16px;
  border: #cccccc 1px solid;
}
.roleDetails {
  display: -webkit-flex; /* Safari */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.roleDetail {
  width: 25%;
  border: #e4e4e4 1px solid;
  padding: 12px 0 12px 36px;
}
.rolediv1:not(:first-child){
  margin-top: 30px;
}
.rolediv1:first-child{
    text-align: center;
}

@media screen and (max-width: 1366px) {
    .pwdchangedlg /deep/ .el-dialog__body{
        height: 500px;
        overflow-y: auto;
    }
}

@media screen and (min-width: 1367px) {
    .pwdchangedlg /deep/ .el-dialog__body{
        height: 770px;
        overflow-y: auto;
    }
}
</style>
