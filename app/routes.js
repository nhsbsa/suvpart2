// External dependencies
const express = require('express');

const router = express.Router();

// Add your routes here - above the module.exports line


  router.post('/note-pcn/', (req, res) => {
    // Make a variable and give it the value from 'message'(text area)
    const charNumber = req.session.data['message'];
    let charLength = charNumber.length;
    const maxLength = 2000;
    const minLength = 1;
  
    // Check whether the variable matches a condition
    if (charLength < minLength) {
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

  router.post('/note-easement/', (req, res) => {
    // Make a variable and give it the value from 'message'(text area)
    const charNumber = req.session.data['message'];
    let charLength = charNumber.length;
    const maxLength = 2000;
    const minLength = 1;
  
    // Check whether the variable matches a condition
    if(charLength < minLength ){
      res.redirect('remove-easement-error');

    }
    else if (charLength > maxLength) {
      // Send user to error page
      res.redirect('/remove-easement-char-error');
    } else {
      // Send user to normal page
      res.redirect('/css-pcn-view-extend-unlock');
    }
  });

  // pcn-payment.html in v3 folder - decide which page to direct to depending on the answer chosen
  router.post('/v3-george/pcn-payment', function(request, response) {

    var country = request.session.data['payment-method']
    if (country == "card"){
        response.redirect("pcn-payment-card")
    } else {
        response.redirect("pcn-payment-dd")
    }
})

// pay-pcn-extend.html in v3 folder - decide which page to direct to depending on the answer chosen
router.post('/v3-iona/pay-pcn-extend', function(request, response) {

  var country = request.session.data['example-inline']
  if (country == "yes"){
      response.redirect("pcn-payment-card")
  } else {
      response.redirect("pay-pcn-DD-start")
  }
})

module.exports = router;
