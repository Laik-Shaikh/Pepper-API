const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
// const multer = require('multer');
// const upload = multer();

const PORT = process.env.PORT || 7000;

const DBConnection = require('./database/DBConnection');
const Router = require('./routes/routes');
const { none } = require('./middleware/upload');

const app = express();

app.use(cors())
app.use(express.json());

DBConnection();

app.get('/', (request, response) => {
    response.send("Hello");
});

app.use('/admin', Router);

app.listen(PORT, () => {
    console.log(`Server is Listening on Port ${PORT}`);
});