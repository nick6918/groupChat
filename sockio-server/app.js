//require necessary modules
var http = require('http')
  , express = require('express')
  , socketIO = require("socket.io")
  , path = require('path')
  , Models = require('./models')
  , PushMessage  =  Models.PushMessage
  ,randomstring = require("randomstring")
  , log = require('./libs/log');
//initialize our application
var app = express();
log.use(app);
app.set('port', process.env.PORT || 8002);
 
app.use(express.static(path.join(__dirname, 'assets')));
var server = http.createServer(app).listen(app.get('port'));
var io = socketIO.listen(server);
//io.set('log level', 0);
io.set('heartbeat interval',15);
io.set('heartbeat timeout',20);
//settings
//authorization is still unused...
io.set('authorization', function (handshakeData, cb) {
    console.log('Auth: ', handshakeData.query);
    cb(null, true);
});
var settings = {
  'view_directory': '/views'
}
var logger = require('./libs/log').logger;
logger.setLevel('INFO');
app.get('/', function(request, response){
  response.sendfile(__dirname  + '/index.html')
});

var allusers={};
var allsockets={};
var alluids={};
var rooms={};
var ktvbox={};
//chat using socket.io
io.sockets.on('connection', function(client){
  //when client sends a join event
  client.on('join', function(data,fn){
   logger.debug('into join...'+data.uid);
    allsockets[client.id]=client;
	//??? how can client save id info?
    allusers[client.id]=data.uid;
    alluids[data.uid]=client;
    if(fn){
      //fn({success:true,msg:data});
    }
   // client.broadcast.emit('message', { message: data + " just joined!", nickname: "Server Announcement" });
  });


  //when client sends a message
  client.on('message', function(data,fn){
    console.log("send message----");
    console.log("crrent_id: "+client.id+",crrent_uid: "+allusers[client.id]);
   for (var i in alluids){
	console.log('uid: '+i+",client_id: "+alluids[i].id);
  }
  //???what's this loop for???
    
    var scid=alluids[data.touid];
    var state="online";
    if (scid){
	console.log(data.touid+' online!!');
      scid.emit('message', {message: data.message,uid: allusers[client.id],username: data.username});
    }else{
	console.log(data.touid+' offline!!');
      PushMessage.sendMessage(data.username,data.touid,data.message,PushMessage.pushBAM);
	state="offline";
      //fn({success:false,msg:data});
    }
    if(fn){
      fn({success: true,msg: data,state:state});
    }
    // client.get('nickname', function(err, nickname){
    //   client.broadcast.emit('message', { message: data, nickname: nickname });      
    // });
  });

  client.on('joinroom',function(data,fn){
    console.log('-->' +rooms[data.room]);
    if(!rooms[data.room]){
      rooms[data.room]=[];
    console.log('12121->'+rooms[data.room]);
      rooms[data.room].push(parseInt(data.uid));
    console.log('3333->'+rooms[data.room]);

    }else{
      rooms[data.room].push(parseInt(data.uid));
    }
    function unique(arr) {
      var ret = []
      var hash = {}

      for (var i = 0; i < arr.length; i++) {
        var item = arr[i]
        var key = typeof(item) + item
        if (hash[key] !== 1) {
          ret.push(item)
          hash[key] = 1
        }
      }

      return ret
    }
    rooms[data.room]=unique(rooms[data.room]);
    console.log(rooms);

    client.join(data.room);
    console.log(data.room);
    if(fn){
      fn({success: true,msg: data});
    }

  });

  client.on('leaveroom',function(data,fn){
    if(!rooms[data.room] || rooms[data.room].length<=0){
      return;
    }
    var index = rooms[data.room].indexOf(data.uid);
    if (index > -1) {
        rooms[data.room].splice(index, 1);
    }
    client.leave(data.room);
    console.log(data.room);
    if(fn){
      fn({success: true,msg: data});
    }

  });
  client.on('groupchat',function(data,fn){
   console.log(data);
    PushMessage.sendGroupMessage(data.username,data.message,rooms[data.room],data.room,PushMessage.pushBAM);
    client.broadcast.to(data.room).emit('groupchat',data);
    if(fn){
      fn({success: true,msg: data});
    }

  });

  client.on('forward', function(msg){
	console.log(msg);
	if(msg.touid==""){
		//io.sockets.sockets[ktvbox[msg.fromuid]].emit('error',{error:21000,uid:""});
		return false;
	}
	uids=msg.touid.split(',');
        for(var i in uids){
		if(ktvbox[uids[i]]){
			var sid = ktvbox[uids[i]];
                	if(io.sockets.sockets[sid]) {
                        	io.sockets.sockets[sid].emit('message', msg);
                        	console.log("emit "+uids[i]);
                	}
                	else{
		      		if(io.sockets.sockets[ktvbox[msg.fromuid]]){
   	                    		io.sockets.sockets[ktvbox[msg.fromuid]].emit('error',{error:21000,uid: uids[i]});
		      		}
                	}
		}else{
			if(io.sockets.sockets[ktvbox[msg.fromuid]]){
				io.sockets.sockets[ktvbox[msg.fromuid]].emit('error',{error:21000,uid: uids[i]});
			}
		}

        }
  });
  client.on('danmu', function(msg){
	if(msg.touid==""){
                //io.sockets.sockets[ktvbox[msg.fromuid]].emit('error',{error:21000,uid:""});
		return false;
        }
        uids=msg.touid.split(',');
        for(var i in uids){
            //    console.log(ktvboxs[uids[i]]);
		if(ktvbox[uids[i]]){
			var sid = ktvbox[uids[i]];
                	if(io.sockets.sockets[sid]) {
                        	io.sockets.sockets[sid].emit('danmu', msg,function(result){
                                	console.log(result);
                        	});
                        	console.log("emit "+uids[i]);

                	}else{
                        	io.sockets.sockets[ktvbox[msg.fromuid]].emit('error',{error:21000,uid: uids[i]});

                	}
		}else{
                        if(io.sockets.sockets[ktvbox[msg.fromuid]]){
                                io.sockets.sockets[ktvbox[msg.fromuid]].emit('error',{error:21000,uid: uids[i]});
                        }
                }

        }
  });
  client.on('getid', function(msg,fn){
	var ronstr=randomstring.generate(12);
	while(true){
		for(var i in ktvbox){
			if(i==ronstr){
				ronstr=randomstring.generate(8);
				continue;
			}
		}
		
		break;
	}
	console.log(ronstr);	
	ktvbox[ronstr]=client.id;
      if(fn){
        fn({'oid':client.id,id: ronstr})
      }
    	client.emit('send id',{'oid':client.id,id: ronstr});
  });
  client.on('disconnect', function(){
	console.log(allusers[client.id]+" disconnect!!!!!!!!");
//	console.log(alluids);
    delete allsockets[client.id]
    delete alluids[allusers[client.id]]
    delete allusers[client.id];
	for(var i in ktvbox){
		if(ktvbox[i]==client.id){
			delete ktvbox[i];
		}
	}
  });


})
