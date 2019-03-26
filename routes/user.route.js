var express = require('express');
var multer  = require('multer');

var controller = require('../controllers/user.controller');
var validate = require('../validate/user.validate');

var upload = multer({ dest: './public/uploads/' });
var router = express.Router();

router.get('/', controller.index);

// function middleware1(req, res, next) {
// 	next();
// }

// function middleware2(req, res, next) {
// 	res.send('Hello');
// }

// router.get('/test', middleware1, middleware2);

router.get('/cookie', function(req, res, next) {
	res.cookie('user-id', 12345);
	res.send('Hello');
});

router.get('/search', controller.search);

router.get('/create', controller.createGet);

router.get('/:id', controller.view);

router.post('/create', 
	upload.single('avatar'), 
	validate.postCreate, 
	controller.createPost
);

module.exports = router;