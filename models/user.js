const Sequelize = require('sequelize');
const {sequelize} = require('./database');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

                               
const user = sequelize.define('user', {
  id: {type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.DataTypes.UUIDV4},
  email: { type: Sequelize.STRING, unique: true },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  role: Sequelize.STRING,
  gender: Sequelize.STRING,
  location: Sequelize.STRING,
  bio: Sequelize.STRING,
  school: Sequelize.STRING,
  work: Sequelize.STRING,
  password: Sequelize.STRING,
  passwordResetToken: Sequelize.STRING,
  passwordResetExpires: Sequelize.DATE,
  verificationMethod: Sequelize.STRING,
  emailVerificationToken: Sequelize.STRING,
  emailVerified: Sequelize.BOOLEAN,
  phoneVerified: Sequelize.BOOLEAN,
  facebook: Sequelize.STRING,
  twitter: Sequelize.STRING,
  google: Sequelize.STRING,
}, { timestamps: true });

// user.hasMany(listing);
// listing.belongsTo(user);

/**
 * Password hash middleware.
 */
// user.addHook('beforeSave', (next) => {
//   const user = this;
//   if (!user.isModified('password')) { return next(); }
//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) { return next(err); }
//     bcrypt.hash(user.password, salt, (err, hash) => {
//       if (err) { return next(err); }
//       user.password = hash;
//       next();
//     });
//   });
// });

/**
 * Helper method for validating user's password.
 */
user.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

/**
 * Helper method for getting user's gravatar.
 */
user.gravatar = function gravatar(size) {
  if (!size) {
    size = 200;
  }
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

user.sync({ force: true})

module.exports = {
  user: user,
};


