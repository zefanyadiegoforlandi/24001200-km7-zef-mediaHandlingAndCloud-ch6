const imagekit = require('../libs/imagekit');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


class MediaHandling {

    //ini fitur update
    static async updateImage(req, res) {
        const { id } = req.params;
        const { title, description } = req.body;
        const file = req.file;

        if (!title && !description && !file) {
            return res.status(400).json({ message: 'Title, description, atau image harus diisi untuk update.' });
        }

        const dataToUpdate = {};
        if (title) dataToUpdate.title = title;
        if (description) dataToUpdate.description = description;

        try {
            if (file) {
                const uploadResult = await imagekit.upload({
                    file: file.buffer,
                    fileName: file.originalname
                });

                dataToUpdate.url = uploadResult.url;
                dataToUpdate.fileId = uploadResult.fileId;
            }

            const image = await prisma.image.update({
                where: { id: Number(id) },
                data: dataToUpdate
            });

            res.status(200).json(image);
        } catch (error) {
            console.error(error);
            if (error.code === 'P2025') {
                return res.status(404).json({ message: 'Gambar tidak ditemukan' });
            }
            res.status(500).json({ message: 'Gagal mengedit gambar', error });
        }
    }        

}

module.exports = MediaHandling