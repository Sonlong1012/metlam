// Import required modules
var express = require('express');
var bodyParser = require("body-parser");
const cors = require('cors');
var mysql = require('mysql2');

// Create Express app
var app = express();

// Middleware setup
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection setup
var con = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "long1012**",
    insecureAuth : true,
    database: "csdl_SoilData"
});

// Connect to MySQL
// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected to MySQL database!");
// });
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!!!");
  var sql = "SELECT * FROM tbl_SoilData";
  con.query(sql, function (err, results) {
    if (err) throw err;
    console.log(results);
  });
});
//RESTFull API

//post == add new device


//get 
app.get("/getall", function (req, res) {
  var sql = "SELECT * FROM tbl_SoilData";
  con.query(sql, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
});

//put
app.put("/put/:id", function (req, res) {
  var id = req.params.id;
  var updatedInfo = req.body;
 

  var sql = "UPDATE tbl_SoilData SET ? WHERE id = ?";
  con.query(sql, [updatedInfo, id], function (err, result) {
    if (err) throw err;
    console.log("Number of records updated: " + result.affectedRows);
    res.send("Record updated successfully");
  });
});

app.post("/post", function (req, res) {
  var newInfo = req.body;

  var sql = "INSERT INTO tbl_SoilData SET ?";
  con.query(sql, [newInfo], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
    res.send("Record inserted successfully");
  });
});

//server
var server = app.listen(3333, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});
