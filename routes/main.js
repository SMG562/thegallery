
var express = require('express');
var router = express.Router();

var mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: '' ,
  database: "celeBrand"

});



	



// app.get('/', function(req, res,next){
//     res.render('home.hbs');
// });

// app.get('/celebrity', function(req,res,next){
//     res.render('celebrity.hbs');
// });

// app.get('/brand', function(req,res,next){
//     res.render('brand.hbs');
// });

// app.get('/celebrity/:id', function(req,res){
//     // res.send('This is celebrity.'+ req.params.id);
//        res.render('oneCelebrity.hbs');
// });


// app.get('/brand/:id', function(req,res){
//     // res.send('This is brand.'+ req.params.id);
//     res.render('onebrand.hbs');
// });



router.route('/')
.get(function(req, res){
    res.render('home.hbs');
});


router.route('/celebrity')
.get(function(req, res){
	
	var selectSql = 'SELECT * FROM celebrityList';
	con.query(selectSql, function(err,rows){
	if(err) throw err;
  	console.log('celebrity received from Db:\n');

  	var celebrityGroup = rows;
  	console.log(celebrityGroup);
  	res.render('celebrity.hbs',{celebrityGroup:celebrityGroup});
	});
});



router.route('/brand')
.get(function(req, res){

	// select sql
	var selectSql = 'SELECT * FROM brandList';
	con.query(selectSql,function(err,rows){
		if(err) throw err;
		console.log('brand received from Db:\n');

	    var brandGroup = rows;
		console.log(brandGroup);
		res.render('brand.hbs',{brandGroup:brandGroup});
	});


});







// router.route('/brand')
// .get(function(req, res){
// 	res.render('brand.hbs');
// })


router.route('/celebrity/:id')
.get(function(req, res){
    res.render('oneCelebrity.hbs');
})


router.route('/brand/:id')
.get(function(req, res){
    res.render('onebrand.hbs');	
})


module.exports = router;




