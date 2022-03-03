// External dependencies
const express = require('express');

const router = express.Router();

// Add your routes here - above the module.exports line


router.post('/app/views/note-pcn-info', (req, res) => {
    // Make a variable and give it the value from 'message'(text area)
    const charNumber = req.session.data['message'];
    let charLength = charNumber.length;
    const maxLength = 2048;
  
    // Check whether the variable matches a condition
    if (charLength > maxLength) {
      // Send user to error page
      res.redirect('/app/views/note-pcn-error');
    } else {
      // Send user to normal page
      res.redirect('/app/views/css-pcn-view-note');
    }
  });

module.exports = router;
