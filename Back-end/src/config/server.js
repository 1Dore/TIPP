const express = require('express');
const app = express();
const cors = require('cors');

const socket = require('socket.io');

app.use(express.json());
app.use(cors());
app.set("port", 3030);

module.exports = app;



