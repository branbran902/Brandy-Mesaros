const bcrypt = require('bcrypt');
const crypto = require('crypto');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.POSTGRES_DB,
                                process.env.POSTGRES_USER,
                                process.env.POSTGRES_PASSWORD,
                                {
                                    host: process.env.POSTGRES_HOST,
                                    port: process.env.POSTGRES_PORT,
                                    dialect: 'postgres',
                                    dialectOptions: {
                                        ssl: process.env.POSTGRES_DB_SSL == "true"
                                    }
                                },{
                                  logging: console.log,  
                                });

                                test();


                                async function test(){
                                  try {
                                   console.log('Gonna authenticate'); // <== to make sure console.log is working and not overrided!
                                   var conn = await sequelize.authenticate()
                                   .then(() => console.log('All Done :)'))
                                   .catch(err => console.error(err))
                                   console.log('Connection has been established successfully.');
                                 } catch (error) {
                                   console.error('Unable to connect to the database:', error);
                                 }
                               }

                               
const User = sequelize.define('User', {
  email: { type: Sequelize.STRING, unique: true },
  password: Sequelize.STRING,
  passwordResetToken: Sequelize.STRING,
  passwordResetExpires: Sequelize.DATE,
  emailVerificationToken: Sequelize.STRING,
  emailVerified: Sequelize.BOOLEAN,


  facebook: Sequelize.STRING,
  twitter: Sequelize.STRING,
  google: Sequelize.STRING,
}, { timestamps: true });

console.log(sequelize.models)
console.log(sequelize.models.User === User)

const Profile = sequelize.define('Profile', {
    name: Sequelize.STRING,
    gender: Sequelize.STRING,
    location: Sequelize.STRING,
    website: Sequelize.STRING,
    picture: Sequelize.STRING,
});

User.hasOne(Profile);
Profile.belongsTo(User);

/**
 * Password hash middleware.
 */
// User.addHook('beforeSave', (next) => {
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
User.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

/**
 * Helper method for getting user's gravatar.
 */
User.gravatar = function gravatar(size) {
  if (!size) {
    size = 200;
  }
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

User.sync({ force: true})

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

Person.sync({ force: true})

module.exports = {
    sequelize: sequelize,
    Person: Person,
    User: User,
    Profile: Profile,
};
