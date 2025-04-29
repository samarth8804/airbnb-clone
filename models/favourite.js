const { getDB } = require("../utils/databaseUtil");

module.exports = class Favourite {
  constructor(homeid) {
    this.homeId = homeid;
  }

  addToFavourite() {
    const db = getDB();
    return db
      .collection("favourites")
      .findOne({ homeId: this.homeId })
      .then((existingFav) => {
        console.log(existingFav);
        if (!existingFav) {
          return db.collection("favourites").insertOne(this);
        }
        return Promise.resolve();
      });
  }

  static getFavourites() {
    const db = getDB();
    return db.collection("favourites").find().toArray();
  }

  static deleteById(homeId) {
    const db = getDB();
    return db.collection("favourites").deleteOne({ homeId: homeId });
  }
};
