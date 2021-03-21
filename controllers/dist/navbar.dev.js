"use strict";

/**
 * GET /about
 * About page.
 */
exports.getAbout = function (req, res) {
  res.render('navbar/about', {
    title: 'About'
  });
};


/**
 * GET /why-host
 * About page.
 */
exports.getWhyHost = function (req, res) {
  res.render('navbar/whyhost', {
    title: 'Why Host?'
  });
};