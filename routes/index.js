const express = require('express');
const router = express.Router();

const userRoutes = require('./api/users');
router.use('/user',userRoutes);

router.use('/admin',(req,res,next)=>{
    res.json({error:'oops, something went wrong'})
    next()
})

module.exports = router;