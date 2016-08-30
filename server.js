var express = require('express');
var app = express();
var mongoose = require('mongoose')
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var morgan = require('morgan'); 


mongoose.connect('mongodb://Boris:dmx139@ds019816.mlab.com:19816/newangularmarket');

app.use(express.static(__dirname + '/public'));                 
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());


var Product = mongoose.model('Product', {
	title: String,
	price: Number,
	description: String,
	image: String
	// contact:[{
	// 	name: String,
	// 	email: String,
	// 	info: String
	// }],
	// categories: [
	// 	String
	// ],
});

app.get('/api/products', function(req, res) {

    // use mongoose to get all products in the database
    Product.find(function(err, products) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
            	res.send(err)

            res.json(products); // return all products in JSON format
        });
});

// create todo and send back all products after creation
app.post('/api/products', function(req, res) {

    // create a product, information comes from AJAX request from Angular
    Product.create({
    	title : req.body.title,
    	price: req.body.price,
    	description: req.body.description,
    	image: req.body.image,
    	// contact: [{
    	// 	name: req.body.name,
    	// 	email: req.body.email,
    	// 	info: req.body.info
    	// }],
    	// categories: [
    	// 	req.body.String
    	// ], 
    	done : false
    }, function(err, product) {
    	if (err)
    		res.send(err);

    // get and return all the products after you create another
    Product.find(function(err, products) {
    	if (err)
    		res.send(err)
    	res.json(products);
    });
});

});

// delete
app.delete('/api/products/:product_id', function(req, res) {
	Product.remove({
		_id : req.params.product_id
	}, function(err, product) {
		if (err)
			res.send(err);

	// get and return all the products after you create another
	Product.find(function(err, products) {
		if (err)
			res.send(err)
		res.json(products);
	});
});

});

app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

app.listen(3000);

console.log("Server running on port 3000")