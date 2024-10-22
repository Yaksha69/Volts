require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors package

const dataRoutes = require('./routes/dataRoutes');
const app = express();

// Enable CORS for specific origin
app.use(cors({
    origin: 'http://localhost:5500', // Allow your frontend origin
    methods: ['GET', 'POST'], // Specify allowed methods
}));

app.use(express.json());

// Connect to the database
mongoose.connect(process.env.DB_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Connected to the database...');
            console.log('Listening on port ', process.env.PORT);
        });
    })
    .catch(err => {
        console.log(err);
    });

const requestMapper = '/api/v1';
app.use(requestMapper + '/data', dataRoutes);

// Handle 404
app.use((req, res) => {
    res.status(404).json({ error: "No such method exists" });
});
