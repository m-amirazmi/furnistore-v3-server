require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { connectDB } = require('./utils/db');
const { connection } = require('mongoose');
const cookieParser = require('cookie-parser');
const { corsOptions } = require('./utils/corsSetup');

const app = express();
// app.use(cors());
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true }));

connectDB();

app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/categories', require('./routes/categories'));
app.use('/products', require('./routes/products'));
app.use('/consts', require('./routes/constant'));
app.use('/upload', require('./routes/uploads'));

connection.once('open', () => {
	console.log('Connected to MongoDB');
	app.listen(process.env.PORT, () => console.log(`Connected => http://localhost:${process.env.PORT}`));
});
