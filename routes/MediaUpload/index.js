const multer = require('multer');
const router = require('express').Router({ mergeParams: true });
const uploadMedia = require('./uploadMedia');

router.post("/upload/img", multer({ limits : {  fileSize : 5000000  } }).array("image", 3), uploadMedia);
router.post("/upload/video", multer({ limits : {  fileSize : 20000000  } }).array("video", 1), uploadMedia);

module.exports = router;