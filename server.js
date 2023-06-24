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
// TODO - hide the password
MongoClient.connect(connectionString, { useUnifiedTopology: true })
	.then((client) => {
		console.log('Connected to Database');
		const db = client.db('star-wars-quotes');

		// A body parser allows us to deal with the information from the post.
		// Make sure that we place the body-parser before your CRUD handlers!
		app.use(bodyParser.urlencoded({ extended: true }));

		// CRUD Read
		app.get('/', (req, res) => {
			res.sendFile(__dirname + '/index.html');
		});

		// CRUD Create
		app.post('/quotes', (req, res) => {
			// With the body parser installed, we should be able to see the values when requested to the console.
			console.log(req.body);
		});
		app.listen(3000, function () {
			console.log('listening on 3000');
		});
	})
	.catch((error) => console.error(error));
