<template>
  <!-- <div class="fullscreen">
    <div class="login">
      <div class="backimg">
        <img src="../assets/img/loginbg.png" style="width:100%;height:100%;" />
      </div>
      <div class="loginform">
        <label class="login-lb1 nomarginBot">员工登录</label>
        <div class="line"></div>
        <div class="form">
          <el-form>
            <el-row>
              <el-col :span="24">
                <el-form-item label="用户名" class="formitem">
                  <el-input style="width:100%;" placeholder="请输入用户名" v-model="ucode"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="padding-top:4px">
              <el-col :span="24">
                <el-form-item label="密码" class="formitem">
                  <el-input style="width:100%" placeholder="请输入密码" type="password" v-model="upass"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-checkbox class="rmbuser" v-model="remflag">记住用户名</el-checkbox>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <el-button type="primary" class="loginbtn" @click="login()">登&nbsp;录</el-button>
      </div>
    </div>
    <el-dialog
      title="重置密码"
      :visible.sync="auditDialog"
      width="532px"
      class="auditDialog"
      :before-close="handleClose"
      :close-on-click-modal="false"
      top="14vh"
    >
      <div class="changePwd">
        <el-form
          :model="changeForm"
          :rules="rules"
          ref="changeForm"
          class="form"
          style="margin-top:0px"
        >
          <el-row style="padding-bottom:14px">
            <el-col :span="24">
              <el-form-item prop="newpass" style="width:100%;" label="新密码">
                <el-input
                  placeholder="请输入新密码"
                  size="medium"
                  show-password
                  v-model="changeForm.newpass"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item prop="checkPwd" style="width:100%;" label="确认新密码">
                <el-input
                  placeholder="确认新密码"
                  size="medium"
                  show-password
                  v-model="changeForm.checkPwd"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" class="txt-right">
              <el-button class="savebtn" type="primary" size="medium" style="margin:12px 0px" @click="save()">
                <i class="iconfont iconPC36"></i>
                修改
              </el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
  </div> -->
  <div class="fullscreen" @click="$router.push('/menu')"></div>
</template>

<script>
import util from "../components/util";
export default util.useCommon({
  data() {
        var validateOldPass = (rule, value, callback) => {
        if (this.changeForm.newpass !== "") {
          this.$refs.changeForm.validateField("newpass");
        }
        callback();

    };
    var validatePass = (rule, value, callback) => {
        if (
          /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/.test(value) == false
        ) {
          callback(new Error("请输入8~20位且由字母数字组成的密码！"));
        } else if (this.changeForm.oldpass == value) {
          callback(new Error("密码与原密码一致！"));
        } else if (this.changeForm.checkPwd !== "") {
          this.$refs.changeForm.validateField("checkPwd");
        }
        callback();

    };
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.changeForm.newpass) {
        callback(new Error("两次密码输入不一致！"));
      } else {
        callback();
      }
    };

    return {
      ucode: "",
      upass: "",
      remflag: false,
      changeForm: {
        newpass: "",
        checkPwd: ""
      },
      auditDialog:false,
      rules: {
        newpass: [
          { required: true, message: '请输入新密码！', trigger: 'blur' },
          { validator: validatePass, trigger: "blur" }
        ],
        checkPwd: [
          { required: true, message: '请再次输入新密码！', trigger: 'blur' },
          { validator: validatePass2, trigger: "blur" }
        ]
      },

    };
  },
  methods: {
    //登录
    login() {
      var v = this;
      //用户名，密码不能为空
      if (v.ucode == "" || v.upass == "") {
        var msg = [];
        if (v.ucode == "") {
          msg.push("请输入用户名!");
        }
        if (v.upass == "") {
          msg.push("请输入密码!");
        }
        v.message("error", msg.join("<br/>"));
        return;
      }

      v.dopost("/clogin/login", { ucode: v.ucode, upass: v.upass }, function(
        result
      ) {
        if ("0000" === result.state) {
          v.$router.replace("/menu");
          v.nyy.userInfo = result.body;
          v.nyy.userInfo.websocketStarted = false;
          localStorage.setItem("userInfo", JSON.stringify(v.nyy.userInfo));
          //勾选记住用户名，把用户名储存在cookie中，未勾选则清除cookie
          if (v.remflag == true) {
            v.setCookie(v.ucode, 7);
          } else {
            v.clearCookie();
          }
        } else if ("2000" === result.state) {
          v.auditDialog = true;   
          v.changeForm.oldpass = "111111";       
        } else if ("1000" === result.state) {
          var msg = [];
          for (var i = 0; i < result.body.length; i++) {
            msg.push(result.body[i].errmsg);
          }
          v.message("error", msg.join("<br/>"));
        }
        console.log(result);
      });
    },
    //点击登录调用设置上cookie
    //参数：用户名-密码-到期天数
    setCookie(ucode, num) {
      const time = new Date();
      time.setTime(time.getTime() + 24 * 60 * 60 * 1000 * num);
      //加上window.btoa是为了对用户名和密码进行编码，不让cookie明文展示
      window.document.cookie = `ucode=${window.btoa(
        ucode
      )}; path=/; expires=${time.toGMTString()}`;
    },

    //读取cookie
    getCookie() {
      if (document.cookie.length > 0) {
        const cookieArr1 = document.cookie.split(";");
        for (var i = 0; i < cookieArr1.length; i++) {
          const cookieArr2 = cookieArr1[i].split("=");
          //避免输入中含有空格，消除文本框空格
          cookieArr2[0] = cookieArr2[0].replace(/\s+/g, "");
          if (cookieArr2[0] == "ucode") {
            //读取cookie然后进行解码
            this.ucode = window.atob(cookieArr2[1]);
            this.upass = "";
            this.remflag = true;
          }
        }
      }else{
        //无缓存时,清除上次输入的痕迹
        this.ucode = "";
        this.upass = "";
      }
    },
    //清除cookie
    clearCookie() {
      this.setCookie("", "", -1);
    },
    save() {
      //保存
      var v = this;
      v.$refs["changeForm"].validate(valid => {
        if (valid) {
          v.confirm("确定修改密码?", function(isOk) {
            if (isOk) {
              v.dopost("/clogin/changPwd", 
              {
                ucode:v.ucode,
                newpass:v.changeForm.newpass,
              }, 
              function(result) {
                if ("0000" === result.state) {
                  v.message("success", "密码修改成功，请重新登录！");
                  // 重新登陆
                  v.$refs["changeForm"].resetFields();
                  v.auditDialog = false; 
                  v.upass = "";
                } else {
                  var msg = [];
                  for (var i = 0; i < result.body.length; i++) {
                    msg.push(result.body[i].errmsg);
                  }
                  v.message("error", msg.join("<br/>"));
                }
                console.log(result);
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    handleClose(done) {
      var v = this;
      v.$confirm("确认关闭？")
        .then(_ => {
         v.$refs["changeForm"].resetFields();
         v.auditDialog = false;
         done();
        })
        .catch(_ => {});
    },

  },
  activated() {
    var v = this;
     v.getCookie();
  }
});
</script>
<style scoped>
.fullscreen {
  border: red 1px solid;
}

</style>
