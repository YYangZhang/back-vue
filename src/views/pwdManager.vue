<template>
  <div class="fullscreen">
    <crumb :name="crumbName"></crumb>
    <divbar :name="divbarName1"></divbar>
    <div>
      <el-button
        type="primary"
        class="primarybtn"
        @click="showCreatePwd('return')"
        >创建退款密码</el-button
      >
      <el-button type="primary" class="primarybtn marginleftpwd"
        >修改退款密码</el-button
      >
      <el-button
        type="primary"
        class="primarybtn marginleftpwd"
        @click="showResetPwd('return')"
        >重置退款密码</el-button
      >
    </div>
    <div style="padding: 16px 0 30px">
      <el-button
        type="primary"
        class="primarybtn"
        @click="showCreatePwd('assess')"
        >创建补单密码</el-button
      >
      <el-button type="primary" class="primarybtn marginleftpwd"
        >修改补单密码</el-button
      >
      <el-button
        type="primary"
        class="primarybtn marginleftpwd"
        @click="showResetPwd('assess')"
        >重置补单密码</el-button
      >
    </div>

    <divbar :name="divbarName2"></divbar>
    <div class="maintable">
      <el-table
        :data="tableData"
        style="width: 100%"
        highlight-current-row
        stripe
        :header-cell-style="headerstyle"
        header-row-class-name="tableHead"
        row-class-name="tableTbody"
      >
        <el-table-column
          prop="a"
          align="center"
          label="操作时间"
        ></el-table-column>
        <el-table-column
          prop="b"
          align="center"
          label="用户名"
        ></el-table-column>
        <el-table-column prop="c" align="center" label="类型"></el-table-column>
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

    <!-- 创建密码 -->
    <el-dialog
      :title="createpwdTitle"
      :visible.sync="createpwdShow"
      width="540px"
      class="pwdchangedlg"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div style="position: relative">
        <span class="itemrequire">必填</span>
        <el-form
          label-width="100px"
          class="pwdchangeform"
          :model="createform"
          ref="createform"
          :rules="createrules"
        >
          <el-form-item label="登录密码" prop="originpwd">
            <el-input
              placeholder="请输入登录密码"
              size="medium"
              type="password"
              v-model="createform.originpwd"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="resetType == 'return' ? '新退款密码' : '新补单密码'"
            prop="newpwd"
          >
            <el-input
              placeholder="请输入新密码 密码区分大小写"
              size="medium"
              type="password"
              v-model="createform.newpwd"
            ></el-input>
          </el-form-item>
          <el-form-item label="请确认密码" prop="checkpwd">
            <el-input
              placeholder="请再次输入密码 密码区分大小写"
              size="medium"
              type="password"
              v-model="createform.checkpwd"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <el-row>
        <el-col :span="24" class="txt-center" style="padding-top: 20px">
          <el-button
            type="primary"
            class="dlgbtn dlgbtnprimary"
            @click="createpwdSave"
            >保 存</el-button
          >
        </el-col>
      </el-row>
    </el-dialog>

    <!-- 重置密码 -->
    <el-dialog
      :title="restpwdTitle"
      :visible.sync="resetpwdShow"
      width="540px"
      class="pwdchangedlg"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div class="txt-center rstpwddlg">
        是否{{ restpwdTitle }}<br />
        重置密码后，将恢复为初始密码<span style="margin-left: 10px">{{
          randompwd
        }}</span>
      </div>
      <el-row>
        <el-col :span="24" class="txt-center" style="padding: 20px 0">
          <el-button
            type="primary"
            class="dlgbtn dlgbtnprimary"
            @click="resetpwdSave"
            >保 存</el-button
          >
          <el-button class="dlgbtn" @click="resetpwdClose">取 消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import util from "../components/util";
export default util.useCommon({
  data() {
    var createValidateLogin = (rule, value, callback) => {
      if (this.createform.originpwd !== "") {
        this.$refs.createform.validateField("originpwd");
      }
      callback();
    };

    var createValidate = (rule, value, callback) => {
      if (value !== this.createform.newpwd) {
        callback(new Error("两次密码输入不一致！"));
      } else {
        callback();
      }
    };
    return {
      createpwdShow: false, // 创建密码 dialog
      createpwdTitle: "创建密码", // 创建密码标题

      modifypwdShow: false, // 修改密码 dialog
      modifypwdTitle: "修改密码", // 修改密码标题
      createform: {
        // 创建密码form表单
        originpwd: "",
        newpwd: "",
        checkpwd: "",
      },
      createrules: {
        originpwd: [
          { required: true, message: "请输入当前登录密码！", trigger: "blur" },
          { validator: createValidateLogin, trigger: "blur" },
        ],
        newpwd: [
          { required: true, message: "请输入新密码！", trigger: "blur" },
        ],
        checkpwd: [
          { required: true, message: "请再次输入新密码！", trigger: "blur" },
          { validator: createValidate, trigger: "blur" },
        ],
      },

      resetpwdShow: false, // 重置密码 dialog
      restpwdTitle: "重置密码", // 重置密码标题
      resetType: "", // 重置密码类型 return 退款？ assess 补单
      randompwd: "", // 生成的随机重置密码

      pagesizes: [10, 25, 50, 100], // 选择每页显示多少数据
      pagesize: 10, //每页显示多少条数据
      pagetotal: 100, //数据总数
      crumbName: "密码管理",
      divbarName1: "退款/补单密码管理",
      divbarName2: "退款/补单密码记录",
      tableData: [
        {
          a: "2020-05-05 18:20:20",
          b: "17552568250",
          c: "修改退款密码",
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

    showCreatePwd(type) {
      var v = this;
      if (type == "return") {
        v.createpwdTitle = "创建退款密码";
      } else if (type == "assess") {
        v.createpwdTitle = "创建补单密码";
      }
      v.resetType = type;
      console.log(v.createpwdTitle);
      v.randompwds();
      v.createpwdShow = true;
      v.$refs["createform"].resetFields();
    //   this.$refs['createform'].clearValidate()
    },
    createpwdSave() {
      // 保存创建密码 dialog
    //   this.createpwdShow = false;
     var v = this;
      v.$refs["createform"].validate((valid) => {
        if(valid){
          v.confirm("确认修改密码？",function(isOk){
            if(isOk){
              console.log("修改密码成功")
              v.createpwdShow = false;
              // v.dopost(
              //   "/todo",
              //   {
              //     oldpwd: v.changeform.oldpwd,
              //     newpwd: v.changeform.newpwd,
              //   },
              //   function (result) {
              //     if ("0000" === result.state) {
              //       v.message("success", "修改密码成功，请重新登录！");
              //       v.$refs["changeform"].resetFields();
              //       localStorage.removeItem("userInfo");
              //       v.$router.replace("/");
              //     } else {
              //       var msg = [];
              //       for (var i = 0; i < result.body.length; i++) {
              //         msg.push(result.body[i].errmsg);
              //       }
              //       v.message("error", msg.join("<br/>"));
              //     }
              //     console.log(result);
              //   }
              // )
            }
          })
        }
      })
    },

    showResetPwd(type) {
      // 打开重置密码 dialog
      var v = this;
      if (type == "return") {
        v.restpwdTitle = "重置退款密码";
      } else if (type == "assess") {
        v.restpwdTitle = "重置补单密码";
      }
      v.resetType = type;
      console.log(v.restpwdTitle);
      v.randompwds();
      v.resetpwdShow = true;
    },
    randompwds() {
      // 设置随机密码
      var v = this;
      v.randompwd = "ASD1232156dfd1515";
    },
    resetpwdSave() {
      // 保存重置密码
      var v = this;
      if (v.resetType == "return") {
        v.$message({
          message: "保存退款密码成功",
          type: "success",
        });
        v.resetpwdClose();
      } else if (v.resetType == "assess") {
        v.$message({
          message: "保存补单密码成功",
          type: "success",
        });
        v.resetpwdClose();
      }
    },
    resetpwdClose() {
      // 关闭重置密码 dialog
      this.resetpwdShow = false;
    },
  },
  activated() {},
});
</script>
<style scoped>
.marginleftpwd {
  margin-left: 80px;
}
.rstpwddlg {
  font-family: "Arial Negreta", "Arial Normal", "Arial", sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 16px;
  line-height: 26px;
  padding: 40px 0 20px 0;
}
</style>
