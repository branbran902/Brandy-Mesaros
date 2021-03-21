"use strict";

var _require = require('util'),
    promisify = _require.promisify;

var cheerio = require('cheerio');

var _require2 = require('lastfm'),
    LastFmNode = _require2.LastFmNode;

var tumblr = require('tumblr.js');

var _require3 = require('@octokit/rest'),
    Octokit = _require3.Octokit;

var Twitter = require('twitter-lite');

var stripe = require('stripe')(process.env.STRIPE_SKEY);

var twilio = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

var paypal = require('paypal-rest-sdk');

var crypto = require('crypto');

var lob = require('lob')(process.env.LOB_KEY);

var ig = require('instagram-node').instagram();

var axios = require('axios');

var _require4 = require('googleapis'),
    google = _require4.google;

var Quickbooks = require('node-quickbooks');

var validator = require('validator');

Quickbooks.setOauthVersion('2.0');
/**
 * GET /api
 * List of API examples.
 */

exports.getApi = function (req, res) {
  res.render('api/index', {
    title: 'API Examples'
  });
};
/**
 * GET /api/facebook
 * Facebook API example.
 */


exports.getFacebook = function (req, res, next) {
  var token = req.user.tokens.find(function (token) {
    return token.kind === 'facebook';
  });
  var secret = process.env.FACEBOOK_SECRET;
  var appsecretProof = crypto.createHmac('sha256', secret).update(token.accessToken).digest('hex');
  axios.get("https://graph.facebook.com/".concat(req.user.facebook, "?fields=id,name,email,first_name,last_name,gender,link,locale,timezone&access_token=").concat(token.accessToken, "&appsecret_proof=").concat(appsecretProof)).then(function (response) {
    res.render('api/facebook', {
      title: 'Facebook API',
      profile: response.data
    });
  })["catch"](function (error) {
    return next(error.response);
  });
};
/**
 * GET /api/scraping
 * Web scraping example using Cheerio library.
 */


exports.getScraping = function (req, res, next) {
  axios.get('https://news.ycombinator.com/').then(function (response) {
    var $ = cheerio.load(response.data);
    var links = [];
    $('.title a[href^="http"], a[href^="https"]').slice(1).each(function (index, element) {
      links.push($(element));
    });
    res.render('api/scraping', {
      title: 'Web Scraping',
      links: links
    });
  })["catch"](function (error) {
    return next(error);
  });
};
/**
 * GET /api/github
 * GitHub API Example.
 */


exports.getGithub = function _callee(req, res, next) {
  var github, _ref, repo;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          github = new Octokit();
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(github.repos.get({
            owner: 'sahat',
            repo: 'hackathon-starter'
          }));

        case 4:
          _ref = _context.sent;
          repo = _ref.data;
          res.render('api/github', {
            title: 'GitHub API',
            repo: repo
          });
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](1);
          next(_context.t0);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 9]]);
};

exports.getQuickbooks = function (req, res) {
  var token = req.user.tokens.find(function (token) {
    return token.kind === 'quickbooks';
  });
  var qbo = new Quickbooks(process.env.QUICKBOOKS_CLIENT_ID, process.env.QUICKBOOKS_CLIENT_SECRET, token.accessToken, false, req.user.quickbooks, true, false, null, '2.0', token.refreshToken);
  qbo.findCustomers(function (_, customers) {
    res.render('api/quickbooks', {
      title: 'Quickbooks API',
      customers: customers.QueryResponse.Customer
    });
  });
};
/**
 * GET /api/twitter
 * Twitter API example.
 */


exports.getTwitter = function _callee2(req, res, next) {
  var token, T, _ref2, tweets;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          token = req.user.tokens.find(function (token) {
            return token.kind === 'twitter';
          });
          T = new Twitter({
            consumer_key: process.env.TWITTER_KEY,
            consumer_secret: process.env.TWITTER_SECRET,
            access_token_key: token.accessToken,
            access_token_secret: token.tokenSecret
          });
          _context2.prev = 2;
          _context2.next = 5;
          return regeneratorRuntime.awrap(T.get('search/tweets', {
            q: 'nodejs since:2013-01-01',
            geocode: '40.71448,-74.00598,5mi',
            count: 10
          }));

        case 5:
          _ref2 = _context2.sent;
          tweets = _ref2.statuses;
          res.render('api/twitter', {
            title: 'Twitter API',
            tweets: tweets
          });
          _context2.next = 13;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](2);
          next(_context2.t0);

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[2, 10]]);
};
/**
 * POST /api/twitter
 * Post a tweet.
 */


exports.postTwitter = function _callee3(req, res, next) {
  var validationErrors, token, T;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          validationErrors = [];
          if (validator.isEmpty(req.body.tweet)) validationErrors.push({
            msg: 'Tweet cannot be empty'
          });

          if (!validationErrors.length) {
            _context3.next = 5;
            break;
          }

          req.flash('errors', validationErrors);
          return _context3.abrupt("return", res.redirect('/api/twitter'));

        case 5:
          token = req.user.tokens.find(function (token) {
            return token.kind === 'twitter';
          });
          T = new Twitter({
            consumer_key: process.env.TWITTER_KEY,
            consumer_secret: process.env.TWITTER_SECRET,
            access_token_key: token.accessToken,
            access_token_secret: token.tokenSecret
          });
          _context3.prev = 7;
          _context3.next = 10;
          return regeneratorRuntime.awrap(T.post('statuses/update', {
            status: req.body.tweet
          }));

        case 10:
          req.flash('success', {
            msg: 'Your tweet has been posted.'
          });
          res.redirect('/api/twitter');
          _context3.next = 17;
          break;

        case 14:
          _context3.prev = 14;
          _context3.t0 = _context3["catch"](7);
          next(_context3.t0);

        case 17:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[7, 14]]);
};
/**
 * GET /api/stripe
 * Stripe API example.
 */


exports.getStripe = function (req, res) {
  res.render('api/stripe', {
    title: 'Stripe API',
    publishableKey: process.env.STRIPE_PKEY
  });
};
/**
 * POST /api/stripe
 * Make a payment.
 */


exports.postStripe = function (req, res) {
  var _req$body = req.body,
      stripeToken = _req$body.stripeToken,
      stripeEmail = _req$body.stripeEmail;
  stripe.charges.create({
    amount: 395,
    currency: 'usd',
    source: stripeToken,
    description: stripeEmail
  }, function (err) {
    if (err && err.type === 'StripeCardError') {
      req.flash('errors', {
        msg: 'Your card has been declined.'
      });
      return res.redirect('/api/stripe');
    }

    req.flash('success', {
      msg: 'Your card has been successfully charged.'
    });
    res.redirect('/api/stripe');
  });
};
/**
 * GET /api/twilio
 * Twilio API example.
 */


exports.getTwilio = function (req, res) {
  res.render('api/twilio', {
    title: 'Twilio API'
  });
};
/**
 * POST /api/twilio
 * Send a text message using Twilio.
 */


exports.postTwilio = function (req, res, next) {
  var validationErrors = [];
  if (validator.isEmpty(req.body.number)) validationErrors.push({
    msg: 'Phone number is required.'
  });

  if (validationErrors.length) {
    req.flash('errors', validationErrors);
    return res.redirect('/error/oops');
  }

  var message = {
    to: req.body.number,
    from: '+13472235148',
    body: 'Hello'
  };
  twilio.messages.create(message).then(function (sentMessage) {
    req.flash('success', {
      msg: "Text send to ".concat(sentMessage.to)
    });
    res.redirect('/error/oops');
  })["catch"](next);
};
/**
 * GET /api/chart
 * Chart example.
 */


exports.getChart = function _callee4(req, res, next) {
  var url;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&outputsize=compact&apikey=".concat(process.env.ALPHA_VANTAGE_KEY);
          axios.get(url).then(function (response) {
            var arr = response.data['Time Series (Daily)'];
            var dates = [];
            var closing = []; // stock closing value

            var keys = Object.getOwnPropertyNames(arr);

            for (var i = 0; i < 100; i++) {
              dates.push(keys[i]);
              closing.push(arr[keys[i]]['4. close']);
            } // reverse so dates appear from left to right


            dates.reverse();
            closing.reverse();
            dates = JSON.stringify(dates);
            closing = JSON.stringify(closing);
            res.render('api/chart', {
              title: 'Chart',
              dates: dates,
              closing: closing
            });
          })["catch"](function (err) {
            next(err);
          });

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  });
};
/**
 * GET /api/instagram
 * Instagram API example.
 */


exports.getInstagram = function _callee5(req, res, next) {
  var token, userSelfMediaRecentAsync, myRecentMedia;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          token = req.user.tokens.find(function (token) {
            return token.kind === 'instagram';
          });
          ig.use({
            client_id: process.env.INSTAGRAM_ID,
            client_secret: process.env.INSTAGRAM_SECRET
          });
          ig.use({
            access_token: token.accessToken
          });
          _context5.prev = 3;
          userSelfMediaRecentAsync = promisify(ig.user_self_media_recent);
          _context5.next = 7;
          return regeneratorRuntime.awrap(userSelfMediaRecentAsync());

        case 7:
          myRecentMedia = _context5.sent;
          res.render('api/instagram', {
            title: 'Instagram API',
            myRecentMedia: myRecentMedia
          });
          _context5.next = 14;
          break;

        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](3);
          next(_context5.t0);

        case 14:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[3, 11]]);
};
/**
 * GET /api/lob
 * Lob API example.
 */


exports.getLob = function _callee6(req, res, next) {
  var recipientName, addressTo, addressFrom, lookupZip, createAndMailLetter, uspsLetter, zipDetails;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          if (req.user) {
            recipientName = req.user.profile.name;
          } else {
            recipientName = 'John Doe';
          }

          addressTo = {
            name: recipientName,
            address_line1: '123 Main Street',
            address_city: 'New York',
            address_state: 'NY',
            address_zip: '94107'
          };
          addressFrom = {
            name: 'Hackathon Starter',
            address_line1: '123 Test Street',
            address_line2: 'Unit 200',
            address_city: 'Chicago',
            address_state: 'IL',
            address_zip: '60012',
            address_country: 'US'
          };

          lookupZip = function lookupZip() {
            return lob.usZipLookups.lookup({
              zip_code: '94107'
            }).then(function (zipdetails) {
              return zipdetails;
            })["catch"](function (error) {
              return Promise.reject(new Error("Could not get zip code details: ".concat(error)));
            });
          };

          createAndMailLetter = function createAndMailLetter() {
            return lob.letters.create({
              description: 'My First Class Letter',
              to: addressTo,
              from: addressFrom,
              // file: minified version of https://github.com/lob/lob-node/blob/master/examples/html/letter.html with slight changes as an example
              file: "<html><head><meta charset=\"UTF-8\"><style>body{width:8.5in;height:11in;margin:0;padding:0}.page{page-break-after:always;position:relative;width:8.5in;height:11in}.page-content{position:absolute;width:8.125in;height:10.625in;left:1in;top:1in}.text{position:relative;left:20px;top:3in;width:6in;font-size:14px}</style></head>\n          <body><div class=\"page\"><div class=\"page-content\"><div class=\"text\">\n          Hello ".concat(addressTo.name, ", <p> We would like to welcome you to the community! Thanks for being a part of the team! <p><p> Cheer,<br>").concat(addressFrom.name, "\n          </div></div></div></body></html>"),
              color: false
            }).then(function (letter) {
              return letter;
            })["catch"](function (error) {
              return Promise.reject(new Error("Could not create and send letter: ".concat(error)));
            });
          };

          _context6.prev = 5;
          _context6.next = 8;
          return regeneratorRuntime.awrap(createAndMailLetter());

        case 8:
          uspsLetter = _context6.sent;
          _context6.next = 11;
          return regeneratorRuntime.awrap(lookupZip());

        case 11:
          zipDetails = _context6.sent;
          res.render('api/lob', {
            title: 'Lob API',
            zipDetails: zipDetails,
            uspsLetter: uspsLetter
          });
          _context6.next = 18;
          break;

        case 15:
          _context6.prev = 15;
          _context6.t0 = _context6["catch"](5);
          next(_context6.t0);

        case 18:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[5, 15]]);
};
/**
 * GET /api/upload
 * File Upload API example.
 */


exports.getFileUpload = function (req, res) {
  res.render('api/upload', {
    title: 'File Upload'
  });
};

exports.postFileUpload = function (req, res) {
  req.flash('success', {
    msg: 'File was uploaded successfully.'
  });
  res.redirect('/api/upload');
};

exports.getHereMaps = function (req, res) {
  var imageMapURL = "https://image.maps.api.here.com/mia/1.6/mapview?app_id=".concat(process.env.HERE_APP_ID, "&app_code=").concat(process.env.HERE_APP_CODE, "&poix0=47.6516216,-122.3498897;white;black;15;Fremont Troll&poix1=47.6123335,-122.3314332;white;black;15;Seattle Art Museum&poix2=47.6162956,-122.3555097;white;black;15;Olympic Sculpture Park&poix3=47.6205099,-122.3514661;white;black;15;Space Needle&c=47.6176371,-122.3344637&u=1500&vt=1&&z=13&h=500&w=800&");
  res.render('api/here-maps', {
    app_id: process.env.HERE_APP_ID,
    app_code: process.env.HERE_APP_CODE,
    title: 'Here Maps API',
    imageMapURL: imageMapURL
  });
};

exports.getGoogleMaps = function (req, res) {
  res.render('api/google-maps', {
    title: 'Google Maps API',
    google_map_api_key: process.env.GOOGLE_MAP_API_KEY
  });
};

exports.getGoogleDrive = function (req, res) {
  var token = req.user.tokens.find(function (token) {
    return token.kind === 'google';
  });
  var authObj = new google.auth.OAuth2({
    access_type: 'offline'
  });
  authObj.setCredentials({
    access_token: token.accessToken
  });
  var drive = google.drive({
    version: 'v3',
    auth: authObj
  });
  drive.files.list({
    fields: 'files(iconLink, webViewLink, name)'
  }, function (err, response) {
    if (err) return console.log("The API returned an error: ".concat(err));
    res.render('api/google-drive', {
      title: 'Google Drive API',
      files: response.data.files
    });
  });
};

exports.getGoogleSheets = function (req, res) {
  var token = req.user.tokens.find(function (token) {
    return token.kind === 'google';
  });
  var authObj = new google.auth.OAuth2({
    access_type: 'offline'
  });
  authObj.setCredentials({
    access_token: token.accessToken
  });
  var sheets = google.sheets({
    version: 'v4',
    auth: authObj
  });
  var url = 'https://docs.google.com/spreadsheets/d/12gm6fRAp0bC8TB2vh7sSPT3V75Ug99JaA9L0PqiWS2s/edit#gid=0';
  var re = /spreadsheets\/d\/([a-zA-Z0-9-_]+)/;
  var id = url.match(re)[1];
  sheets.spreadsheets.values.get({
    spreadsheetId: id,
    range: 'Class Data!A1:F'
  }, function (err, response) {
    if (err) return console.log("The API returned an error: ".concat(err));
    res.render('api/google-sheets', {
      title: 'Google Sheets API',
      values: response.data.values
    });
  });
};