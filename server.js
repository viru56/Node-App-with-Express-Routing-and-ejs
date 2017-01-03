var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var app = express();

//use ejs and layouts
app.set('view engine', 'ejs');
app.use(expressLayouts);

//use bodyParser
app.use(bodyParser.urlencoded());
//routes our app
var router = require('./app/routes');
app.use('/',router);

//set static files
app.use(express.static(__dirname + '/public'));
app.listen(8080,function(){
    console.log('listing on 8080');
});

