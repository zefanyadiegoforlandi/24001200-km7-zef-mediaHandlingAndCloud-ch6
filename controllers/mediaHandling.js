const imagekit = require('../libs/imagekit');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const path = require('path');


class MediaHandling {

    static async uploadImage(req, res) {
        try {
            if (!req.body.title || !req.body.description || !req.file) {
                return res.status(400).json({ message: "Title, description, and image must be provided." });
            }

            const fileExtension = path.extname(req.file.originalname);
            const uniqueFileName = `${Date.now()}${fileExtension}`;
            const stringFile = req.file.buffer.toString('base64');

            const uploadImage = await imagekit.upload({
                fileName: uniqueFileName, 
                file: stringFile
            });

            const isActive = (req.body.isActive === 'true' || req.body.isActive === true) 
                ? true 
                : (req.body.isActive === 'false' || req.body.isActive === false) 
                ? false 
                : undefined;

            const imageRecord = await prisma.allImage.create({
                data: {
                    title: req.body.title,
                    description: req.body.description,
                    imageURL: uploadImage.url,
                    imageFieldId: uploadImage.fileId,
                    isActive: isActive 
                }
            });

            res.status(201).json({
                status: 'success',
                message: 'Image uploaded successfully.',
                data: imageRecord
            });
        } catch (error) {
            console.error('Error during image upload:', error);
            res.status(500).json({ error: 'Failed to save data.' });
        }
    }
    
    

    static async updateImage(req, res) {
        const { id } = req.params;
        const { title, description, isActive } = req.body;
        const file = req.file;

        if (!title && !description && !file && isActive === undefined) {
            return res.status(400).json({ message: 'Title, description, or image must be provided for update.' });
        }

        const dataToUpdate = {};
        if (title) dataToUpdate.title = title;
        if (description) dataToUpdate.description = description;

        if (isActive !== undefined) {
            dataToUpdate.isActive = (isActive === 'true' || isActive === true) 
                ? true 
                : (isActive === 'false' || isActive === false) 
                ? false 
                : undefined;
        }

        try {
            if (file) {
                const timestamp = Date.now();
                const newFileName = `${timestamp}${path.extname(file.originalname)}`;

                const uploadResult = await imagekit.upload({
                    file: file.buffer,
                    fileName: newFileName
                });

                dataToUpdate.imageURL = uploadResult.url;
                dataToUpdate.imageFieldId = uploadResult.fileId;
            }

            const image = await prisma.allImage.update({
                where: { id: Number(id) },
                data: dataToUpdate
            });

            res.status(200).json({
                status: 'success',
                message: 'Image updated successfully.',
                data: image
            });
        } catch (error) {
            console.error('Error during image update:', error);
            if (error.code === 'P2025') {
                return res.status(404).json({ message: 'Image not found.' });
            }
            res.status(500).json({ message: 'Failed to edit image.', error });
        }
    }
    
    

    static async getImage(req, res) {
        try {
            const images = await prisma.allImage.findMany({
                where: {
                    isActive: true 
                },
                orderBy: {
                    id: 'asc' 
                },
                select: {
                    id: true,
                    title: true,
                    description: true,
                    imageURL: true,
                    imageFieldId: true
                }
            });
    
            res.status(200).json({
                status: 'success',
                message: 'Gambar berhasil diambil',
                data: images
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Gagal mengambil gambar',
                error: error.message
            });
        }
    }
        
    static async getImageById(req, res) {
        const { id } = req.params;
    
        try {
            const image = await prisma.allImage.findFirst({
                where: {
                    id: parseInt(id),
                    isActive: true
                }
            });
    
            if (!image) {
                return res.status(404).json({ message: 'Gambar tidak ditemukan atau tidak aktif' });
            }
    
            res.status(200).json({
                status: 'success',
                message: 'Gambar berhasil diambil',
                data: image
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Gagal mengambil detail gambar', error });
        }
    }
    

    static async deleteImage(req, res) {
        const { id } = req.params;
    
        try {
            const imageToDelete = await prisma.allImage.findUnique({
                where: { id: parseInt(id) }
            });
    
            if (!imageToDelete) {
                return res.status(404).json({ message: 'Gambar tidak ditemukan' });
            }
    
            await imagekit.deleteFile(imageToDelete.imageFieldId);
    
            await prisma.allImage.delete({
                where: { id: parseInt(id) }
            });
    
            res.status(200).json({ message: 'Gambar berhasil dihapus' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Gagal menghapus gambar', error });
        }
    }
    

}

module.exports = MediaHandling