// var express = require('express');
// var bodyParser = require("body-parser");
// const cors = require('cors');
// var mysql = require('mysql2');
// var app = express();

// app.use(cors());
// app.use(express.static('public'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }))
// // step 1: rong workbench mở cửa sổ sql và chạy lệnh
// //ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';
// //step 2:
// var con = mysql.createConnection({
//     host: "localhost",
//     port: "3306",
//     user: "root",
//     password: "long1012**",
//     insecureAuth : true,
//     database: "csdl_Measurements"
//     });
//     //step 1
//     con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!!!")
//     var sql = "SELECT * FROM tbl_Measurements";
//     con.query(sql, function(err, results) {
//     if (err) throw err;
//     console.log(results);
//     })
//     });
    
// // json sample
// // const books = JSON.stringify([
// // { title: "The Alchemist", author: "Paulo Coelho", year: 1988 },
// // { title: "The Prophet", author: "Kahlil Gibran", year: 1923 }
// // ]);
// // const farms = JSON.stringify([
// //     { name: "Farm A", description: "nông trại ", image: "1.jpg", temperature: 29.4, humid: 50.2},
// //     { name: "Farm B", description: "nông trại ", image: "2.jpg", temperature: 25.4, humid: 53.1},
// //     { name: "Farm C", description: "nông trại ", image: "3.jpg", temperature: 20.1, humid: 43.4},
// //     ]);
//     //RESTFull API

//     app.get("/danhsachthietbi",function(request,response){
//         response.send(books);
//     })
//     app.get('/getAllBooks', function (req, res) {
//     res.send(books);
//     })
//     // app.get('/getAllFarms', function (req, res) {
//     // res.send(farms);
//     // })
//     //RESTFull API
// app.get('/getAllFarms', function (req, res) {
//     var sql = "SELECT * FROM tbl_Measurements";
//     con.query(sql, function(err, results) {
//     if (err) throw err;
//     res.send(results);
//     });
//     })
//     //server
//     var server = app.listen(3333, function () {
//     var host = server.address().address
//     var port = server.address().port
//     console.log("Example app listening at http://%s:%s", host, port)
//     })
    


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
