const http = require('https');
const app = require('./app');
const server = http.createServer(app);
//const port = process.env.PORT || 8080;

// app.listen(port, () => {
//     console.log("Server is running on port " + port);
// });

let port  = process.env.PORT; //port the app will be listening on
if (port == null || port ==""){
    port = 3000;
}

app.listen(port, function(){
    console.log('Server running on localhost:' + port)
});