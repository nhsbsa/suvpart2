// External dependencies
const express = require('express');

const router = express.Router();

// Add your routes here - above the module.exports line


  router.post('/note-pcn/', (req, res) => {
    // Make a variable and give it the value from 'message'(text area)
    const charNumber = req.session.data['message'];
    let charLength = charNumber.length;
    const maxLength = 2000;
  
    // Check whether the variable matches a condition
    if (charLength > maxLength) {
      // Send user to error page
      res.redirect('/note-pcn-error');
    } else {
      // Send user to normal page
      res.redirect('/css-pcn-view-note');
    }
  });

  router.post('/note-pcn-extend/', (req, res) => {
    // Make a variable and give it the value from 'message'(text area)
    const charNumber = req.session.data['message'];
    let charLength = charNumber.length;
    const maxLength = 2000;
  
    // Check whether the variable matches a condition
    if (charLength > maxLength) {
      // Send user to error page
      res.redirect('/note-pcn-error');
    } else {
      // Send user to normal page
      res.redirect('/css-pcn-view-extend-unlock');
    }
  });

module.exports = router;
