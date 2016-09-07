(function($){

  function CookieOper(){

  }

  CookieOper.prototype.init = function(key,value,time){

    //判断是否是集合 批量存储
    if(Object.prototype.toString.call(key) == '[object Object]'){

      //判断是否设置过期时间
      if(Object.prototype.toString.call(value) == '[object Number]'){
        for(var i in key){
          this.set(i,key[i],value);
        }
      } else {
        for(var i in key){
          this.set(i,key[i]);
        }
      }

    //判断是否为字符串  单个存储
    } else if(Object.prototype.toString.call(key) == '[object String]'){
      //判断是否读写删除
      //删除
      if(value == true){
        this.clear(key,false);

      //设置
      } else if(value) {

        //判断是否设置过期时间
        if(Object.prototype.toString.call(time) == '[object Number]'){
          this.set(key,value,time);
        } else {
          this.set(key,value);
        }
      
      //读取
      } else {
        return this.get(key,false);
      }
    //判断是否为数组
    } else if(Object.prototype.toString.call(key) == '[object Array]'){
      //判断是读还是clear
      if(value == true){
        this.clear(key,true);
      } else {
        return this.get(key,true);
      }

    }

  }

  //设置cookie方法
  CookieOper.prototype.set = function(key,value,time){

    var expires;
    if(time){
      var myDate = new Date();
      myDate.setTime(myDate.getTime() + (time*24*60*60*1000));
      expires = "expires=" + myDate.toUTCString();
      document.cookie = key + "=" + value + "; " + expires;
    } else {
      document.cookie = key + "=" + value + "; ";
    }

  }

  //读取cookie方法
  CookieOper.prototype.get = function(key,off){
    var cookied = document.cookie.split('; ');
    var cookiedArr= [];
    var keyArr = [];
    var cookiedStr = null;

    if(Object.prototype.toString.call(key) == '[object Array]'){
      keyArr = key;
    } else {
      keyArr.push(key);
    }

    for(var i=0,maxi=cookied.length;i<maxi;i++){
      var temp = cookied[i].substring(0,cookied[i].indexOf('='));
      $.each(keyArr,function(index,value){
        if(temp == value){
          if(off){
            cookiedArr.push(cookied[i].substring(cookied[i].indexOf('=')+1,cookied[i].length));
            return false;
          } else {
            cookiedStr = cookied[i].substring(cookied[i].indexOf('=')+1,cookied[i].length);
            return false;
          }
          
        }
      }.bind(this));

      if(cookiedStr){
        break;
      }
    }
    return cookiedStr || cookiedArr;
  }

  //清除cookie方法
  CookieOper.prototype.clear = function(key,arrOff){

    if(arrOff){
      $.each(key,function(index,val){
        this.set(val,'',-1);
      }.bind(this));        
    } else {
      this.set(key,'',-1);
    }
    
  }

  $.extend({
    cookieOper : function(key,value,time){
      var cookies = new CookieOper();
      return cookies.init(key,value,time);;
    }
  });
})($);