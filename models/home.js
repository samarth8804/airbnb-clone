const db = require("../utils/databaseUtil");

module.exports = class Home {
  constructor(houseName, houseImage, rating, price, location, description, id) {
    this.houseImage = houseImage;
    this.houseName = houseName;
    this.rating = rating;
    this.location = location;
    this.price = price;
    this.description = description;
    this.id = id;
  }

  save() {
    if (this.id) {
      //update
      return db.execute(
        `UPDATE homes SET houseName=?,houseImage=?,rating=?,price=?,location=?,description=? WHERE id=?`,
        [
          this.houseName,
          this.houseImage,
          this.rating,
          this.price,
          this.location,
          this.description,
          this.id,
        ]
      );
    } else {
      // insert

      return db.execute(
        "INSERT INTO homes (houseName, houseImage, rating, price, location,description) VALUES (?,?,?,?,?,?)",
        [
          this.houseName,
          this.houseImage,
          this.rating,
          this.price,
          this.location,
          this.description,
        ]
      );
    }
  }

  static fetchAll() {
    return db.execute("SELECT * FROM homes");
  }

  static fetchById(homeId) {
    return db.execute("SELECT * FROM homes WHERE id=?", [homeId]);
  }

  static deleteById(homeId) {
    return db.execute("DELETE FROM homes WHERE id=?", [homeId]);
  }
};
