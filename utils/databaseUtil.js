const mongo = require("mongodb");

const MongoClient = mongo.MongoClient;

const MONGO_URL =
  "mongodb+srv://samarthmittal0808:samarth%40atlas%401@cluster0.a9socrh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const mongoConnect = (callback) => {
  MongoClient.connect(MONGO_URL)
    .then((client) => {
      callback(client);
    })
    .catch((err) => {
      console.log("Error while connecting to mongo ", err);
    });
};

module.exports = mongoConnect;
