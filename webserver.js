const http = require('https');
const app = require('./serverside/app');
const server = http.createServer(app);
//const port = process.env.PORT || 8080;

/*app.listen(port, () => {
    console.log("Server is running on port " +port);
});*/
