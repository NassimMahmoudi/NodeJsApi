const mongoose = require('mongoose');
const Joi = require('joi');
const user_schema = new mongoose.Schema({
    cin : String,
    nom : String,
    prenom : String,
    pass: String,
    email : String,
    phone : String,
    role : {
        type: String,
        default: "User"
    },
});

let user_validation = Joi.object({
    cin: Joi.string().length(8).required(),
    nom: Joi.string().required(),
    prenom: Joi.string().required(),
    pass: Joi.string().required(),
    email: Joi.string().required(),
    phone : Joi.string().length(8).required(),
});

const User = mongoose.model('user',user_schema);

module.exports.User=User;
module.exports.user_validation=user_validation;
