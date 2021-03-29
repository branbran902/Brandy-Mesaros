const listing = require('../models/listing');

/**
 * GET NewListing
 * Gets new listing View
 */
 exports.getNewListing = (req, res) => {
    res.render('listing/newListingForm', {
      title: 'Create New Listing'
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