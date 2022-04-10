const http = require('https');
const express = require('express')
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("Server is running on port " +port);
});
