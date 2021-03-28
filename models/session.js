const Sequelize = require('sequelize');
const {sequelize} = require('./database');

                               
const session = sequelize.define('session', {
  id: {type: Sequelize.UUID, primaryKey: true},
  session: { type: Sequelize.JSON },
  expire: {type: Sequelize.DATE}

}, { timestamps: true,
freezeTableName: true
});

session.sync({ force: true})

module.exports = {
  User: session,
};


