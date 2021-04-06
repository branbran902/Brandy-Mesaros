// const Twitter = require('twitter-lite');
// const stripe = require('stripe')(process.env.STRIPE_SKEY);
const twilio = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
// const crypto = require('crypto');
// const axios = require('axios');
// const Quickbooks = require('node-quickbooks');
// const validator = require('validator');

// Quickbooks.setOauthVersion('2.0');

// /**
//  * GET /api
//  * List of API examples.
//  */
// exports.getApi = (req, res) => {
//   res.render('api/index', {
//     title: 'API Examples'
//   });
// };


// /**
//  * GET /api/facebook
//  * Facebook API example.
//  */
// exports.getFacebook = (req, res, next) => {
//   const token = req.user.tokens.find((token) => token.kind === 'facebook');
//   const secret = process.env.FACEBOOK_SECRET;
//   const appsecretProof = crypto.createHmac('sha256', secret).update(token.accessToken).digest('hex');
//   axios.get(`https://graph.facebook.com/${req.user.facebook}?fields=id,name,email,first_name,last_name,gender,link,locale,timezone&access_token=${token.accessToken}&appsecret_proof=${appsecretProof}`)
//     .then((response) => {
//       res.render('api/facebook', {
//         title: 'Facebook API',
//         profile: response.data
//       });
//     })
//     .catch((error) => next(error.response));
// };

// /**
//  * GET /api/twitter
//  * Twitter API example.
//  */
// exports.getTwitter = async (req, res, next) => {
//   const token = req.user.tokens.find((token) => token.kind === 'twitter');
//   const T = new Twitter({
//     consumer_key: process.env.TWITTER_KEY,
//     consumer_secret: process.env.TWITTER_SECRET,
//     access_token_key: token.accessToken,
//     access_token_secret: token.tokenSecret
//   });
//   try {
//     const { statuses: tweets } = await T.get('search/tweets', {
//       q: 'nodejs since:2013-01-01',
//       geocode: '40.71448,-74.00598,5mi',
//       count: 10
//     });
//     res.render('api/twitter', {
//       title: 'Twitter API',
//       tweets
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// /**
//  * POST /api/twitter
//  * Post a tweet.
//  */
// exports.postTwitter = async (req, res, next) => {
//   const validationErrors = [];
//   if (validator.isEmpty(req.body.tweet)) validationErrors.push({ msg: 'Tweet cannot be empty' });

//   if (validationErrors.length) {
//     req.flash('errors', validationErrors);
//     return res.redirect('/api/twitter');
//   }

//   const token = req.user.tokens.find((token) => token.kind === 'twitter');
//   const T = new Twitter({
//     consumer_key: process.env.TWITTER_KEY,
//     consumer_secret: process.env.TWITTER_SECRET,
//     access_token_key: token.accessToken,
//     access_token_secret: token.tokenSecret
//   });
//   try {
//     await T.post('statuses/update', { status: req.body.tweet });
//     req.flash('success', { msg: 'Your tweet has been posted.' });
//     res.redirect('/api/twitter');
//   } catch (error) {
//     next(error);
//   }
// };


// /**
//  * GET /api/stripe
//  * Stripe API example.
//  */
// exports.getStripe = (req, res) => {
//   res.render('api/stripe', {
//     title: 'Stripe API',
//     publishableKey: process.env.STRIPE_PKEY
//   });
// };

// /**
//  * POST /api/stripe
//  * Make a payment.
//  */
// exports.postStripe = (req, res) => {
//   const { stripeToken, stripeEmail } = req.body;
//   stripe.charges.create({
//     amount: 395,
//     currency: 'usd',
//     source: stripeToken,
//     description: stripeEmail
//   }, (err) => {
//     if (err && err.type === 'StripeCardError') {
//       req.flash('errors', { msg: 'Your card has been declined.' });
//       return res.redirect('/api/stripe');
//     }
//     req.flash('success', { msg: 'Your card has been successfully charged.' });
//     res.redirect('/api/stripe');
//   });
// };

/**
 * GET /api/twilio
 * Twilio API example.
 */
exports.getTwilio = (req, res) => {
  res.render('api/twilio', {
    title: 'Twilio API'
  });
};

/**
 * POST /api/twilio
 * Send a text message using Twilio.
 */
exports.postTwilio = (req, res, next) => {
  const validationErrors = [];

  //For some reason the validator isEmpty functinon is not working correctly
  // if (validator.isEmpty(req.body.number)) validationErrors.push({ msg: 'Phone number is required.' });

  var pn = req.body.phone;

  if (!pn.trim()) {
    validationErrors.push({ msg: 'Phone number is required.' });
  }

  if (validationErrors.length) {
    req.flash('errors', validationErrors);

    var string = encodeURIComponent(validationErrors);
    res.redirect('/oops?error=' + string);
  }


  twilio.verify.services(process.env.TWILIO_VAID)
             .verifications
             .create({to: pn, channel: 'sms'})
             .then(res.redirect('/api/twilio-verify?phone=' + pn))
             .catch(err => console.log(err))

             
};

/**
 * GET /api/twilio-verify
 * Twilio Veridy
 */
 exports.getTwilioVerify = (req, res) => {
   var phone = req.query.phone;

  res.render('api/twilio-verify', {
    title: 'Twilio Verify',
    phone: phone
  });
};

/**
 * POST /api/twilio-verify
 * Twilio Verify
 */
 exports.postTwilioVerify = (req, res) => {
  const validationErrors = [];

  var phone = req.query.phone;
  var code = req.body.code;

  twilio.verify.services(process.env.TWILIO_VAID)
      .verificationChecks
      .create({to: '+' + phone, code: code})
      // .then(res.redirect('/account/dashboard'))
      .then((response) => {
        if (response.valid === true) {
        res.redirect('/account/dashboard');
        } else {
          validationErrors.push({ msg: 'Code is invalid. Please try again.' })
          req.flash('errors', validationErrors);
          res.redirect('/api/twilio-verify');
        }
    })
      .catch(err => console.log(err))
 };



// /**
//  * GET /api/upload
//  * File Upload API example.
//  */

// exports.getFileUpload = (req, res) => {
//   res.render('api/upload', {
//     title: 'File Upload'
//   });
// };

// exports.postFileUpload = (req, res) => {
//   req.flash('success', { msg: 'File was uploaded successfully.' });
//   res.redirect('/api/upload');
// };


// /**
//  * GET /api/googlemaps
//  * Google Maps
//  */

// exports.getGoogleMaps = (req, res) => {
//   res.render('api/google-maps', {
//     title: 'Google Maps API',
//     google_map_api_key: process.env.GOOGLE_MAP_API_KEY
//   });
// };

