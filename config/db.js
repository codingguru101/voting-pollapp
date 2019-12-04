const mongoose = require('mongoose');

//Map global promises
mongoose.Promise = global.Promise
//Mongoose Connect

mongoose.connect('mongodb+srv://worlboss1:Johnsonj1@cluster0-rqygw.mongodb.net/test?retryWrites=true&w=majority')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));