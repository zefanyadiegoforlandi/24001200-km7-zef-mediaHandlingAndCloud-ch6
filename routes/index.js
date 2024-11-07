const path = require('path'); 
const router = require('express').Router();
const MediaHandling = require('../controllers/mediaHandling');
const multer = require('../libs/multer');

router.post('/upload-image', multer.single('image'), MediaHandling.uploadImage);
router.delete('/delete-image/:id', MediaHandling.deleteImage);
router.put('/update-image/:id', multer.single('image'), MediaHandling.updateImage);


router.get('/get-image', MediaHandling.getImage);

router.get('/get-image/:id', MediaHandling.getImageById);

module.exports = router;
