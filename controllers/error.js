/**
 * GET /503
 * Error 503 page.
 */
 exports.get503 = (req, res) => {
    res.render('error/503', {
      title: '503'
    });
  };


/**
 * GET /oops
 * General Error page.
 */
 exports.getOops = (req, res) => {
  res.render('error/oops', {
    title: 'OOPS'
  });
};

  
