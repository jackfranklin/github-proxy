const mongoose = require('mongoose');


exports.connect = () => {
  mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to Mongo');
  });
};
