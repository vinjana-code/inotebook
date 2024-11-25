const mongoose = require('mongoose');
async function connect() {
  try {
    await mongoose.connect('mongodb://localhost/mydatabase', {         
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(error);
  }
}

module.exports = connect;
