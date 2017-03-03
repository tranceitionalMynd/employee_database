const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const static = express.static;

var isConnected = false;

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

// Give precedence to app.get statements over app.use(static)
// By listing get statements first
app.get('/', (request, response) => {
  response.render('index', {name: 'John'});
});

app.use(static(__dirname + '/public/'));

app.listen(port, () => {
  console.log("Listening on: " + port);
  isConnected = true
});

module.exports.isConnected = isConnected;
module.exports.app = app;
