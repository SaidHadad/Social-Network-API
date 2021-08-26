const router = require('express').Router();
const userRoutes = require('./userRoutes');
const toughtRoutes = require('./thoughtRoutes');

// add prefix of users to routes created in userRoutes and visversa for thoughts
router.use('/user', userRoutes);
router.use('/thought', toughtRoutes);

// export router module
module.exports = router;