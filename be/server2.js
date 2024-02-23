var express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");
var mysql2 = require("mysql2");
var app = express();

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// step 1: rong workbench mở cửa sổ sql và chạy lệnh
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password'; //step 2:
var con = mysql2.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "long1012**",
  insecureAuth: true,
  database: "djangoProject5",
});
//step 1
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!!!");
  var sql = "SELECT * FROM demo5_member";
  con.query(sql, function (err, results) {
    if (err) throw err;
    console.log(results);
  });
});

//RESTFull API

//post == add new device
app.post("/post", function (req, res) {
    var newInfo = req.body;
  
    var sql = "INSERT INTO demo5_member SET ?";
    con.query(sql, [newInfo], function (err, result) {
      if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);
      res.send("Record inserted successfully");
    });
});

//get 
app.get("/getall", function (req, res) {
  var sql = "SELECT * FROM demo5_member";
  con.query(sql, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
});

//put
app.put("/put/:id", function (req, res) {
    var id = req.params.id;
    var updatedInfo = req.body;
  
    var sql = "UPDATE demo5_member SET ? WHERE id = ?";
    con.query(sql, [updatedInfo, id], function (err, result) {
      if (err) throw err;
      console.log("Number of records updated: " + result.affectedRows);
      res.send("Record updated successfully");
    });
});

// delete
app.delete("/delete/:id", function (req, res) {
    var id = req.params.id;
  
    var sql = "DELETE FROM demo5_member WHERE id = ?";
    con.query(sql, [id], function (err, result) {
      if (err) throw err;
      console.log("Number of records deleted: " + result.affectedRows);
      res.send("Record deleted successfully");
    });
});



//server
var server = app.listen(4444, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});
