const path = require('path'); 
const router = require('express').Router();
const MediaHandling = require('../controllers/mediaHandling');
const multer = require('../libs/multer');

// add data 
router.post('/add-image', multer.single('image'), MediaHandling.uploadImage);
//delete-image
router.delete('/delete-image/:id', MediaHandling.deleteImage);
// update/edit data 
router.put('/edit-data/:id', multer.single('image'), MediaHandling.updateImage);
// get semua daftar gambar(id,title, imageURL)
router.get('/get-all-image', MediaHandling.getImage);
// get data dengan ID(id,title,description, imageURL, imageFieldId)
router.get('/getData/:id', MediaHandling.getImageById);

module.exports = router;
