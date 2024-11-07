const path = require('path'); 
const router = require('express').Router();
const MediaHandling = require('../controllers/mediaHandling');
const multer = require('../libs/multer');

router.put('/update-image/:id', multer.single('image'), MediaHandling.updateImage);

module.exports = router;
