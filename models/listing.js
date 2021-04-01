const Sequelize = require('sequelize');
const {sequelize} = require('./database');

                               
const listing = sequelize.define('listing', {
  id: {type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.DataTypes.UUIDV4},
  userId: {type: Sequelize.UUID},
  title: Sequelize.STRING,
  location: Sequelize.STRING,
  typeOfBed: Sequelize.STRING,
  about: Sequelize.STRING,
  houseRules: Sequelize.STRING,
  propertyType: Sequelize.STRING,
  numOfBedroomss: Sequelize.INTEGER,
  numOfBathrooms: Sequelize.INTEGER,
  numOfGuests: Sequelize.INTEGER,
  numOfBeds: Sequelize.INTEGER,
}, { timestamps: true });

listing.sync({ force: true})

module.exports = {
  listing: listing,
};


