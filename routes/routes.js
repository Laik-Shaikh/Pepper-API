const express = require('express');
const router = express.Router();

const upload = require('../middleware/upload');

const { updateDetails, getDetails, getImage, uploadImage, updateCount } = require('../controller/Controller');

router.put('/update', updateDetails);
router.get('/details', getDetails);

router.put('/file/upload', upload.single('file'), uploadImage);
router.get('/file/:filename', getImage);

router.put('/count', updateCount);

module.exports = router;