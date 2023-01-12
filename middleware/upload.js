const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const dotenv = require('dotenv');

dotenv.config();

const URL = process.env.MONGODB_URL;

const storage = new GridFsStorage({
    url : URL,
    options: { useNewUrlParser: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpg", "image/jpeg"];

        if(match.indexOf(file.memeType) === -1) 
            return`${Date.now()}-blog-${file.originalname}`;

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
});

module.exports = multer({storage});