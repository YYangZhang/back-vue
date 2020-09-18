<script>
var user;
let loading = false;

import CONST from "./Const.vue";
import { Loading } from 'element-ui';
import ElementUI from 'element-ui';

const appkey = "Authorization";
const appsecretHead = "Bearer ";
const domain = CONST.domain;
//const domain = process.env.NODE_ENV == "production" ? "" : CONST.domain;


import Vue from "vue";
import axios from "axios";

const bus = new Vue();
let loadingMask;
bus.$on("loading",(showFlg)=>{
  if(showFlg){
    loadingMask = Loading.service({ fullscreen: true });
  }else{
    if(loadingMask&&loadingMask.close)loadingMask.close();
  }
})
const dopost = function(v, url, data, onSucceed, onFailure, onComplete) {
  //var user = v.nyy.userInfo;
  axios.defaults.headers.common[appkey] = user
    ? appsecretHead + user.token
    : "";
  axios.defaults.headers.post["Content-Type"] = "application/json";

  v.nyy.bus.$emit("loading", true);
  axios({
    method: "post",
    url:  domain + url,
    timeout: 300000,
    data: data
  })
    .then(function(response) {
      v.nyy.bus.$emit("loading", false);
      if (onSucceed) onSucceed(response.data);
      if (onComplete) onComplete();
    })
    .catch(function(error) {
      v.nyy.bus.$emit("loading", false);
      if (onFailure) onFailure(error);
      if (onComplete) onComplete();
      if (!(onFailure || onComplete)) {
        console.log("➝➝➝ERROR：url：" + url + "；" + error.message);
        if (
          error &&
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          var errmes = error.response.data.message;
          if (errmes.toLowerCase().indexOf("token") != -1) {
            v.$alert("登录信息已过期,请重新登录", "提示", {
                confirmButtonText: "确定",
                callback:  function() {
                // 退出登录
                 v.nyy.userInfo = undefined;
                localStorage.removeItem("userInfo");
                v.$router.replace("/");
              }
              });
          } else {
           v.$message.error("网络好像开小差了。。。");
          }
        } else {
          v.$message.error("网络好像开小差了。。。");
        }
      }
    });
};


const notify =  function(v ,type, title , msg,callback ){
     v.$notify({
      title: title,
      dangerouslyUseHTMLString: true,
      type:type,
      message: msg,
      showClose: true,
      onClick:callback,
      position: 'bottom-right'
    });
};
const alert = function(v, msg, callback) {
  v.$alert(msg, "提示", {
    confirmButtonText: "确定",
    callback: callback
  });
};
const doUpload = function(v, url, formData, onSucceed, onFailure, onComplete) {
  //var user = v.nyy.userInfo;
  axios.defaults.headers.common[appkey] = user
    ? appsecretHead + user.token
    : "";
  axios.defaults.headers.post["Content-Type"] = "multipart/form-data";

  v.nyy.bus.$emit("loading", true);
  axios({
    method: "post",
    url:  domain + url,
    timeout: 50000,
    data: formData
  })
    .then(function(response) {
      v.nyy.bus.$emit("loading", false);
      if (onSucceed) onSucceed(response.data);
      if (onComplete) onComplete();
    })
    .catch(function(error) {
      v.nyy.bus.$emit("loading", false);
      if (onFailure) onFailure(error);
      if (onComplete) onComplete();
      if (!(onFailure || onComplete)) {
        //v.$toast({message: '网络好像开小差了。。。', position: 'bottom', duration: 5000});
        v.$message.error("网络好像开小差了。。。");
      }
    });
};

const confirm = function(v, msg, callback) {
  v.$confirm(msg, "确认", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    closeOnClickModal: false,
    closeOnPressEscape: false,
    closeOnHashChange: false,
    type: "info"
  })
    .then(() => {
      callback(true);
    })
    .catch(() => {
      callback(false);
    });
};


export default {
  get userInfo() {
    return user;
  },
  set userInfo(val) {
    user = val;
  },
  // //用户token身份
  dopost,
  CONST, //固定值
  bus,
  doUpload,
  loading,
  alert,
  confirm,
  notify,
  message: function(v, type, msg, duration) {
    v.$message({
      type: type,
      dangerouslyUseHTMLString: true,
      message: msg,
      duration: duration ? duration : 6000,
      showClose: true
    });
  }
};

</script>