const express = require('express');
const router = express.Router();
const userModules = require('../../modules/user/userController');
const { authorization } = require('../../middleware/authentication.middleware')

router.get('/',userModules.getAllUser);

router.post('/register',userModules.registerUser);
router.get('/detail', authorization,userModules.getDetail);


module.exports = router