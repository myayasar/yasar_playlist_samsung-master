const env = require('./lib/env.js');
const {RESTPort} = new env();
var PORT = process.env['PORT'] || RESTPort;

var app = require('./lib/app.js')();


console.log("Running @ http://localhost:"  + PORT + ". Press ^C to Terminate.");
app.listen(PORT);