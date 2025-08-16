const mongoose = require("mongoose");
const User = require("./models/user");
const Listing = require("./models/listing");

async function main() {
  await mongoose.connect(
    "mongodb+srv://vidula:Dharwad@cluster0.bwwd2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  );
  console.log("Connected to MongoDB");

  const user = await User.findOne(); // grab any existing user
  if (!user) {
    console.log("❌ No users found, create a user first");
    return;
  }

  const result = await Listing.updateMany(
    { $or: [{ owner: null }, { owner: { $exists: false } }] },
    { $set: { owner: user._id } },
  );

  console.log("✅ Fixed listings:", result);
  await mongoose.disconnect();
}

main();
