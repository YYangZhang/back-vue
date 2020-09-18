<script>
 export default
 {
  extendAll : function(destination, source) {
    for (var property in source) {
        destination[property] = source[property];
    }
    return destination;
  },
  useCommon:function(obj){
    if(obj.activated)obj.activated_ = obj.activated;
    obj.activated = function(){
      var v = this;
      console.log('activated:'+obj.name);
      if(obj.activated_)obj.activated_.call(v);
    };

    if(obj.deactivated)obj.deactivated_ = obj.deactivated;
    obj.deactivated = function(){
      var v = this;
      console.log('deactivated:'+obj.name);
      if(obj.deactivated_)obj.deactivated_.call(v);
    };
    if(!obj.methods)obj.methods={};
    obj.methods.call=function(func, ...paras){
      var v = this;
      func.apply(v, paras);
    };
    obj.methods.dopost = function(url, data, onSucceed, onFailure,onComplete){
      this.nyy.dopost(this, url, data, onSucceed, onFailure,onComplete);
    };
    obj.methods.notify=function(type,title,msg,callback){
      this.nyy.notify(this,type, title , msg,callback);
    },
    obj.methods.alert=function(msg, callback){
      this.nyy.alert(this, msg, callback);
    },
    obj.methods.confirm=function( msg, callback){
      this.nyy.confirm(this, msg, callback);
    },
    obj.methods.message=function(type, msg, duration){
      this.nyy.message(this, type, msg, duration);
    },
    obj.methods.hasPerm=function(operationkey,url){
			var hasPermFlg = false;
			var val = operationkey ;
			var permissionList = this.nyy.permissionList;
			if(permissionList){
				for (var i = 0; i < permissionList.length; i++) {
					if (permissionList[i].operationkey == val && permissionList[i].frmaddr == url) {
						hasPermFlg = true;
						break;
					}
				}
			} 
			return hasPermFlg;
		}
    return obj;
  }

 }
</script>