var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);


app.get('/get-checker',function(req,res){
  var queryParams = [];
  for (var p in req.query){
    queryParams.push({'name':p,'value':req.query[p]})
  }
  var inputName = {};
  inputName.dataList = queryParams;
  res.render('get-checker', inputName);
  
});

app.post('/post-checker', function(req,res){
  var queryParams = [];
  for (var p in req.body){
    queryParams.push({'name':p,'value':req.body[p]})
  }
  console.log(queryParams);
  console.log(req.body);
  var inputName = {};
  inputName.dataList = queryParams;
  res.render('post-checker', inputName);
  
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
