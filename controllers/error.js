/**
 * GET /503
 * Error 503 page.
 */
 exports.get503 = (req, res) => {
    res.render('error/503', {
      title: '503'
    });
  };
  
