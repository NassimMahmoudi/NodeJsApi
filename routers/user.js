const router = require('express').Router();
const userController= require('../controllers/userController')
const auth = require('../middlewares/auth')
router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);
router.get('/',auth, userController.getAllUsers);



module.exports=router;