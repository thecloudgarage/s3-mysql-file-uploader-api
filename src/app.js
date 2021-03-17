const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const axios = require('axios');
var bodyParser = require('body-parser');
const routes = require('./routes');
const db = require("./database/models/");

dotenv.config();

const app = express();
const port = process.env.PORT || 80;

// Create all db tables if they don't exist. 
db.sequelize.sync()


app.use(cors());
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/v1', routes);

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

