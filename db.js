const mongoose = require('mongoose');


exports.connect = () => {
  mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Connected to Mongo');
  });
};
