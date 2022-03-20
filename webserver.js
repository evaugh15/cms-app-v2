const http = require('https');
const app = require('./serverside/app');
const server = http.createServer(app);
server.listen(process.env.PORT || 8000);
console.log("server running on port 8000");