const express = require('express');
const mongoose = require('mongoose');
const mongojs = require('mongojs');
const bodyParser = require('body-parser');
const _ = require('lodash');
const {ObjectID} = require('mongodb');

var {Contact} = require('./models/contact');

mongoose.connect('mongodb://localhost:27017/ContactList', () => {
  console.log('Connected to database');
});

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.post('/contactlist', (req, res) => {
  var contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    number: req.body.number
  });

  contact.save().then((contact) => {
    res.status(201).send(contact);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/contactlist', (req, res) => {
  Contact.find().then((contacts) => {
     return res.json(contacts)
  });
});

app.delete('/contactlist/:id', (req, res) => {
  var id = req.params.id;
  Contact.findOneAndRemove({
    _id: id
  }).then((contact) => {
    res.send(contact);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/contactlist/:id', (req, res) => {
  var id = req.params.id;
  
  Contact.findOne({
    _id: id
  }).then((contact) => {
    res.json(contact)
  }, (e) => {
    res.status(400).send(e);
  });
});

app.put('/contactlist/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['name', 'email', 'number']);

  Contact.findOneAndUpdate({_id: id}, {$set: body}, {new: true})
    .then((res) => {
      res.send(res);
    }, (e) => {
      res.status(400).send(e);
    });
  });

app.listen(port, () => {
  console.log(`Server up on port ${port}`);
});
