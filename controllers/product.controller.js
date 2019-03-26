//var db = require('../db');
var Product = require('../models/product.model');

module.exports.index = async function(req, res) {
	var page = parseInt(req.query.page) || 1; // n
	var perPage = 8; // x
	var drop = (page-1)*perPage;
	
	var start = (page-1) * perPage;
	var end = page * perPage;
	var sumProducts = await Product.count();

	var lastPage = parseInt(sumProducts/perPage);

	if(sumProducts % perPage !==0) {
		lastPage = lastPage + 1;
	}

	if (page > lastPage - 5) {
		i = lastPage - 2;
	}
	else if (page < 1 + 5) {
		i = 1 + 2;
	}
	else if(page!==1 && page!==lastPage) {
		i = page;
	}

	// res.render('products/index', {
	// 	// products: db.get('products').value().slice(start, end)
	// 	products: db.get('products').drop(drop).take(perPage).value(),
	// 	curPage: page,
	//	lastPage: lastPage,
	// 	number: i
	// });
	var products = await Product.find();
	products = products.slice(start, end);
	res.render('products/index', {
			products: products,
			curPage: page,
			lastPage: lastPage,
		 	number: i
	});
};

module.exports.search = async function(req, res) {
	var q = req.query.q;
	var page = parseInt(req.query.page) || 1; // n
	var perPage = 8; // x
	
	var start = (page-1) * perPage;
	var end = page * perPage;
	var sumProducts = await Product.count();

	var lastPage = parseInt(sumProducts/perPage);

	if(sumProducts % perPage !==0) {
		lastPage = lastPage + 1;
	}

	if (page > lastPage - 5) {
		i = lastPage - 2;
	}
	else if (page < 1 + 5) {
		i = 1 + 2;
	}
	else if(page!==1 && page!==lastPage) {
		i = page;
	}

	var products = await Product.find();
	var matchProducts = products.filter(function(product) {
		return product.name.toLowerCase().indexOf(q.toLowerCase()) > -1;
	})
	res.render('products/index', {
		products: matchProducts,
		curPage: page,
		lastPage: lastPage,
		search: q
	});
};