const mongoose = require("mongoose");
const initdata = require("./data.js"); // --->         ./ means same directory
const Listing = require("../models/listing.js");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/airbnb"); //connecting to mongodb database using mongoose and creating a database called airbnb
}

main()
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

const initDB = async () => {
  //function to initialise database
  await Listing.deleteMany({});
  initdata.data = initdata.data.map((obj) => ({
    ...obj,
    owner: "689591142a1d834b708c5c6a",
  }));
  await Listing.insertMany(initdata.data);
  console.log("Data was initialised and saved to database");
};

initDB();
