const express = require('express');
const mongoose = require('mongoose'); // 1. Added this
const app = express();
require('dotenv').config();

// require('./Models/db'); // 2. REMOVED this (since you deleted the file)

const taskRouter = require('./Routes/taskRouter');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

// 3. Simple health check
app.get('/', (req, res) => {
    res.send("Hilloo from server :)");
});

// 4. Database Connection Logic
let isConnected = false;

async function connectToMongoDb() {
    if (isConnected) return; 
    try {
        await mongoose.connect(process.env.DB_URL);
        isConnected = true;
        console.log('Connected to MONGODB');
    } catch (err) {
        console.error("Problem connecting to db ", err);
    }
}

// 5. Middleware to ensure DB is connected before any route runs
app.use(async (req, res, next) => {
    if (!isConnected) {
        await connectToMongoDb(); // Use 'await' so it finishes before moving on
    }
    next(); // Now it will always move to the next step
});

app.use('/tasks', taskRouter);

module.exports = app;