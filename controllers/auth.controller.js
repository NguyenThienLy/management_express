var md5 = require('md5');
var db = require('../db');
var User = require('../models/user.model');

module.exports.login = function(req, res) {
	res.render('auth/login');
};

module.exports.postLogin = async function(req, res, next) {
	try {
		var username = req.body.username;
	var password = req.body.password;
	var user = await User.find({username: username});

	if (!user[0]) {
		res.render('auth/login', {
			errors: [
			'User does not exist!'
			],
			values: req.body
		});
		return;
	}

	var hashedPass = md5(password);

	if (user[0].password !== hashedPass) {
		res.render('auth/login', {
			errors: [
			'Wrong password!'
			],
			values: req.body
		});
		return;
	}
	
	res.cookie('userId', user[0].id, {
		signed: true
	});
	res.redirect('/users');
	} catch (error) {
		next(error);
	}
};