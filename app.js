/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var ibmdb = require('ibm_db');
var bodyParser = require('body-parser');


// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

// serve the files out of ./public as our main files


// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();
console.log(process.env)


// start server on the specified port and binding host
app.listen(appEnv.port, function() {

	// print a message when the server starts listening
  
});

app.post('/getCharInfo', function(req,res) {
	var name = req.body.name;
	ibmdb.open("DRIVER={DB2};DATABASE=SQLDB;HOSTNAME=75.126.155.153;UID=user17475;PWD=KPXHTqJk0UWO;PORT=50000;PROTOCOL=TCPIP", function (err,conn) {
	  if (err) return console.log(err);
	var query_string="select * from character where name in ('" + name + "')";
	
 	 conn.query(query_string, function (err, data) {
   		if (err) console.log(err);
    		else {
			var reply = data[0].STATSTR + "," + data[0].STATDEX + "," + data[0].STATINT + "," + data[0].STATLUK + "," + data[0].EXP + ","+ data[0].LEVEL + "," + data[0].NEXTLVLEXP + "," + data[0].SP + "," + data[0].MAXHP + "," + data[0].MAXMP + ","	 + data[0].MONEY + "," + data[0].POTIONS + "," + data[0].BOMBS;
			//console.log(data[0].PASSWORD);
			res.end(reply);
		}

   		 conn.close(function () {
    		  console.log('done');
   	 });
 	 });
	});
});

app.post('/update', function(req,res) {
	var name = req.body.name;
	var str = req.body.str;
	var dex = req.body.dex;
	var int = req.body.int;
	var luk = req.body.luk;
	var exp = req.body.exp;
	var level = req.body.level;
	var nextlvlexp = req.body.nextlvlexp;
	var sp = req.body.sp;
	var maxhp = req.body.maxhp;
	var maxmp = req.body.maxmp;
	var money = req.body.money;
	var potions = req.body.potions;
	var bombs = req.body.bombs;
	ibmdb.open("DRIVER={DB2};DATABASE=SQLDB;HOSTNAME=75.126.155.153;UID=user17475;PWD=KPXHTqJk0UWO;PORT=50000;PROTOCOL=TCPIP", function (err,conn) {
	  if (err) return console.log(err);
	var query_string="update character set statstr = " + str + ",statdex = " + dex + ",statint = " + int + ",statluk = " + luk + ",exp = " + exp + ",level = " + level  + ",nextlvlexp = " + nextlvlexp + ",sp = " + sp + ",maxhp = " + maxhp + ",maxmp = " + maxmp + ",money=" + money + ",potions = " + potions + ",bombs = " + bombs + " where name in ('" + name + "')"; 
	
 	 conn.query(query_string, function (err, data) {
   		if (err) console.log(err);
    		else {
				res.end("got");
			
		}

   		 conn.close(function () {
    		  console.log('done');
   	 });
 	 });
	});
}); 


app.post('/auth',function(req,res) {
	var name = req.body.name;
	var pwd = req.body.pwd;
	ibmdb.open("DRIVER={DB2};DATABASE=SQLDB;HOSTNAME=75.126.155.153;UID=user17475;PWD=KPXHTqJk0UWO;PORT=50000;PROTOCOL=TCPIP", function (err,conn) {
	  if (err) return console.log(err);
	var query_string="select * from character where name in ('" + name + "')";
	
 	 conn.query(query_string, function (err, data) {
   		if (err) console.log(err);
    		else {
			if (data=="") {
				ibmdb.open("DRIVER={DB2};DATABASE=SQLDB;HOSTNAME=75.126.155.153;UID=user17475;PWD=KPXHTqJk0UWO;PORT=50000;PROTOCOL=TCPIP", function (err,connection) {
				  if (err) return console.log(err);
					var query_string2= "Insert Into character(name,password,statstr,statdex,statint,statluk,exp,level,nextlvlexp,sp,maxhp,maxmp,money,potions,bombs) values ('" + name + "','" + pwd + "',1,1,1,1,0,1,30,16,50,20,100,0,0)";
				 connection.query(query_string2, function (err, data) {
   					if (err) console.log(err);
    					else console.log(data);

					 connection.close(function () {
    				  
   	 		});
 			 });
			});
				res.end("empty");
			} else if (data[0].PASSWORD == pwd) {
				res.end("validPWD");
			} else {
				res.end("wrongPWD");
			}
		}

   		 conn.close(function () {
    		  
   	 });
 	 });
	});	
	
	
	
	
	
});

app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
res.status(404).send('Sorry cant find that!');
});
