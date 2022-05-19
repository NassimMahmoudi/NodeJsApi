require('./config/connect');
const express = require('express');
const user_router = require('./routers/user');

// get configaration from .env
require("dotenv").config();

let app = express();
app.use(express.json());


app.use('/api/user',user_router);


app.listen(process.env.PORT,() => {
    console.log(`Running at localhost:${process.env.PORT}`);
  });