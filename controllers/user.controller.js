//var db = require('../db');
//var shortid = require('shortid');
var User = require('../models/user.model');

module.exports.index = async function(req, res) {
	// res.render('users/index', {
	// 	users: db.get('users').value()
	// });
	var users = await User.find();
	res.render('users/index', {
			users: users
	});
};

module.exports.search = async function(req, res) {
	var q = req.query.q;
	var users = await User.find();
	var matchUsers = users.filter(function(user) {
		return user.name.toLowerCase().indexOf(q.toLowerCase()) > -1;
	})
	res.render('users/index', {
		users: matchUsers,
		search: q
	});
};

module.exports.createGet = function(req, res) {
	res.render('users/create');
};

module.exports.view = async function(req, res) {
	var id = req.params.id;
	var user = await User.findById(id);
	res.render('users/view', {
		user: user
	});
};

module.exports.createPost = function(req, res) {
	//req.body.id = shortid.generate();
	req.body.avatar = req.file.path.split('\\').slice(1).join('/');

	 var newUser = new User(
	 	{ 
	 		name: req.body.name,
			username: "",
			password: "",
			phone: req.body.phone,
			avatar: req.body.avatar 
		}
	 );
 
    // save model to database
    newUser.save(function (err, user) {
    });

	//db.get('users').push(req.body).write();
	res.redirect('/users');
};