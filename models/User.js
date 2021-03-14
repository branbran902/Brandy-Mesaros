const bcrypt = require('bcrypt');
const crypto = require('crypto');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB,
                                process.env.USER,
                                process.env.PASSWORD,
                                {
                                    host: process.env.HOST,
                                    port: process.env.PORT,
                                    dialect: 'postgres',
                                    dialectOptions: {
                                        ssl: process.env.DB_SSL == "true"
                                    }
                                });

const userSchema = sequelize.define('user', {
  email: { type: Sequelize.STRING, unique: true },
  password: Sequelize.STRING,
  passwordResetToken: Sequelize.STRING,
  passwordResetExpires: Sequelize.DATE,
  emailVerificationToken: Sequelize.STRING,
  emailVerified: Sequelize.BOOLEAN,

  snapchat: Sequelize.STRING,
  facebook: Sequelize.STRING,
  twitter: Sequelize.STRING,
  google: Sequelize.STRING,
  github: Sequelize.STRING,
  instagram: Sequelize.STRING,
  linkedin: Sequelize.STRING,
  steam: Sequelize.STRING,
  twitch: Sequelize.STRING,
  quickbooks: Sequelize.STRING,
  tokens: Sequelize.STRING,
}, { timestamps: true });

const profileSchema = sequelize.define('profile', {
    name: Sequelize.STRING,
    gender: Sequelize.STRING,
    location: Sequelize.STRING,
    website: Sequelize.STRING,
    picture: Sequelize.STRING,
});

userSchema.hasOne(profileSchema);
profileSchema.belongsTo(userSchema);

/**
 * Password hash middleware.
 */
userSchema.addHook('beforeSave', (next) => {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

/**
 * Helper method for validating user's password.
 */
userSchema.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

/**
 * Helper method for getting user's gravatar.
 */
userSchema.gravatar = function gravatar(size) {
  if (!size) {
    size = 200;
  }
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

const Person = sequelize.define('Person', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: true
    },
});
module.exports = {
    sequelize: sequelize,
    Person: Person,
    User: userSchema,
};
