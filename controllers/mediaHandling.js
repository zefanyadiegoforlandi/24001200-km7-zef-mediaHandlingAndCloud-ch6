const imagekit = require('../libs/imagekit');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


class MediaHandling {

    static async uploadImage(req, res) {
        try {
            if (!req.body.title || !req.body.description) {
                return res.status(400).json({ message: "Title, description, image harus diisi semua." });
            }
    
            const stringFile = req.file.buffer.toString('base64');
    
            const uploadImage = await imagekit.upload({
                fileName: req.file.originalname,
                file: stringFile
            });
    
            const imageRecord = await prisma.image.create({
                data: {
                    title: req.body.title,
                    description: req.body.description,
                    url: uploadImage.url,
                    fileId: uploadImage.fileId
                }
            });
            res.status(201).json({
                status: 'success',
                message: 'Gambar berhasil diupload',
                data: imageRecord
            });
        } catch (error) {
            console.error('Error during image upload:', error);
            res.status(500).json({ error: 'Gagal menyimpan data' });
        }
    }
   
}

module.exports = MediaHandling