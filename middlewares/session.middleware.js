//var db = require('../db');
var shortid = require('shortid');
var Session = require('../models/session.model');

module.exports = async function(req, res, next) {
	if(!req.signedCookies.sessionId) {
		var sessionId = shortid.generate();
		res.cookie('sessionId', sessionId, {
			signed: true
		});

		var cart = []
		var session = {sessionId: sessionId, cart: cart};
		await Session.create(session);
	}

	next();
}