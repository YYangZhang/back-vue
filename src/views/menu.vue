<template>
  <div class="fullscreen">
    <div class="menu-top" style="text-align:center">
      <div class="menu-top-title">
        <span class="menutitle">管理后台</span>
      </div>
      <div class="menu-top-info">
        <div class="menu-top-namediv select-none">
          <span class="menu-top-name">智慧医院</span>
        </div>
        <div class="userinfo" style="padding:0 20px;">
          <div class="userinfo-icon">
            <i class="iconfont iconuser"></i>
          </div>
          <div class="userinfo-uname cursordefault">
            <span>{{username}}</span>
          </div>
        </div>
        <div class="pwdchange" style="padding-right:20px">
          <div class="pwdchangediv select-none" @click="showPwdChange">
            <i class="iconfont iconlock_opened"></i>
            <span>登陆密码</span>
          </div>
        </div>
        <div class="quit" style="padding-right:34px">
          <div class="quitdiv select-none" @click="loginout">
            <i class="iconfont icontuichu"></i>
            <span>退出登录</span>
          </div>
        </div>
      </div>
    </div>
    <div class="menu-middle">
      <div class="menu-middle-left">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo elmenu select-none"
          @open="handleOpen"
          @close="handleClose"
          background-color="#ffffff"
          text-color="#000000"
          :unique-opened="true"
          active-text-color="#0081cc"
          :default-openeds="default_openeds"
          :router="true"
          @select="handleSelect"
        >
          <template v-for="(item,i) in menu">
            <el-menu-item
              :index="item.details[0]['path']"
              v-if="item.details.length == 1 "
              :key="i"
            >
              <span>{{item.title}}</span>
            </el-menu-item>
            <el-submenu
              :key="i"
              :index="String(i)"
              v-if="item.details.length > 0 && item.details.length != 1 "
            >
              <template slot="title">
                <span>{{item.title}}</span>
              </template>
              <el-menu-item v-for="(itemson,j) in item.details" :key="j" :index="itemson.path">
                <i class="el-icon-caret-right"></i>
                <span>{{itemson.detailtitle}}</span>
              </el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </div>
      <div class="menu-middle-right">
        <div class="containdiv">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>
        <div class="menu-bottom">
          <el-row>
            <el-col :span="14" class="txt-center">
              <span class="menu-bottom-sp">© 2012 - 2017 吊炸天科技有限公司</span>
              <span class="menu-bottom-sp menu-bottom-sp1">电话： 0513-88888888</span>
            </el-col>
            <el-col :span="10" class="txt-center">
              <span class="menu-bottom-sp">Version：V0.9.9</span>
              <span class="menu-bottom-sp menu-bottom-sp1">
                Powered by：
                <a
                  href="http://www.myrose.top"
                  class="menu-bottom-link"
                  target="_blank"
                >userzyy</a>
              </span>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <el-dialog
      title="修改登陆密码"
      :visible.sync="pwdChangeShow"
      width="540px"
      class="pwdchangedlg"
      :close-on-click-modal="false"
      :close-on-press-escape="false">
      <div style="position:relative;">
        <span class="itemrequire">必填</span>
        <span class="itemtips">密码区分大小写</span>
        <el-form label-width="100px" class="pwdchangeform" :model="changeform" ref="changeform" :rules="rules">
          <el-form-item label="用户名" class="pwdchangeitem1">
            <span class="txt-left">{{username}}</span>
          </el-form-item>
          <el-form-item label="原登录密码" prop="oldpwd">
            <el-input placeholder="请输入登录密码" size="medium" type="password" v-model="changeform.oldpwd"></el-input>
          </el-form-item>
          <el-form-item label="新登录密码" prop="newpwd">
            <el-input placeholder="请输入新登录密码" size="medium" type="password" v-model="changeform.newpwd"></el-input>
          </el-form-item>
          <el-form-item label="请确认密码" prop="checkpwd">
            <el-input placeholder="请再次输入登录密码" size="medium" type="password" v-model="changeform.checkpwd"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <el-row>
        <el-col :span="24" class="txt-center" style="padding-top:20px">
          <el-button type="primary" class="dlgbtn dlgbtnprimary" @click="pwdChangeSave">保 存</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import util from "../components/util";
export default util.useCommon({
  data() {
    var validateOldPass = (rule, value, callback) => {
      if (this.changeform.newpwd !== "") {
        this.$refs.changeform.validateField("newpwd");
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      // if (
      //   /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/.test(value) == false
      // ) {
      //   callback(new Error("请输入8~20位且由字母数字组成的密码！"));
      // } else
      if (this.changeform.oldpwd == value) {
        callback(new Error("密码与原密码一致！"));
      } else if (this.changeform.checkPwd !== "") {
        this.$refs.changeform.validateField("checkPwd");
      }
      callback();
    };
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.changeform.newpwd) {
        callback(new Error("两次密码输入不一致！"));
      } else {
        callback();
      }
    };
    return {
      username: "-admin",
      default_openeds: ["0"], // 默认打开侧边栏第一个
      pwdChangeShow: false, // 修改密码弹出框
      changeform: {   // 修改密码form表单
        oldpwd: "",
        newpwd: "",
        checkpwd: "",
      },
      rules: {
        oldpwd: [
          { required: true, message: "请输入当前登录密码！", trigger: "blur" },
          { validator: validateOldPass, trigger: "blur" },
        ],
        newpwd: [
          { required: true, message: "请输入新密码！", trigger: "blur" },
          { validator: validatePass, trigger: "blur" },
        ],
        checkpwd: [
          { required: true, message: "请再次输入新密码！", trigger: "blur" },
          { validator: validatePass2, trigger: "blur" },
        ],
      },
      menu: [
        {
          title: "系统",
          idx: "0",
          details: [
            { detailtitle: "系统日志", path: "/menu" },
            { detailtitle: "登录日志", path: "/loginlog" },
          ],
        },
        {
          title: "医院配置",
          idx: "1",
          details: [
            { detailtitle: "微信公众号配置", path: "/" },
            { detailtitle: "自定义菜单配置", path: "/" },
          ],
        },
        {
          title: "微官网管理",
          idx: "2",
          details: [
            { detailtitle: "医院基本信息", path: "/" },
            { detailtitle: "内容管理", path: "/" },
          ],
        },
        {
          title: "业务信息管理",
          idx: "3",
          details: [
            { detailtitle: "预约管理", path: "/" },
            { detailtitle: "挂号管理", path: "/" },
          ],
        },
        {
          title: "统计分析",
          idx: "4",
          details: [
            { detailtitle: "缴费记录管理", path: "/" },
            { detailtitle: "退费记录管理", path: "/" },
            { detailtitle: "自动对账管理", path: "/" },
          ],
        },
        {
          title: "权限管理",
          idx: "5",
          details: [
            { detailtitle: "角色管理", path: "/" },
            { detailtitle: "账户管理", path: "/" },
          ],
        },
        {
          title: "密码管理",
          idx: "6",
          details: [{ path: "/" }],
        },
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    loginout() {
      // 退出登录
      var v = this;
      v.$router.push("/");
    },
    showPwdChange() {
      // 打开修改密码弹出框
      var v = this;
      v.pwdChangeShow = true;
    },
    pwdChangeSave(){
      // 修改密码保存
      var v = this;
      v.$refs["changeform"].validate((valid) => {
        if(valid){
          v.confirm("确认修改密码？",function(isOk){
            if(isOk){
              console.log("修改密码成功")
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
    }
  },
  activated() {},
});
</script>
<style scoped>
@import url("../assets/css/menu.css");
</style>
