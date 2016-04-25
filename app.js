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

app.post('/addNewCharacter',function(req,res) {
	var name = req.body.name;
	var pwd = req.body.pwd;
	res.end('got');
	ibmdb.open("DRIVER={DB2};DATABASE=SQLDB;HOSTNAME=75.126.155.153;UID=user17475;PWD=KPXHTqJk0UWO;PORT=50000;PROTOCOL=TCPIP", function (err,conn) {
	  if (err) return console.log(err);
	var query_string= "Insert Into character(name,password,statstr,statdex,statint,statluk,exp,level,nextlvlexp,sp,maxhp,maxmp,money) values ('" + name + "','" + pwd + "',1,1,1,1,0,1,30,16,50,20,0)";
 	 conn.query(query_string, function (err, data) {
   		if (err) console.log(err);
    		else console.log(data);

   		 conn.close(function () {
    		  console.log('done');
   	 });
 	 });
	});
});

app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
res.status(404).send('Sorry cant find that!');
});
