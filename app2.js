//Dependencias
var express = require('express');
var stylus = require('stylus');
var nib = require('nib');
var logger = require('morgan');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/user_app');
var session = require('express-session');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var multer = require('multer');

//Establecer puerto
var portNumber = 3000;

//Inicializar Express
var app2 = express();
console.log('Express ha sido iniciado');

function compile(str, path) {
  return stylus(str)
    .set('filename',path)
    .use(nib());
}

//Establecer carpeta de Views
app2.set('views',__dirname+'/views');

//Inicializar Jade
app2.set('view engine', 'jade');
console.log('Jade ha sido inicializado');

//Middleware
app2.use(logger('dev'));
app2.use(bodyParser.json());
app2.use(bodyParser.urlencoded({extended: true}));
//app2.use(multer());
app2.use(methodOverride());
app2.use(cookieParser('mykey'));
app2.use(session({ resave: true,
                   saveUninitialized: true,
                   secret: 'secret' }));
app2.use(stylus.middleware(
  {
    src:__dirname + '/public',
    compile: compile
  }
))
app2.use(express.static(__dirname + '/public'));

//Renderizar Index
app2.get('/', routes.index);
app2.get('/users', user.list);
app2.get('/userlist', routes.userlist(db));
app2.post('/adduser', routes.adduser(db));

app2.listen(portNumber);
console.log('Server corriendo en el puerto ' + portNumber);
