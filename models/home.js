// Fake database
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtils");

const filePath = path.join(rootDir, "data", "homes.json");

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
      if (this.id) {
        //edit home case
        registeredHomes = registeredHomes.map((home) => {
          if (home.id === this.id) {
            return this;
          }
          return home;
        });
      } else {
        // add home case

        this.id = Math.random().toString();

        registeredHomes.push(this);
      }

      fs.writeFile(filePath, JSON.stringify(registeredHomes), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(callback) {
    fs.readFile(filePath, (err, data) => {
      if (!err) {
        callback(JSON.parse(data));
      } else {
        callback([]);
      }
    });
  }

  static fetchById(homeId, callback) {
    this.fetchAll((homes) => {
      const homeFound = homes.find((home) => home.id === homeId);
      callback(homeFound);
    });
  }

  static deleteById(homeId, callback) {
    this.fetchAll((homes) => {
      homes = homes.filter((home) => home.id !== homeId);
      fs.writeFile(filePath, JSON.stringify(homes), callback);
    });
  }
};
