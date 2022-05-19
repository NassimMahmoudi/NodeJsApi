const mongoose = require('mongoose');
const dbConfig = require("./config");
mongoose.connect(dbConfig.url+dbConfig.database)
.then(()=> console.log('Mongo is UP.'))
.catch(err => console.log('Mongo is Down , raison : ',err.message));