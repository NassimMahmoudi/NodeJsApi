const {User,user_validation}= require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports.signUp = async (req, res) => {
    // crypting pass
    let salt = await bcrypt.genSalt(10);
    console.log(salt)
    req.body.pass = await bcrypt.hash(req.body.pass, salt);
    
    let user = new User({
        cin : req.body.cin,
        nom : req.body.nom,
        prenom : req.body.prenom,
        phone : req.body.phone,
        email : req.body.email,
        pass : req.body.pass,
    });
    console.log(user)
    let results = user_validation.validate(req.body);
    if(results.error)
        return res.status(500).json({ message : results.error.details[0].message });
    let email=user.email;
    let verif_exist= await User.findOne({
        email
    });
    if(verif_exist)
        return res.status(404).json({message : "User Exist !!!!!"})
    
    try {
      let user_created = await user.save();
      res.status(201).json(user_created);
    }
    catch(err) {
      res.status(200).send({err})
    }
  };
module.exports.signIn = async (req, res) => {
   
    const {email,pass}=req.body;
    //let email = req.body.email
    //let pass = req.body.pass
    let user_test = await User.findOne({
        email
    });
    if(user_test){
        let bool = await bcrypt.compare(pass, user_test.pass);
        if(!bool)
            return res.status(200).json( { message : 'Incorrect Password !' });
        let token = jwt.sign({id: user_test._id, name: user_test.nom, role: user_test.role}, process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1h'});
        res.header('x-access-token',token).json({ message : 'Login Success !!!' });
            
        
    }else{
        res.status(400).json({ message :'Sign In Failed User Not found !!!!' })
    }
}
module.exports.getAllUsers= async (req, res) =>{
    let users = await User.find();
    res.status(200).send(users)
}