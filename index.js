'use strict';

const characters = require('./characters');
const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const titleize = require('titleize');

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
    res.send("Please don't enter numbers, but rather please enter a character from Adventure Time, like Lumpy Space Princess.");
  return;
  }

  let name = text.replace(/\s/g,'').toLowerCase();
  if (!(name in characters)) {
    res.send(`Sorry about that, "${name}" is not an Adventure Time character I recognize ⭐️ `);
    return;
  }

  let time = moment().format('MMMM Do YYYY, h:mm:ss a');
  console.log(time);
  let data = {
    response_type: 'in_channel', //public to channel...ephemeral is private message
    text: titleize(name) + " found ✨",
    attachments:[ {
      color: "#8A2BE2",
      title: titleize(name),
      title_link: "http://adventuretime.wikia.com/wiki/" + `${name}`,
      image_url: characters[name],
      mrkdwn_in: [
        "text",
        "footer",
      ],
      thumb: "Adventures!",
      thumb_url: "http://vignette2.wikia.nocookie.net/adventuretimewithfinnandjake/images/a/a7/Character_icon.PNG/revision/latest?cb=20150708012908",
      footer: "Adventure Time",
      footer_icon: "http://vignette2.wikia.nocookie.net/adventuretimewithfinnandjake/images/a/a7/Character_icon.PNG/revision/latest?cb=20150708012908",
      ts: moment().unix(),
    } ]};

    res.json(data);
  }
)
