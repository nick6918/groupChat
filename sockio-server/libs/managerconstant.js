module.exports = exports = require("./constant");
exports.permissions = [
                        exports.kADMIN,
                        exports.kSALES,
                        exports.kSERVICE,
                        exports.kSHOP,
                        exports.kSUBSHOP,
                        exports.kUSER,
                        exports.kPROJECTMANAGER,
                        exports.kPRODUCTMANAGER,
                        exports.kBUSINESSUPPORT,
                        exports.kMARKETPLACE,
                      ];
exports.permissions.push(exports.kVIEWER);
exports.permissions.push(exports.kFAKEADMIN);

exports.permissionDesc = {};
exports.permissionDesc[exports.kADMIN]            = "管理员组";
exports.permissionDesc[exports.kFAKEADMIN]        = "管理员组";
exports.permissionDesc[exports.kSALES]            = "业务员组";
exports.permissionDesc[exports.kSERVICE]          = "客服组";
exports.permissionDesc[exports.kSHOP]             = "商家总店";
exports.permissionDesc[exports.kSUBSHOP]          = "商家分店";
exports.permissionDesc[exports.kUSER]             = "用户组";
exports.permissionDesc[exports.kPROJECTMANAGER]   = "项目经理组";
exports.permissionDesc[exports.kPRODUCTMANAGER]   = "产品经理组";
exports.permissionDesc[exports.kBUSINESSUPPORT]   = "商务支持组";
exports.permissionDesc[exports.kMARKETPLACE]      = "市场推广组";
exports.permissionDesc[exports.kVIEWER]           = "查看组";

exports.modulePermission = {};
exports.modulePermission.order = [];
exports.modulePermission.order.push(exports.kADMIN);
exports.modulePermission.order.push(exports.kFAKEADMIN);
exports.modulePermission.order.push(exports.kSALES);
exports.modulePermission.order.push(exports.kSERVICE);
exports.modulePermission.order.push(exports.kSHOP);
exports.modulePermission.order.push(exports.kSUBSHOP);
exports.modulePermission.order.push(exports.kVIEWER);
exports.modulePermission.shop = [];
exports.modulePermission.shop.push(exports.kADMIN);
exports.modulePermission.shop.push(exports.kFAKEADMIN);
exports.modulePermission.shop.push(exports.kBUSINESSUPPORT);
exports.modulePermission.shop.push(exports.kPROJECTMANAGER);
exports.modulePermission.shop.push(exports.kPRODUCTMANAGER);
exports.modulePermission.shop.push(exports.kMARKETPLACE);
exports.modulePermission.employee = [];
exports.modulePermission.employee.push(exports.kADMIN);
exports.modulePermission.employee.push(exports.kFAKEADMIN);
exports.modulePermission.groupsales = [];
exports.modulePermission.groupsales.push(exports.kADMIN);
exports.modulePermission.groupsales.push(exports.kFAKEADMIN);
exports.modulePermission.groupsales.push(exports.kBUSINESSUPPORT);
exports.modulePermission.groupsales.push(exports.kPROJECTMANAGER);
exports.modulePermission.groupsales.push(exports.kPRODUCTMANAGER);
exports.modulePermission.shopactivitys = [];
exports.modulePermission.shopactivitys.push(exports.kADMIN);
exports.modulePermission.shopactivitys.push(exports.kFAKEADMIN);
exports.modulePermission.shopactivitys.push(exports.kSERVICE);
exports.modulePermission.shopactivitys.push(exports.kBUSINESSUPPORT);
exports.modulePermission.shopactivitys.push(exports.kPROJECTMANAGER);
exports.modulePermission.shopactivitys.push(exports.kPRODUCTMANAGER);
exports.modulePermission.shopactivitys.push(exports.kMARKETPLACE);

exports.modules = [];
exports.modules.push({title: "员工管理",      url: "/employees",      permission: "employee", });
exports.modules.push({title: "订单管理",      url: "/orders",         permission: "order", });
exports.modules.push({title: "商家信息管理",  url: "/shopmanager",    permission: "shop", });
exports.modules.push({title: "团购信息管理",  url: "/groupsale",      permission: "groupsales", });
exports.modules.push({title: "活动信息管理",  url: "/shopactivitys",  permission: "shopactivitys", });

exports.contracts = {
  0:    "无",
  98:   "酒水",
  99:   "折扣",
  100:  "优惠券",
  101:  "团购",
};
exports.productOffers = {
  100: "会员价",
  101: "会员套餐",
  102: "尊享套餐",
  103: "免费欢唱",
  104: "满百减十",
  105: "买一唱三",
};
exports.weekday = {
  1:"星期一",
  2:"星期二",
  3:"星期三",
  4:"星期四",
  5:"星期五",
  6:"星期六",
  7:"星期天",
};
exports.producttype = ['小包厢','中包厢','大包厢'];
exports.productsubtype = ['下午','晚上','凌晨'];

exports.orderstatus = {
  "all":      "所有订单",
  "start":    "待处理订单",
  "confirm":  "已确认订单",
  "finish":   "已完成订单",
  "cancel":   "已取消订单",
  "delete":   "已删除订单",
  "close":    "已关闭订单",
  "reserve":  "预订中订单",
};

exports.groupsalesType = {
  "sale":   "团购",
  "limit":  "秒杀",
  "prize":  "抽奖",
};

exports.groupsalesPrizeIntervalType = {
  "day":  "按天",
  "week": "按周",
  "month": "按月",
};

exports.activityType = {
  "city":   "同城",
  "sale":   "团购",
  "limit":  "秒杀",
};

exports.activityStatus = {
  "leave":  "退出",
  "join":   "参加",
  "wait":   "等待",
  "deny":   "拒绝",
};

exports.numberToChinese = {
  "1":  "一",
  "2":  "二",
  "3":  "三",
  "4":  "四",
  "5":  "五",
  "6":  "六",
  "7":  "七",
  "8":  "八",
  "9":  "九",
};

exports.ORDERSTATUS_START     = 0;
exports.ORDERSTATUS_CONFIRM   = 1;
exports.ORDERSTATUS_FINISH    = 2;
exports.ORDERSTATUS_CANCEL    = 3;
exports.ORDERSTATUS_DELETE    = 4;
exports.ORDERSTATUS_CLOSE     = 5;
exports.ORDERSTATUS_RESERVE   = 6;
exports.orderStatus = {
  "start":    0,
  "confirm":  1,
  "finish":   2,
  "cancel":   3,
  "delete":   4,
  "close":    5,
  "reserve":  6,
};
