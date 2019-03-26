var db = require('../db');
var Session = require('../models/session.model');

module.exports.index = function(req, res, next) {
	var sessionId = req.signedCookies.sessionId;
	var i = 0;
	var products = [];
	
	if (!sessionId) {
		res.redirect('/products');
		return;
	}

	var keys = Object.keys(db.get('sessions')
	.find({id: sessionId})
	.get('cart')
	.value());

	var values = Object.values(db.get('sessions')
		.find({id: sessionId})
		.get('cart')
		.value());

	keys.forEach(function(item, index) {
		var product = db.get('products').find({id: item}).value();
		product.quantity = values[i];
		products.push(product);
		i= i+1;
	});

	res.render('cart/index', {
		products: products,
	});
	
};

module.exports.addToCart = async function(req, res, next) {
	try {
		var productId = req.params.productId;
		var sessionId = req.signedCookies.sessionId;

		if (!sessionId) {
			res.redirect('/products');
			return;
	}

	var session = await Session.find({sessionId: sessionId});

	// var count = db.get('sessions')
	// .find({id: sessionId})
	// .get('cart.' + productId, 0)
	// .value();

	// db.get('sessions')
	// .find({ id: sessionId})
	// .set('cart.' + productId, count + 1)
	// .write();
	} catch(error) {
		next(error);
	}
	
}
// 	var contact = new Contact({
//   phone: request.phone,
//   status: request.status
// });

// // Convert the Model instance to a simple object using Model's 'toObject' function
// // to prevent weirdness like infinite looping...
// var upsertData = contact.toObject();

// // Delete the _id property, otherwise Mongo will return a "Mod on _id not allowed" error
// delete upsertData._id;

// // Do the upsert, which works like this: If no Contact document exists with 
// // _id = contact.id, then create a new doc using upsertData.
// // Otherwise, update the existing doc with upsertData
// Contact.update({_id: contact.id}, upsertData, {upsert: true}, function(err{...});

// 	res.redirect('/products');
// };