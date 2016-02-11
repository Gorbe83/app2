//Dependencias
var express = require('express');
var stylus = require('stylus');
var nib = require('nib');
var logger = require('morgan');

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

//Stylus Middleware
app2.use(logger('dev'));
app2.use(stylus.middleware(
  {
    src:__dirname + '/public',
    compile: compile
  }
))
app2.use(express.static(__dirname + '/public'));

//Renderizar Index
app2.get('/', function(req, res) {
  res.render('index',
  { title: "Bienvenido"}
  );
})

app2.listen(portNumber);
console.log('Server corriendo en el puerto ' + portNumber);
