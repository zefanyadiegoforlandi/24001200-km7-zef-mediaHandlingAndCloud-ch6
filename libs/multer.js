const multer = require('multer');

const upload = multer({
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'video/mp4'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            const err = new Error('Hanya file PNG, JPG, dan MP4 yang diperbolehkan!');
            cb(err, false);
        }
    },
    
    onError: (err, next) => {
        next(err);
    },
});

module.exports = upload;


