//make a model here (model schema) and then export it to index.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema; //changing the variable name; so that it will be easier to type mongoose.schema as schema
const Review = require("./review.js");

const listingSchema = new Schema({
  //using this schema we will create a model(collection)
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: {
      type: String,
      default:
        "https://plus.unsplash.com/premium_photo-1752192844294-35fb57ae49be?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

      set: (v) =>
        v === ""
          ? "https://plus.unsplash.com/premium_photo-1752192844294-35fb57ae49be?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          : v,
    },
    filename: String,
  },
  //setting default condition for any field in the model;
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});
const Listing = mongoose.model("Listing", listingSchema); //creating a collection called listings

module.exports = Listing;
