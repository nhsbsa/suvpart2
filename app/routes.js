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

  // George v3 Routes

  // css-payment.html - decide which page to direct to depending on the answer chosen
  router.post('/v3-george/css-payment', function(request, response) {

    var method = request.session.data['payment-method']
    if (method == "card"){
        response.redirect("css-payment-card")
    } else {
        response.redirect("css-payment-dd")
    }
})

  // css-payment-dd.html - show error page if bottom checkbox not checked, else redirect to next page

  router.post('/v3-george/css-payment-dd-months', function(request, response) {
      var confirm = request.session.data['confirm'];

      if (confirm.includes('bank') && confirm.includes('person') && confirm.includes('understand')){
        response.redirect("css-payment-dd-months")
      } else {
        response.redirect("css-payment-dd-error")
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

// pay-pcn-DD-address.html in v3 folder - decide which page to direct to depending on the answer chosen
router.post('/v3-iona/pay-pcn-DD-address', function(request, response) {

  var country = request.session.data['address']
  if (country == "yes"){
      response.redirect("pay-pcn-DD-check-answers")
  } else {
      response.redirect("pay-pcn-DD-address-change")
  }
})

// pay-pcn-DD-complete-radios.html in v3 folder - decide which page to direct to depending on the answer chosen
router.post('/v3-iona/pay-pcn-DD-complete-radios', function(request, response) {

  var country = request.session.data['contact']
  if (country == "no"){
      response.redirect("pcn-css-view")
  } else {
      response.redirect("pay-pcn-DD-complete-enter-email")
  }
})

module.exports = router;
