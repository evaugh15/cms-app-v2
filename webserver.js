const http = require('https');
const app = require('./serverside/app');
const server = http.createServer(app);
//server.listen(process.env.PORT || 3000);
//console.log("server running on port 3000");