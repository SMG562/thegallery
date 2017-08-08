
app.get('/', function(req, res,next){
    res.render('home.hbs');
});

app.get('/celebrity', function(req,res,next){
    res.render('celebrity.hbs');
});

app.get('/brand', function(req,res,next){
    res.render('brand.hbs');
});

app.get('/celebrity/:id', function(req,res){
    // res.send('This is celebrity.'+ req.params.id);
       res.render('oneCelebrity.hbs');
});


app.get('/brand/:id', function(req,res){
    // res.send('This is brand.'+ req.params.id);
    res.render('onebrand.hbs');
});

$(document).ready(function(){
$('input.typeahead').typeahead({
name: 'search_people',
remote: 'http://localhost:3000/search?key=%QUERY',
limit: 10
});
});
