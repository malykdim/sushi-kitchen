const express = require('express');
const cors = require('./middlewares/cors');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json({ message: 'REST Service operational' });
});

app.listen(3030, () => console.log(`REST Service started at http://localhost:3030`));