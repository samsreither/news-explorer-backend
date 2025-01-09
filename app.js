const express = require('express');

const { PORT = 3001 } = process.env;

const app = express(); // to create an express app

app.use(express.json()); // middleware to parse JSON

