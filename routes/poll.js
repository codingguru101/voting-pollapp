const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

const Vote = require('../models/Vote');
const Pusher = require('pusher');

var pusher = new Pusher({
    appId: '911755',
    key: '7a497c80458d1e0d6ecd',
    secret: '1de79558b0196bffe997',
    cluster: 'us2',
    useTls: true
  });

router.get('/', (req, res) => {
   Vote.find().then(votes => res.json({ sucess: true, 
votes: votes}));
});

router.post('/', (req, res) => {
const newVote = {
    os: req.body.os,
    points: 1
}

new Vote(newVote).save().then(vote => {
    pusher.trigger('os-poll', 'os-vote', {
        points: parseInt(vote.points),
        os: vote.os
      });
      return res.json({sucess: true, message: 'Thank your for voting'});
});



})

module.exports = router;    