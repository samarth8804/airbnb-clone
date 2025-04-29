const { ObjectId } = require("mongodb");
const { getDB } = require("../utils/databaseUtil");

module.exports = class Home {
  constructor(
    houseName,
    houseImage,
    rating,
    price,
    location,
    description,
    _id
  ) {
    this.houseImage = houseImage;
    this.houseName = houseName;
    this.rating = rating;
    this.location = location;
    this.price = price;
    this.description = description;
    if (_id) {
      this._id = _id;
    }
  }

  save() {
    if (this._id) {
      // update
      const db = getDB();
      const updateData = { ...this };
      delete updateData._id; // Remove _id from update data
      return db
        .collection("homes")
        .updateOne(
          { _id: new ObjectId(String(this._id)) },
          { $set: updateData }
        );
    } else {
      // insert
      const db = getDB();
      return db.collection("homes").insertOne(this);
    }
  }

  static fetchAll() {
    const db = getDB();
    return db.collection("homes").find().toArray();
  }

  static fetchById(homeId) {
    const db = getDB();
    return db
      .collection("homes")
      .find({ _id: new ObjectId(String(homeId)) })
      .next();
  }

  static deleteById(homeId) {
    const db = getDB();
    return db
      .collection("homes")
      .deleteOne({ _id: new ObjectId(String(homeId)) });
  }
};
