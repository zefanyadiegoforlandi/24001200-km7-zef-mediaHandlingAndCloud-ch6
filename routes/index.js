const path = require('path'); 
const router = require('express').Router();
const MediaHandling = require('../controllers/mediaHandling');
const multer = require('../libs/multer');

router.post('/upload-image', multer.single('image'), MediaHandling.uploadImage);

module.exports = router;
