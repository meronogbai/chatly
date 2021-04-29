require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT)
  })
  .catch(err => {
    console.log(err);
  })

app.use(express.static('public'));
app.use(express.json());

const Message = mongoose.model('Mesage', {
  name: String,
  message: String
});
