// console.log('May Node be with you');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster-crud.inopdty.mongodb.net/?retryWrites=true&w=majority`;
// Connecting to MongoDB
// MongoClient.connect(connectionString, (err, client) => {
// 	if (err) return console.error(err);
// 	console.log('Connected to Database');
// });
// Connecting to MongoDB using promises

// rendering to the HTML using Embedded Javascript
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());

MongoClient.connect(connectionString, { useUnifiedTopology: true })
	.then((client) => {
		console.log('Connected to Database');
		const db = client.db('star-wars-quotes');
		const quotesCollection = db.collection('quotes');

		// A body parser allows us to deal with the information from the post.
		// Make sure that we place the body-parser before your CRUD handlers!
		app.use(bodyParser.urlencoded({ extended: true }));

		// CRUD Read
		app.get('/', (req, res) => {
			// res.sendFile(__dirname + '/index.html');
			// res.render(view, locals);
			const cursor = db
				.collection('quotes')
				.find()
				.toArray()
				.then((results) => {
					// console.log(results);
					// Send the stored database quotes to the DOM/HTML
					res.render('index.ejs', { quotes: results });
				})
				.catch((error) => console.error(error));

			console.log(cursor);
		});

		// CRUD Create
		app.post('/quotes', (req, res) => {
			quotesCollection
				.insertOne(req.body)
				.then((result) => {
					// console.log(result);
					res.redirect('/');
				})
				.catch((error) => console.error(error));

			// With the body parser installed, we should be able to see the values when requested to the console.
			// console.log(req.body);
		});

		// Update a quote
		app.put('/quotes', (req, res) => {
			// console.log(req.body);
			// Search the data based base on query, example being name
			quotesCollection
				.findOneAndUpdate(
					{ name: 'Yoda' },
					{
						$set: {
							name: req.body.name,
							quote: req.body.quote,
						},
					},
					{
						upsert: true,
					}
				)
				.then((result) => {
					console.log(result);
				})
				.then((res) => {
					if (res.ok) return res.json();
				})
				.then((response) => {
					console.log(response);
				})
				.catch((error) => console.error(error));
		});

		app.listen(3000, function () {
			console.log('listening on 3000');
		});
	})
	.catch((error) => console.error(error));
