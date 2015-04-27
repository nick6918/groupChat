var _           = require("lodash")
  ;

module.exports = exports = function(_conn){
  return new NotifyModel(_conn);
};

var NotifyModel = function(_conn){
  this.conn = _conn;

  this.addNotification = function(touid, fromuid, type, operateid, content, time){
    var q = "INSERT INTO `notifications`(`uid`,`fromuid`,`type`,`operateid`,`content`,`time`) VALUES";
    var insertarr = [];
    if (_.isArray(touid)) {
      _.each(touid, function(uid){
        insertarr.push("(" + uid + "," + fromuid + ",'" + type + "'," + operateid + ",'" + content + "'," + time + ")");
      });
      q += insertarr.join(",");
    }else{
      q += "(" + touid + "," + fromuid + ",'" + type + "'," + operateid + ",'" + content + "'," + time + ")";
    }
    this.conn.querySync(q);
  };
  this.listNotification = function(uid){
    var UserModel = require('../models').UserModel;
    var ShopModel = require('../models').ShopModel;
    var q = "SELECT n.`fromuid`,n.`type`,n.`operateid`,n.`content`,n.`time` FROM `notifications` n WHERE n.`fromuid` = 0 AND n.`uid` = 0 AND n.`type` IN ('announcement','discount')";
    var result = this.conn.querySync(q);
    result = result.fetchAllSync();

    q = "SELECT n.`fromuid`,n.`type`,n.`operateid`,n.`content`,n.`time` FROM `notifications` n WHERE n.uid = " + uid + " AND n.`status` = 0 ORDER BY n.`time` DESC";
    var result2 = this.conn.querySync(q);
    result2 = result2.fetchAllSync();

    q = "UPDATE `notifications` n SET n.`status` = 1 WHERE n.`uid` = " + uid;
    this.conn.querySync(q);

    _.each(result2, function(notify){
      if (_.contains(["apply","invite","friendrequest","confirmrequest"], notify.type)) {
        if (notify.fromuid != "0") {
          var user = UserModel.getById(notify.fromuid);
          notify.user = user;
        }

        if (notify.type == "apply" && notify.operateid != "0") {
          var shop = ShopModel.getShopByOrderId(notify.operateid);
          notify.shop = shop;
        }
      }
    });
    if (!_.isEmpty(result)) {
      result2.unshift(result.pop());
      result2.unshift(result.pop());
    }
    return result2;
  };
  this.getNotificationUnReadCount = function(uid) {
    var q = "SELECT COUNT(*) AS cnt FROM `notifications` n WHERE n.uid = " + uid + " AND n.`status` = 0";
    var result = this.conn.querySync(q);
    result = result.fetchAllSync();
    return result[0].cnt;
  };
};