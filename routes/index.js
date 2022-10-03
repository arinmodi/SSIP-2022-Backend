const router = require('express').Router({ mergeParams: true });
const media = require('./MediaUpload');
const issue = require('./Issues');
const auth = require('./Auth');

router.use('/media', media);
router.use('/issue', issue);
router.use('/admin', auth);

module.exports = router;