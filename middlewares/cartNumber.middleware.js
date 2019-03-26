var db = require('../db');

module.exports = function(req, res, next) {
	var sessionId = req.signedCookies.sessionId;

	var cartNumber = db.get('sessions')
	.find({id: sessionId})
	.get('cart')
	.size()
	.value();

	res.locals.cartNumber = cartNumber;

	next();
}