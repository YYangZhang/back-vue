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
      <el-button
        type="primary"
        class="primarybtn marginleftpwd"
        @click="showModifyPwd('return')"
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
      <el-button
        type="primary"
        class="primarybtn marginleftpwd"
        @click="showModifyPwd('assess')"
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
      :before-close="createpwdClose"
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

    <!-- 修改密码 -->
    <el-dialog
      :title="modifypwdTitle"
      :visible.sync="modifypwdShow"
      width="540px"
      class="pwdchangedlg"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :before-close="modifypwdClose"
    >
      <div style="position: relative">
        <span class="itemrequire">必填</span>
        <el-form
          label-width="100px"
          class="pwdchangeform"
          :model="modifyform"
          ref="modifyform"
          :rules="modifyrules"
        >
          <el-form-item
            :label="resetType == 'return' ? '原退款密码' : '原补单密码'"
            prop="originpwd"
          >
            <el-input
              :placeholder="
                resetType == 'return' ? '请输入原退款密码' : '请输入原补单密码'
              "
              size="medium"
              type="password"
              v-model="modifyform.originpwd"
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
              v-model="modifyform.newpwd"
            ></el-input>
          </el-form-item>
          <el-form-item label="请确认密码" prop="checkpwd">
            <el-input
              placeholder="请再次输入密码 密码区分大小写"
              size="medium"
              type="password"
              v-model="modifyform.checkpwd"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <el-row>
        <el-col :span="24" class="txt-center" style="padding-top: 20px">
          <el-button
            type="primary"
            class="dlgbtn dlgbtnprimary"
            @click="modifypwdSave"
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
    var modifypass = (rule, value, callback) => {
      // if (
      //   /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/.test(value) == false
      // ) {
      //   callback(new Error("请输入8~20位且由字母数字组成的密码！"));
      // } else
      if (this.modifyform.originpwd == value) {
        callback(new Error("密码与原密码一致！"));
      } else if (this.modifyform.checkPwd !== "") {
        this.$refs.modifyform.validateField("checkPwd");
      }
      callback();
    };
    var modifyValidate = (rule, value, callback) => {
      if (value !== this.modifyform.newpwd) {
        callback(new Error("两次密码输入不一致！"));
      } else {
        callback();
      }
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
      createform: {
        // 创建密码form表单
        originpwd: "",
        newpwd: "",
        checkpwd: "",
      },
      createrules: {
        originpwd: [
          { required: true, message: "请输入当前登录密码！", trigger: "blur" },
        ],
        newpwd: [
          { required: true, message: "请输入新密码！", trigger: "blur" },
        ],
        checkpwd: [
          { required: true, message: "请再次输入新密码！", trigger: "blur" },
          { validator: createValidate, trigger: "blur" },
        ],
      },

      modifypwdShow: false, // 修改密码 dialog
      modifypwdTitle: "修改密码", // 修改密码标题
      modifyform: {
        // 修改密码form表单
        originpwd: "",
        newpwd: "",
        checkpwd: "",
      },
      modifyrules: {
        originpwd: [
          { required: true, message: "请输入原密码！", trigger: "blur" },
        ],
        newpwd: [
          { required: true, message: "请输入新密码！", trigger: "blur" },
          { validator: modifypass, trigger: "blur" },
        ],
        checkpwd: [
          { required: true, message: "请再次输入新密码！", trigger: "blur" },
          { validator: modifyValidate, trigger: "blur" },
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
      v.createpwdShow = true;
    },
    createpwdSave() {
      // 保存创建密码 dialog
      var v = this;
      console.log(v.resetType);
      if (v.resetType == "return") {
        v.$refs["createform"].validate((valid) => {
          if (valid) {
            v.confirm("确认创建退款密码？", function (isOk) {
              if (isOk) {
                console.log("创建退款密码成功");
                v.$message({
                  message: "创建退款密码成功",
                  type: "success",
                });
                v.createpwdClose();
              }
            });
          }
        });
      } else if (v.resetType == "assess") {
        v.$refs["createform"].validate((valid) => {
          if (valid) {
            v.confirm("确认创建补单密码？", function (isOk) {
              if (isOk) {
                console.log("创建补单密码成功");
                v.$message({
                  message: "创建补单密码成功",
                  type: "success",
                });
                v.createpwdClose();
              }
            });
          }
        });
      }
    },
    createpwdClose() {
      // 关闭修改密码密码 dialog
      // 清空校验
      this.$refs["createform"].resetFields();
      this.createpwdShow = false;
    },

    showModifyPwd(type) {
      var v = this;
      if (type == "return") {
        v.modifypwdTitle = "修改退款密码";
      } else if (type == "assess") {
        v.modifypwdTitle = "修改补单密码";
      }
      v.resetType = type;
      console.log(v.modifypwdTitle);
      v.modifypwdShow = true;
    },
    modifypwdSave() {
      // 保存修改密码 dialog
      var v = this;
      console.log(v.resetType);
      if (v.resetType == "return") {
        v.$refs["modifyform"].validate((valid) => {
          if (valid) {
            v.confirm("确认修改退款密码？", function (isOk) {
              if (isOk) {
                console.log("修改退款密码成功");
                v.$message({
                  message: "修改退款密码成功",
                  type: "success",
                });
                v.modifypwdClose();
              }
            });
          }
        });
      } else if (v.resetType == "assess") {
        v.$refs["modifyform"].validate((valid) => {
          if (valid) {
            v.confirm("确认修改补单密码？", function (isOk) {
              if (isOk) {
                console.log("修改补单密码成功");
                v.$message({
                  message: "修改补单密码成功",
                  type: "success",
                });
                v.modifypwdClose();
              }
            });
          }
        });
      }
    },
    modifypwdClose() {
      this.$refs["modifyform"].resetFields();
      this.modifypwdShow = false;
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
