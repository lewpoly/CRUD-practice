const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();

const connectionString =
  'mongodb+srv://lewpoly:Da!sy103Chain@crudcluster.c82lufh.mongodb.net/?retryWrites=true&w=majority';

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then((client) => {
    console.log('Connected to Database');
    const db = client.db('happy-gilmore-quotes');
    const quotesCollection = db.collection('quotes');

    // Middlewares
    app.set('view engine', 'ejs');
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(express.static('public'));

    // Routes

    // Create
    app.post('/quotes', (req, res) => {
      quotesCollection
        .insertOne(req.body)
        // eslint-disable-next-line no-unused-vars
        .then((_result) => {
          res.redirect('/');
        })
        .catch((error) => console.error(error));
    });

    // Read
    app.get('/', (_req, res) => {
      db.collection('quotes')
        .find()
        .toArray()
        .then((quotes) => {
          res.render('index.ejs', { quotes: quotes });
        })
        .catch(/* ... */);
    });

    // Update
    app.put('/quotes', (req, res) => {
      quotesCollection
        .findOneAndUpdate(
          { name: 'Happy' },
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
        .then((result) => res.json('Success'))
        .catch((error) => console.log(error));
    });

    // Delete
    app.delete('/quotes', (req, res) => {
      quotesCollection
        .deleteOne({ name: req.body.name })
        .then((result) => {
          if (result.deleteCount === 0) {
            return res.json('No quote to delete');
          }
          res.json("Deleted Shooter McGavin's quote");
        })
        .catch((error) => console.error(error));
    });

    // Listen
    const isProduction = connectionString === 'production';
    const port = isProduction ? 7500 : 3000;
    app.listen(port, function () {
      console.log(`listening on ${port}`);
    });
  })

  .catch(console.error);
