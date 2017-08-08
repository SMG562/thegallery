
var express = require('express');
var router = express.Router();

var mysql = require("mysql");
var con = mysql.createConnection({
  host: "45.32.103.71",
  user: "liuhan213",
  password: "Superhard213!",
  database: "thegallery",
  multipleStatements: true

});





router.route('/')
.get(function(req, res){
	var selectSql = 'SELECT a.cele,c.celebrityName,b.brandName FROM cele_brand_list a LEFT JOIN brandList b ON a.brand = b.id LEFT JOIN celebrityList c on a.cele=c.id ORDER BY a.id DESC';
	con.query(selectSql,function(err,rows){
		if(err) throw err;
		console.log('brandcelebrity received from Db:\n');
	    var celeBrandGroup = rows;
		console.log(celeBrandGroup);
		res.render('home.hbs',{celeBrandGroup:celeBrandGroup});
	});

});


router.route('/celebrity')
.get(function(req, res){

	var selectSql = 'SELECT * FROM celebrityList ORDER BY id DESC';
	con.query(selectSql, function(err,rows){
	if(err) throw err;
  	console.log('celebrity received from Db:\n');

  	var celebrityGroup = rows;
  	// console.log(celebrityGroup);
  	res.render('celebrity.hbs',{celebrityGroup:celebrityGroup});
	});
});



router.route('/brand')
.get(function(req, res){

	// select sql
	var selectSql = 'SELECT * FROM brandList ORDER BY id DESC';
	con.query(selectSql,function(err,rows){
		if(err) throw err;
		console.log('brand received from Db:\n');

	    var brandGroup = rows;
		// console.log(brandGroup);
		res.render('brand.hbs',{brandGroup:brandGroup});
	});

});



// a single celebritypage
router.route('/celebrity/:id')
.get(function(req, res){
	//get the celebrity id
	var celeid = req.params.id;	
	console.log('1. celebrityONE page: celebrityid backend:'+celeid);
	//exhibit this guy's brandlist
	var selectid = 'SELECT * FROM cele_brand_list a LEFT JOIN celebrityList c ON a.cele = c.id LEFT JOIN brandList b ON a.brand = b.id WHERE a.cele ='+ celeid ;
	con.query(selectid, function(err,rows){
		if(err) throw err;
	  	var celeSBrand = rows;
	  	console.log('2. how many brands?');
	  	console.log(celeSBrand.length);

	  	if(celeSBrand.length==0){
	  		var selectname = 'SELECT * FROM celebrityList WHERE id = '+celeid;
	  		con.query(selectname, function(err,rows){
				if(err) throw err;
			  	console.log('3. so empty essey received from Db:\n');
			  	var celeSBrand = rows;
			  	console.log(celeSBrand);
			  	res.render('celebrity1.hbs',{celeSBrand:celeSBrand,theCelebrityId:celeid});
	  		})
	  	}
	  	else {
	  		console.log('3. esseys are here:\n');
		  	console.log(celeSBrand);
		  	// console.log(typeof(celeSBrand));
		  	res.render('celebrity1.hbs',{celeSBrand:celeSBrand,theCelebrityId:celeid});


  		};
	});
});


 //  	var selectCeleName = 'SELECT * FROM celebrityList a WHERE a.id = '+newid;
 //  	con.query(selectid, function(err,rows){
	// if(err) throw err;
 //  	console.log('celebrityName received from Db:\n');
 //  	var celeSName = rows;

	// });

router.route('/brand/:id')
.get(function(req, res){

	var newid = req.params.id;
	console.log('brandid received:'+ newid);

	var selectid = 'SELECT * FROM cele_brand_list a LEFT JOIN celebrityList b ON a.cele = b.id WHERE a.brand = '+ newid;

	con.query(selectid, function(err,rows){
		if(err) throw err;
	  	console.log('id_celebrity received from Db:\n');
	  	var brandSCele = rows;
	  	console.log(brandSCele);
	 	res.render('brand1.hbs',{brandSCele:brandSCele,theCelebrityId:newid});

	});
});



router.route('/search')
.post(function(req, res){
	var newid = req.body.search_people;
	console.log('Searching:'+newid)

	// var searchPeople = 'SELECT * FROM celebrityList WHERE celebrityName= '+newid+"UNION SELECT * FROM brandList WHERE brandName= "+newid;
		// var searchPeople = 'SELECT * FROM celebrityList WHERE id= '+newid +'UNION SELECT * FROM brandList WHERE id='+newid +'ORDER BY id ASC';
	var searchPeople = 'SELECT * FROM celebrityList WHERE celebrityName like "%'+ newid+'%"';
	// var selectid = 'SELECT * FROM cele_brand_list a LEFT JOIN brandList b ON a.brand = b.id WHERE a.cele = '+ newid;
	con.query(searchPeople,function(err,rows){
	if(err) throw err;
  	console.log('peoplelist received from Db:\n');
  	var celeList = rows;
  	console.log(celeList);
 	res.render('celebrity2.hbs',{celeList:celeList});


	});
});

router.route('/addcelebrity1')
.post(function(req, res){
	var newCelebrityName = req.body.newCelebrityName;

	//将newCelebrity 插入数据
	var selectSql = "INSERT INTO celebrityList SET ? ";
	var value ={celebrityName: newCelebrityName};

	con.query(selectSql, value, function(err,rows){
		// if(err) throw err;
		if(err)
		{
			console.log('repeated CelebrityName');
			res.send('添加过了，唔～!');
			return;
		}
	  	console.log('celebrity INSERTED INTO Db:\n');
	  	var celeList = rows;
	  	console.log(celeList);
		console.log('new newCelebrityName');
		res.send('添加上了，耶!');
	});
});


router.route('/addEssey')
.post(function(req, res){
	var esseyInput = req.body.esseyInput;
	var urlInput = req.body.urlInput;
	var celebrityId = req.body.celebrityId;

	console.log('5. got the peopleid to add essey:');
	console.log(celebrityId);

	var selectSql = "INSERT INTO brandList SET ? ";
	var value ={brandName: esseyInput, essey_url: urlInput};
	// No.1 insert, brand
	con.query(selectSql, value, function(err,results){
		if(err) {

			res.send('添加过了呀');
			// throw err;
			return;

		};

	  	console.log('6. ESSEY INSERTED INTO Db\n');
	  	// var brandid = results.rows[0].id;
	  	// console.log('brandid:');
	  	// console.log(brandid);

		var selectSql2 = "SELECT * FROM brandList WHERE ?";
		var value2 = {essey_url: urlInput};
		// No.2 search, brandid
		con.query(selectSql2, value2, function(err,results){

        	var brandId = results[0].id;
		  	console.log('7. search the new essey id:\n');
		  	console.log(brandId);

		  	var selectSql3 = "INSERT INTO cele_brand_list SET ? ";
		  	var value3 = {cele: celebrityId, brand: brandId};
		  	//No.3 insert,celeBrand
		  	con.query(selectSql3, value3, function(err,results){
			  	console.log('8. cele_brand added to Db:\n');
			  	console.log('9. 添加上了，耶！');
				res.send('添加上了，耶！');
		  	});

		});

		// console.log('9. 添加上了，耶！');
		// res.send('添加上了，耶！');
	});
});

	// var selectSql1 = "INSERT INTO cele_brand_List SET ? ";
	// var value ={cele: celebrityId, brand: urlInput};


	// con.query(selectSql1, value, function(err,rows){
	// 	if(err) {

	// 		res.send('添加过了，唔～');
	// 		// throw err;
	// 		return;

	// 	};

	//   	console.log('brand INSERTED INTO Db:\n');
	//   	var brandList = rows;
	//   	console.log(brandList);
	// 	console.log('accepted newBrandName');
	// 	res.send('添加上了1，耶！');

	// });

// INSERT INTO brandList (brandName) SELECT * FROM (SELECT ? ) AS tmp WHERE NOT EXISTS ( SELECT brandName FROM brandList WHERE ip_addr= ? );

// 	// var selectSql = "INSERT INTO brandList SET brandName = ?";
// 	// var selectSql = "INSERT INTO brandList SELECT * FROM DUAL WHERE NOT EXISTS (SELECT id FROM brandList WHERE brandName = ?)";
// 	con.query(selectSql,[newBrandName],function(err,rows){
// 		if(err) throw err;

// 	  	console.log('brand INSERTED INTO Db:\n');
// 	  	var brandList = rows;
// 	  	console.log(brandList);
// 		console.log('accepted newBrandName');
// 		res.send('i have received newBrand!');
// 	});




module.exports = router;
