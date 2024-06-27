const express = require('express');

//importing mongodb
const mongodb=require('mongodb');
const MongoClient=mongodb.MongoClient;

//makes registering multiple routs easy
const router = express.Router();

const uri =
  'mongodb+srv://habeeb:habeeb2004@cluster0.facck37.mongodb.net/locations?retryWrites=true&w=majority&appName=Cluster0';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri); //just copy paste it, (only change the uri if neccessary)

//storage that keep working until the server is shuted down
const locationStorage = {
  locations: [],
};

//specify a method to support and put the posts
router.post('/add-location', (req, res, next) => {
  //the path you want to put the requests

  // Use connect method to connect to the Server
  client.connect(function (err, client) {
    const db = client.db('locations');

    // Insert a single document
    db.collection('user-locations').insertOne(//send data from the dataBase
      {
        //push the address into the array
        address: req.body.address, //the address
        coords: { lat: req.body.lat, lng: req.body.lng },
      },
      function (err, r) {
        console.log(r);
        res.json({ message: 'Stored location!', locId: r.insertedId }); //sent back a message to the user
      }
    );
  });
});

//specify a method to get the posts
router.get('/location/:lid', (req, res, next) => {
  //the /:lid tells where to start taking the id we provided
  const licationId = req.params.lid; //we took the id and made it a number

  // Use connect method to connect to the Server
  client.connect(function (err, client) {
    const db = client.db('locations');

    // Insert a single document
    db.collection('user-locations').findOne(//get data from the dataBase
      {
        _id: new mongodb.ObjectId(licationId)
      },
      function (err, doc) {
        if (!doc) {
          return res.status(404).json({ message: 'Not Found' }); //if the id not stored return an error
        }
        res.json({ address: doc.address, coordinates: doc.coords }); //if found return the address
      }
    );
  });
});

module.exports = router; //export the router
