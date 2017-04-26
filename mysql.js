

//add sql v2
var addSql1 = 'INSERT INTO brandList SET ?';
var addSql_Pram1 = {brandName:'卡地亚'};

con.query(addSql1, addSql_Pram1, function(err,res){

  if(err) throw err;
  console.log('Last insert ID:', res.insertId);

})



add sql v1
var addSql = 'INSERT INTO celebrityList(celebrityName) VALUES(?)';
var addSql_Pram = [ 'liuhan1'];

con.query(addSql,addSql_Pram, function(err,rows){

  if(err) throw err;
  console.log('Data inserted to Db:\n');
  console.log(rows);

})


// select sql
var selectSql = 'SELECT * FROM brandList';


con.query(selectSql,function(err,rows){
  if(err) throw err;

  console.log('Data received from Db:\n');
  console.log(rows);
});



//关闭connection
connection.end(function(err){
    if(err){        
        return;
    }
      console.log('[connection end] succeed!');
});



//另外两种数据库链接方法
//数据库 node-mysql
var db = require('node-mysql');
var DB = db.DB;
var BaseRow = db.Row;
var BaseTable = db.Table;

var box = new DB({
    host     : 'localhost',
    user     : 'root',
    password :  ' ' ,
    database : 'cele_brand'
});

var basicTest = function(cb) {
    box.connect(function(conn, cb) {
        cps.seq([
            function(_, cb) {
                conn.query('select * from users limit 1', cb);
            },

            function(res, cb) {
                console.log(res);
                cb();
            }
        ], cb);
    }, cb);
};

//数据库 mysqljs/mysql

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '6126756',
  database : 'celeBrand'
});


connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error; // this is extremely good!
  console.log('The solution is: ', results[0].solution);
});

connection.end();



