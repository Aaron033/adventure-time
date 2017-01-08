'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json()); //support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true})); //support encoded bodies.
//must say {extended: true} because compressed bodies will be inflated and the default value of the extended option has been deprecated

const server = app.listen(3000, () => {
  console.log('Express server is listening on part %d in %s mode', server.address().port, app.settings.env);
});


//HTTP POST route method
app.post('/', (req, res) => {
  let text = req.body.text;

  if(! /[A-z]/g.test(text)) { //if an Adventure Time Character's name contains integers
    res.send('Please enter a character from Adventure Time, like Lumpy Space Princess.');
  return;
  }

  let data = {
    response_type: 'in_channel', //public to channel
    text: 'Character: Found',
    attachments:[ {
      image_url: 'http://vignette2.wikia.nocookie.net/adventuretimewithfinnandjake/images/c/cb/13bubblegum.png/revision/latest?cb=20110504011232'
    } ]};

    res.json(data);
  }
)
