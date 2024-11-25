const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors')

connectToMongo();

const app = express()
const port = 5000
app.use(cors())

//Available Routes
// Import your authentication middleware
const authenticate = require('./routes/authenticate');
const note = require('./routes/notes');

app.use(express.json());
// Define your auth route
app.use('/api/auth', authenticate);
app.use('/api/notes', note);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})