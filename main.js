var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon')
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');

//- Rutas

var routes = require('./http/routes');
var routeImagen = require('./http/routes/routeImagen');
var routeFaqs = require('./http/routes/routeFaqs');
var routeCarreras = require('./http/routes/routeCarreras');
var routeCiudades = require('./http/routes/routeCiudades');
var routeUsuario = require('./http/routes/routeUsuario');
var routeConekta = require('./http/routes/routeConekta');
var routeOrden = require('./http/routes/routeOrden');
var routePatrocinadores = require('./http/routes/routePatrocinadores');

// - Conexion a la base de datos

var con = require('./http/connection');

// require('./conf/auth')(app);

// - Middlewares

var lessMiddleware = require('less-middleware')

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "jade");

app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico')))
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(flash());

app.use(session({secret: '01f4845/564564/6@@fas588--[[}++', resave: true, saveUninitialized: true}));

app.use(passport.initialize());
app.use(passport.session());

morgan('combined', {skip: function (req, res) { return res.statusCode < 400 }});

app.use('/', routes);
app.use('/', routeImagen);
app.use('/', routeFaqs);
app.use('/', routeCarreras);
app.use('/', routeCiudades);
app.use('/', routeUsuario);
app.use('/', routeConekta);
app.use('/', routePatrocinadores);
app.use('/', routeOrden);

app.use(lessMiddleware(__dirname + '/assets'));

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'http')));

module.exports = app;
