"use strict";

/**
 * GET /503
 * Error 503 page.
 */
exports.get503 = function (req, res) {
  res.render('error/503', {
    title: '503'
  });
};