var mysql     = ''//require('mysql-libmysqlclient')
  , dbConfig  = require('../libs/dbconfig')
  , conn;
var mysql = require('mysql');
var conn = mysql.createConnection(dbConfig.config);
conn.connect();


exports.PushMessage              = require('./PushMessage')(conn);

// exports.NotifyModel           = require('./NotifyModel')(conn);
// exports.DepartmentModel       = require('./DepartmentModel')(conn);
// exports.SmsModel              = require('./SmsModel')(conn);
// exports.LogModel              = require('./LogModel')(conn);
// exports.OrderModel            = require('./OrderModel')(conn);
// exports.PrizeModel            = require('./PrizeModel')(conn);
// exports.UserModel             = require('./UserModel')(conn);
// exports.UserLinkAccountModel  = require('./UserLinkAccountModel')(conn);
// exports.UserMessageModel      = require('./UserMessageModel')(conn);
// exports.ActivityModel         = require('./ActivityModel')(conn);
// exports.CouponModel           = require('./CouponModel')(conn);
// exports.ShopModel             = require('./ShopModel')(conn);
// exports.PictureModel          = require('./PictureModel')(conn);
// exports.ProductModel          = require('./ProductModel')(conn);
// exports.ReviewModel           = require('./ReviewModel')(conn);
// exports.GuestbookModel        = require('./GuestbookModel')(conn);
// exports.ShopManagerModel      = require('./ShopManagerModel')(conn);
// exports.AdminModel            = require('./AdminModel')(conn);
// exports.SalesModel            = require('./SalesModel')(conn);
// exports.SystemModel           = require('./SystemModel')(conn);
// exports.GameModel             = require('./GameModel')(conn);
// exports.AdvertModel           = require('./AdvertModel')(conn);
// exports.EmployeeModel         = require('./EmployeeModel')(conn);
// exports.ShopActivityModel     = require('./ShopActivityModel')(conn);
// exports.WorkflowModel         = require('./WorkflowModel')(conn);
// exports.SaleTaskModel         = require('./SaleTaskModel')(conn);
// exports.NoticeModel           = require('./NoticeModel')(conn);
// exports.KtvModel              = require('./KtvModel')(conn);
