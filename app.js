if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/image', express.static('public/images'));
app.use('/', routes);

const server = app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});

//jika ada ini berarti ci/cd berhasil pastikan sudah ada .env
