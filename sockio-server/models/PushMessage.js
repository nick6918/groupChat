var _             = require("lodash")
  , apns          = require('apn')
  , notifyConfig  = require('../libs/notify')
  , util          = require('../libs/utils')
  , settings      = require('../libs/settings')
  , baiduPush     = require('../libs/baiduPush')
  , request = require('request');

module.exports = exports = function(_conn){
  return new PushMessage(_conn);
};

var PushMessage = function(_conn){
  this.conn = _conn;
  this.sendMessage = function(fromname,touid,message,callback){
  	q="SELECT etid,source,ios,android,a_channelid FROM `employees_token` WHERE etid="+touid+";"
 	this.conn.query(q, function (err, rows) {
          if(err){
            console.error(err);
            return;
          }
          callback(rows,fromname,message)
    	}); 
 }
  this.sendGroupMessage=function(username,message,oluids,room,callback){

    q="SELECt etid,source,ios,android,a_channelid FROM `employees_token` WHERE room='"+room+"'"
    if (oluids.length>0){
      uids="";
      for(var i=0;i<oluids.length;i++){
        uids+=oluids[i]+",";
      }
      uids=uids.substr(0,uids.length-1);
      q+=" AND etid not in ("+uids+")"
    }
    this.conn.query(q, function (err, rows) {
          if(err){
            console.error(err);
            return;
          }
          callback(rows,username,message)
    });

  }
  this.pushBAM=function(arr,fromname,message){

       var apnsConnection = new apns.Connection(notifyConfig.options);
       var bpush = new baiduPush({ak: settings.baidupush_apikey, sk: settings.baidupush_secretkey});
       _.each(arr, function(userinfo){
       if(userinfo.source=='ios'){
          var USER_DATA = {
              token: userinfo.ios,
              msg:fromname+": "+message
          }

          request.post(
              settings.IOSPush+'/pushmessage',
              { form: USER_DATA},
              function (error, response, body) {
                  if (!error && response.statusCode == 200) {
                      console.log(body);
                  }else{
                    console.error('ios push error!');
                  }
              }
          );
          // var myDevice = new apns.Device(userinfo.ios);
          // var notify = new apns.Notification();

          // notify.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
          // notify.badge = 1;
          // notify.sound = "ping.aiff";
          // notify.alert = message;
          // notify.payload = {'messageFrom': fromname};
          // console.log('------> ' + notify);

          // apnsConnection.pushNotification(notify, myDevice);

       }else{
	console.log(userinfo);
	var USER_DATA = {
              android:1,
              userid: userinfo.android,
              channelid:userinfo.a_channelid,
              message: fromname+": "+message
        }
        request.post(
              settings.IOSPush+'/pushmessage',
              { form: USER_DATA},
              function (error, response, body) {
                  if (!error && response.statusCode == 200) {
                      console.log(body);
                  }else{
                    console.error('android push error!');
                  }
              }
          );
//          var opt = {
//            push_type: 1,
  //          user_id: userinfo.android,
//            channel_id:userinfo.a_channelid,
    //        messages: message,
      //      msg_keys: "新私信"
        //  };
	 //console.log('------> ' + opt);
         // bpush.pushMsg(opt, function(err, result){
         //   if (err) {
         //     console.log("message send to android device fail");
         //     console.log(err);
         //   }
         // });
       }

     });

  }

}


