const { listing } = require('../models/listing')

/**
 * GET new-listing
 * Gets create listing View
 */
 exports.getNewListing = (req, res) => {
    res.render('listing/newListingForm', {
      title: 'Create New Listing'
    });
  };

  /**
 * POST /new-listing
 * Create a new listing
 */
exports.postNewListing = (req, res, next) => {
  // const validationErrors = [];
  // if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' });
  // if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' });

  // if (validationErrors.length) {
  //   req.flash('errors', validationErrors);
  //   return res.redirect('/signup');
  // }
  // req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });

  const aListing = listing.build({
    title: req.body.title,
    location: req.body.location,
    typeOfBed: req.body.typeOfBed,
    about: req.body.desc,
    propertyType: req.body.type
  });
  
  console.log(aListing);

  aListing.save()
  .then(user => {return res.render('account/dashboard'); })
  .catch(err => console.log(err));
};

  
/**
 * GET /account
 * Profile page.
 */
exports.getAccount = (req, res) => {
  res.render('account/profile', {
    title: 'Account Management'
  });
};


  /**
 * GET listingByID
 * Gets new listing View
 */
 exports.getListingById = (req, res) => {
  res.render('listing/listing', {
    title: 'listing'
  });
};