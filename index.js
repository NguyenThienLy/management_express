require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
//var csurf = require('csurf');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

var userRoute = require('./routes/user.route');
var productRoute = require('./routes/product.route');
var authRoute = require('./routes/auth.route');
var cartRoute = require('./routes/cart.route');
var transferRoute = require('./routes/transfer.route');

var apiProductRoute = require('./api/routes/product.route')

var authMiddleware = require('./middlewares/auth.middleware');
var sessionMiddleware = require('./middlewares/session.middleware'); // ko sign in van luu lai
var cartNumberMiddleware = require('./middlewares/cartNumber.middleware');

var port = 3000; 

var app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET)); // signed cookies, dotenv
app.use(sessionMiddleware);
//app.use(csurf({ cookie : true })); // bao mat khong cho 

app.use(express.static('public'));

app.get('/', function(req, res) {
	res.render('index', {
		name:'there'
	});
});

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/products', authMiddleware.requireAuth, cartNumberMiddleware, productRoute);
app.use('/auth', authRoute);
app.use('/cart', cartNumberMiddleware, cartRoute);
app.use('/transfer', authMiddleware.requireAuth, transferRoute);

app.use('/api/products', apiProductRoute);

app.listen(port, function() {
	console.log('Server listening on port ' + port);
})
