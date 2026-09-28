const express = require('express');
const healthRouter = require('./routes/health.route');
const roomRouter = require('./routes/room.route'); // 1. Import the new router

const app = express();

app.use(express.json());

app.use('/health', healthRouter);
app.use('/rooms', roomRouter); // 2. Mount it to the /rooms path

module.exports = app;