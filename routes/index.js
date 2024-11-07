const path = require('path'); 
const router = require('express').Router();
const MediaHandling = require('../controllers/mediaHandling');
const multer = require('../libs/multer');

router.delete('/delete-image/:id', MediaHandling.deleteImage);

module.exports = router;
