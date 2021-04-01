/**
 * Module dependencies.
 */
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const lusca = require('lusca');
const dotenv = require('dotenv');
const flash = require('express-flash');
const path = require('path');
const passport = require('passport');
const passportConfig = require('./config/passport');
const sass = require('node-sass-middleware');
const multer = require('multer');
const Sequelize = require("sequelize");
const session = require("express-session");
// const dropzone = require("dropzone");

// Initalize sequelize with session store
var SequelizeStore = require("connect-session-sequelize")(session.Store);
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

const upload = multer({ dest: path.join(__dirname, 'uploads') });

/**
 * Controllers (route handlers).
 */
const homeController = require('./controllers/home');
const userController = require('./controllers/user');
const apiController = require('./controllers/api');
const contactController = require('./controllers/contact');
const navbarController = require('./controllers/navbar');
const errorController = require('./controllers/error');
const listingController = require('./controllers/listing');

/**
 * Create Express server.
 */
const app = express();

var sessionStore = new SequelizeStore({
  checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
  expiration: 24 * 60 * 60 * 1000,  // The maximum age (in milliseconds) of a valid session.
  db: sequelize
});
app.use(
  session({
    key: 'user_sid',
    secret: "keyboard cat",
    // store: sessionStore,
    // saveUninitialized: false,
    // resave: false,
    // proxy: true,
    // cookie: {
    //   expires: 600000,
    //   httpOnly: false
  // }
  })
);

// sessionStore.sync();


/**
 * Cookies 
 */
// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
// app.use((req, res, next) => {
//   if (req.cookies.user_sid && !req.session.user) {
//       res.clearCookie('user_sid');        
//   }
//   next();
// });


// // middleware function to check for logged-in users
// var sessionChecker = (req, res, next) => {
//   if (req.session.user && req.cookies.user_sid) {
//       res.redirect('/account/dashboard');
//   } else {
//       next();
//   }    
// };

/**
 * Express configuration.
 */
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(compression());
app.use(sass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public')
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());
// require('./config/passport')(passport);

app.use(flash());
app.use((req, res, next) => {
  if (req.path === '/api/upload') {
    // Multer multipart/form-data handling needs to occur before the Lusca CSRF check.
    next();
  } else {
    lusca.csrf()(req, res, next);
  }
});

app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.disable('x-powered-by');
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
app.use((req, res, next) => {
  // After successful login, redirect back to the intended page
  if (!req.user
    && req.path !== '/login'
    && req.path !== '/signup'
    && !req.path.match(/^\/auth/)
    && !req.path.match(/\./)) {
    req.session.returnTo = req.originalUrl;
  } else if (req.user
    && (req.path === '/account' || req.path.match(/^\/api/))) {
    req.session.returnTo = req.originalUrl;
  }
  next();
});
app.use('/', express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));
app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/chart.js/dist'), { maxAge: 31557600000 }));
app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/popper.js/dist/umd'), { maxAge: 31557600000 }));
app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js'), { maxAge: 31557600000 }));
app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/jquery/dist'), { maxAge: 31557600000 }));
app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/dropzone/dist/min'), { maxAge: 31557600000 }));
app.use('/webfonts', express.static(path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free/webfonts'), { maxAge: 31557600000 }));

/**
 * Primary app routes.
 */

//ACCOUNT
app.get('/', homeController.index);
app.get('/login', userController.getLogin);
app.post('/login', userController.postLogin);
app.get('/logout', userController.logout);
app.get('/forgot', userController.getForgot);
app.post('/forgot', userController.postForgot);
app.get('/signup', userController.getSignup);
app.post('/signup', userController.postSignup);
app.get('/contact', contactController.getContact);
app.get('/account', passportConfig.isAuthenticated, userController.getAccount);
app.post('/account/profile', passportConfig.isAuthenticated, userController.postUpdateProfile);
app.post('/account/password', passportConfig.isAuthenticated, userController.postUpdatePassword);
app.post('/account/delete', passportConfig.isAuthenticated, userController.postDeleteAccount);
app.get('/account/unlink/:provider', passportConfig.isAuthenticated, userController.getOauthUnlink);
app.get('/account/dashboard', userController.getDashboard);

//NAVBAR
app.get('/about', navbarController.getAbout);
app.get('/why-host', navbarController.getWhyHost);


//ERROR
app.get('/oops', errorController.getOops);
app.get('/503', errorController.get503);

/**
 * API examples routes.
 */
// app.get('/api', apiController.getApi);
// app.get('/api/stripe', apiController.getStripe);
// app.post('/api/stripe', apiController.postStripe);
app.get('/api/twilio', apiController.getTwilio);
app.post('/api/twilio', apiController.postTwilio);
// app.get('/api/facebook', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getFacebook);
// app.get('/api/twitter', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getTwitter);
// app.post('/api/twitter', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.postTwitter);
// app.get('/api/upload', lusca({ csrf: true }), apiController.getFileUpload);
// app.post('/api/upload', upload.single('myFile'), lusca({ csrf: true }), apiController.postFileUpload);
// app.get('/api/google-maps', apiController.getGoogleMaps);

/**
 * OAuth authentication routes. (Sign in)
 */
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email', 'https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/spreadsheets.readonly'], accessType: 'offline', prompt: 'consent' }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});

/**
 * Listings
 */
 app.get('/new-listing', listingController.getNewListing);
 app.post('/new-listing', listingController.postNewListing);
 app.get('/listing', listingController.getListingById);

/**
 * Error Handler.
 */
if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorHandler());
} else {
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Server Error');
  });
}

app.get('*', errorController.get404);


/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
