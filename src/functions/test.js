exports.handler = (event, context, callback) => {
  // Perform MongoDb logic.
  // const MongoClient = require('mongodb').MongoClient;
  // const uri = "mongodb+srv://JayDP123:<password>@cluster0.35fff.mongodb.net/<dbname>?retryWrites=true&w=majority";
  // const client = new MongoClient(uri, { useNewUrlParser: true });
  // client.connect(err => {
  //   const collection = client.db("test").collection("devices");
  //   // perform actions on the collection object
  //   client.close();
  // });

  // Return the auth-token
  callback(null, {
    statusCode: 200,
    body: 'No worries, all is working fine!'
  })
}