const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');

app.use(cors()); // Add cors middleware

const server = http.createServer(app);

app.get("/", (req, res) => {
    res.status(200).send("Hello World");
})

server.listen(4000, () => {
    console.log('Server is running on port 4000');
});