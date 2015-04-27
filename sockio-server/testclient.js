var io=require("socket.io-client", { query: "foo=bar" });
var socket = io.connect("http://127.0.0.1:9900");
socket.on("send id",function(data){
	console.log(data);
});
socket.on("disconnect",function(){
        console.log('disconnected!');
//	socket.emit("disconnect");
	process.exit();
});
socket.emit("getid",12);

