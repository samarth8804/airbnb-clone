const mongoose = require("mongoose");

const homeSchema = mongoose.Schema({
  houseName: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  rating: { type: Number, required: true },
  houseImage: String,
  description: String,
});

// homeSchema.pre("findOneAndDelete", async function (next) {
//   const homeId = this.getQuery()._id;
//   await Favourite.deleteMany({ homeId });
//   next();
// });

module.exports = mongoose.model("Home", homeSchema);
