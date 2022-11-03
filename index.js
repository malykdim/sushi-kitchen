require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const cors = require('./middlewares/cors');
const authController = require('./controllers/authController');
const dataController = require('./controllers/dataController');

start();

async function start() {
    
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log('Database connected');
    
    const app = express();
    
    app.use(express.json());
    app.use(cors());
    
    app.get('/', (req, res) => {
        res.json({ message: 'REST Service operational' });
    });
    
    app.use('/users', authController);
    app.use('/data/catalog', dataController);
    
    app.listen(3030, () => console.log(`REST Service started at ${process.env.HOST}:${process.env.PORT}`));    
}