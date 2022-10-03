const router = require('express').Router({ mergeParams: true });
const { authMiddleware } = require('../../middlewares/auth');
const validator = require('../../middlewares/validation');
const { authSchema } = require('./@validationSchema');
const auth = require('./auth');
const changePassword = require('./changePassword');

router.post('/validate', validator(authSchema), auth);
router.post('/changePassword', validator(authSchema), authMiddleware, changePassword);

module.exports =  router;