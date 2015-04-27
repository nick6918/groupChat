var _               = require("lodash")
  , security        = require("../libs/security")
  , settings        = require("../libs/settings")
  , Models          = require('../models')
  , UserModel       = Models.UserModel
  , ShopModel       = Models.ShopModel
  , ActivityModel   = Models.ActivityModel;

exports.getCurrentUser = function(req, res, next){
  if (_.isUndefined(req.auth)){
    next();
  }else{
    var user = req.auth;
    if (user.username != "(null)" && user.password != "(null)" &&
          !_.isEmpty(user.username) && !_.isEmpty(user.password)) {
      UserModel.authUser(user, function(uid, gid){
        if (!_.isNull(uid)){
          user.uid = uid;
          req.user = user;
        }
        next();
      });
    }
  }
};
exports.authUser = function(req, res, next) {
  if (req.path != "/login") {
    if (req.user) {
      if (!_.isNull(uid) && !_.isUndefined(uid)) {
        req.user.uid = uid;
      }else{
        res.json(403,{error:"用户验证失败，请重新登录",status:"authfail"});
        return;
      }
    }
  }
  next();
};
exports.sendNotify = function(req, res) {
  res.send("yes");
};
exports.escapes = function(deepobj){
  var keys = _.keys(deepobj);
  var filter = /(script)|(&lt;)|(&gt;)|(%3c)|(%3e)|(SELECT) |(UPDATE) |(INSERT) |(DELETE)|(GRANT) |(REVOKE)|(UNION)|(&amp;lt;)|(&amp;gt;)/i;
  for(var i = 0; i < keys.length; i++){
    var key = keys[i];
    var value = deepobj[key];
    if (key == "password") continue;
    if (_.isObject(value)) {
      this.escapes(value);
    }else if (_.isArray(value)) {
      for (var j = 0; j < value.length; j++) {
        var innerObj = value[j];
        this.escapes(innerObj);
      }
    }else{
      if (value.match(filter) !== null && key != "status") {
        throw new Error("请求的内容中包含不合法关键词，请更改后再次提交");
      }
      value = value.replace(/\r\n/g,"\n").replace(/\r/g,"\n");
      deepobj[key] = _.escape(value);
    }
  }
  return deepobj;
};
exports.unescapes = function(deepobj){
  var keys = _.keys(deepobj);
  for(var i = 0; i < keys.length; i++){
    var key = keys[i];
    var value = deepobj[key];
    if (_.isEmpty(value)) continue;
    if (_.isObject(value)) {
      this.unescapes(value);
    }else if (_.isArray(value)) {
      for (var j = 0; j < value.length; j++) {
        var innerObj = value[j];
        this.unescapes(innerObj);
      }
    }else{
      value = value.replace(/\r\n/g,"\n").replace(/\r/g,"\n");
      deepobj[key] = _.unescape(value);
    }
  }
  return deepobj;
};
exports.validateUrlPermission = function(req, res, next){
  if (!security.checkSignature(req.query, settings.weixinToken)) {
    res.send(401,{error:"无法通过验证，请确认软件版本是否无误，或联系管理员"});
    return;
  }else{
    next();
  }
};
/*
exports.getUser = function(req, res, next, id){
  var user = UserModel.getById(id);
  if (user == null) {
    try {
      throw new Error("用户不存在");
    } catch(e) {
      next(e);
    }
  }else{
    // if (!_.isEmpty(req.user) && user.username == req.user.username) {
    //   req.user = user;
    // }
    req.requestUser = user;
    next();
  }
};
exports.getOrder = function(req, res, next, id){
  //todo:根据id获取订单
  var order = {};
  req.requestOrder = order;
  next();
};
exports.getShop = function(req, res, next, id){
  //todo:根据id获取商家
  var shop = {};
  req.requestShop = shop;
  next();
};
exports.getActivity = function(req, res, next, id){
  //todo:根据id获取活动
  var activity = {};
  req.requestActivity = activity;
  next();
};
*/