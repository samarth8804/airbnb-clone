// Fake database
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtils");

module.exports = class Home {
  constructor(houseName, houseImage, rating, price, location) {
    this.houseImage = houseImage;
    this.houseName = houseName;
    this.rating = rating;
    this.location = location;
    this.price = price;
  }

  save() {
    Home.fetchAll((registeredHomes) => {
      registeredHomes.push(this);
      const filePath = path.join(rootDir, "data", "homes.json");
      fs.writeFile(filePath, JSON.stringify(registeredHomes), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(callback) {
    const filePath = path.join(rootDir, "data", "homes.json");
    fs.readFile(filePath, (err, data) => {
      if (!err) {
        callback(JSON.parse(data));
      } else {
        callback([]);
      }
    });
  }
};
