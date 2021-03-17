/**
 * GET /about
 * About page.
 */
 exports.getAbout = (req, res) => {
    res.render('navbar/about', {
      title: 'About'
    });
  };
  
/**
 * GET /why-host
 * About page.
 */
 exports.getWhyHost = (req, res) => {
    res.render('navbar/whyhost', {
      title: 'Why Host?'
    });
  };
  