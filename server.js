require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT);
  })
  .catch(err => {
    console.log(err);
  })

app.use(express.static('public'));
app.use(express.json());

const Message = mongoose.model('Message', {
  name: String,
  message: String
});

app.get('/messages', (req, res) => {
  Message.find()
    .then(messages => {
      res.send(messages);
    })
    .catch(err => {
      console.log(err);
    });
});

app.post('/messages', (req, res) => {
  console.log(req.body);
  const message = new Message(req.body);
  message.save()
    .then(() => {
      res.sendStatus(200);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});
