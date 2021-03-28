const axios = require('axios');
const validator = require('validator');
/**
 * GET /contact
 * Contact form page.
 */
exports.getContact = (req, res) => {
  const unknownUser = !(req.user);

  res.render('contact', {
    title: 'Contact',
    sitekey: process.env.RECAPTCHA_SITE_KEY,
    unknownUser,
  });
};


