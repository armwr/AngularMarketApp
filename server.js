var express = require('express');
var app = express();
var mongoose = require('mongoose')
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var morgan = require('morgan'); 
var Shchema = mongoose.Schema;
var mongojs = require('mongojs');
var db = mongojs('mongodb://Boris:dmx139@ds019816.mlab.com:19816/newangularmarket', ['products'])

var port = process.env.PORT || 3000;

var productSchema = mongoose.Schema({
	title: String,
	price: String,
	description: String,
	image: String
});

var Product = mongoose.model('Product', productSchema) 


// mongoose.connect('mongodb://Boris:dmx139@ds019816.mlab.com:19816/newangularmarket');

app.use(express.static(__dirname + '/public'));                 
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

//GET
app.get('/api/products', function(req, res) {

    // use mongoose to get all products in the database
    db.products.find(function(err, products) {

            res.json(products); // return all products in JSON format
        });
});


//POST
app.post('/api/products', function(req, res) {

	console.log(req.body);

	db.products.insert(req.body,function(err, products){
		res.json(products)
	})


});


// DELETE
app.delete('/api/products/:product_id', function(req, res) {

	var id = req.params.product_id;
	console.log(id);

	db.products.remove({_id: mongojs.ObjectId(id)}, function(err, products) {
		res.json(products);
	})

	console.log('Product deleted')

});


//EDIT
app.put('/api/products/:product_id', function(req, res) {

	var id = req.params.product_id;


	db.products.findAndModify({query: {_id:mongojs.ObjectId(id)},
		update:{$set: {title : req.body.title, price: req.body.price, 
			description: req.body.description, image: req.body.image }},
			new: true}, function(err,doc) {
				res.json(doc);
			});
});




app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

app.listen(port);
