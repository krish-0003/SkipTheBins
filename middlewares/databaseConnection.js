const mongoose = require("mongoose");

const createConnection = () => {
  const DATABASE_URL =
    "mongodb+srv://vivekpatel:b00896765@skipthebins.1txlp.mongodb.net/skipthebins";

  mongoose
    .connect(DATABASE_URL, { useNewUrlParser: true })
    .then(() => {
      console.log("Connected to database");
    })
    .catch((error) => {
      console.log("Error connecting to database", error);
    });
};

module.exports = createConnection;