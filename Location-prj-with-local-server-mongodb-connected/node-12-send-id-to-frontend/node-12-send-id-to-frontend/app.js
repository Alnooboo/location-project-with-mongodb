const express = require('express');
const bodyParser = require('body-parser');

const locationRoutes = require('./routes/location');//import the Router from the Location file

const app = express();

// app.set('view engine', 'ejs');
// app.set('views', 'views');

//get the data ready adn extracte in the bodty
app.use(bodyParser.json());

//adding headers to escape the CORS policy,
//(telling the server that we will sent and recieve data from other servers)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');// '*' => all the servers are allowed (we could write the server name instead)
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');// what methods that we are allowing
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');//redefine what speciel headers the client may send to us
  next();
});

//calling the routes method
app.use(locationRoutes);

//calling the server
app.listen(3000);
