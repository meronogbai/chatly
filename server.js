require('dotenv').config();
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    server.listen(PORT);
  });

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
  const message = new Message(req.body);
  message.save()
    .then(() => {
      io.emit('message', message);
      res.sendStatus(200);
    })
    .catch(() => {
      res.sendStatus(500);
    });
});
