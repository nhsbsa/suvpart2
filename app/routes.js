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
    if (method === "card"){
      response.redirect("css-payment-card")
    } else if (method === "dd") {
        response.redirect("css-payment-dd")
    } else {
      response.redirect("css-payment-error")
      console.log(method)
    }
  })
  router.post('/v3-george/css-payment-error', function(request, response) {
    var method = request.session.data['payment-method-error']
    if (method === "card"){
      response.redirect("css-payment-card")
    } else if (method === "dd") {
        response.redirect("css-payment-dd")
    } else {
      response.redirect("css-payment-error")

    }
  })

  // css-payment-dd.html - show error page if bottom checkbox not checked, else redirect to next page
  router.post('/v3-george/css-payment-dd-months', function(request, response) {
      let confirm = request.session.data['confirm'] || "noneChecked";

      if (confirm.includes('understand')){
        response.redirect("css-payment-dd-months")
      } else if (confirm === "noneChecked" ) {
        response.redirect("css-payment-dd-error");
        console.log("confirm contains: " + confirm);
      } else {
        response.redirect("css-payment-dd-error");
        console.log("confirm contains: " + confirm);
      }
  })

  // css-payment-dd-months.html - show errror page if none of the radios are selected
  router.post('/v3-george/css-payment-dd-date', function(request, response) {
    var months = request.session.data['dd-months']
    if (months === "three"){
      response.redirect("css-payment-dd-date")
    } else if (months === "six") {
      response.redirect("css-payment-dd-date")
    } else if (months === "twelve") {
      response.redirect("css-payment-dd-date")
    } else {
      response.redirect("css-payment-dd-months-error")
    }
  })

  // css-payment-dd-date.html - show errror page if date entered is blank, zero, or greater than 28
  router.post('/v3-george/css-payment-dd-address', function(request, response) {
    var date = request.session.data['date']
    if (date >= 1 && date <= 28){
      response.redirect("css-payment-dd-address")
    } else if (date === 0) {
      response.redirect("css-payment-dd-date-error")
    } else if (date === "undefined") {
      response.redirect("css-payment-dd-date-error")
    } else {
      response.redirect("css-payment-dd-date-error")
    }
  })

  // css-payment-dd-address.html - show errror page if none of the radios are selected, if yes show email address page, if no show address update page
  router.post('/v3-george/css-payment-dd-email', function(request, response) {
    var addressCorrect = request.session.data['address-correct']
    if (addressCorrect === "yes"){
      response.redirect("css-payment-dd-bank-details")
    } else if (addressCorrect === "no") {
      response.redirect("css-payment-dd-address-update")
    } else if (addressCorrect === "undefined") {
      response.redirect("css-payment-dd-address-error")
    } else {
      response.redirect("css-payment-dd-address-error")
    }
  })

  // css-payment-dd-address-update.html - show errror page required fields are empty, else show email addrress page
  router.post('/v3-george/css-payment-dd-email-address-update', function(request, response) {
    var addressOne = request.session.data['address-one']
    var addressTown = request.session.data['address-town']
    var addressPostcode = request.session.data['address-postcode']

    // checking that the required fields aren't empty, if they are show error page
    if (addressOne === "" || addressTown === "" || addressPostcode === ""){
      response.redirect("css-payment-dd-address-update-error")
    } else {
      response.redirect("css-payment-dd-bank-details")
    }
  })

  // css-payment-dd-email.html - show bank details if empty, else show email confirmation page
  router.post('/v3-george/css-payment-dd-email-confirm', function(request, response) {
    var email = request.session.data['email-address']

    // checking that the required fields aren't empty, if they are show error page
    if (email === ""){
      response.redirect("css-payment-dd-bank-details")
    } else {
      response.redirect("css-payment-dd-email-confirm")
    }
  })

  // css-payment-dd-email-confirm.html - show bank details if emails match, else show error page
  router.post('/v3-george/css-payment-dd-bank-details', function(request, response) {
    var email = request.session.data['email-address']
    var emailConfirm = request.session.data['email-address-confirm']

    // checking that the email address matches the confirm email address field exactly - if it does show bank details page
    if (email === emailConfirm){
      response.redirect("css-payment-dd-bank-details")
    } else {
      response.redirect("css-payment-dd-email-confirm-error")
    }
  })

  // css-payment-dd-bank-details.html - show check your answer if fields are filled, else show error page
  router.post('/v3-george/css-payment-dd-bank-details', function(request, response) {
    var accountName = request.session.data['bank-name']
    var accountNumber = request.session.data['bank-account']
    var sortOne = request.session.data['bank-sort-one']
    var sortTwo = request.session.data['bank-sort-one']
    var sortThree = request.session.data['bank-sort-one']

    // checking that the required fields aren't empty, if they are show error page
    if (accountName === "" || accountNumber === "" || sortOne === "" || sortTwo === "" || sortThree === ""){
      response.redirect("css-payment-dd-bank-details-error")
    } else {
      response.redirect("css-payment-dd-check-answers")
    }
  })

// Iona v3 Routes
// pay-pcn-extend.html in v3 folder - decide which page to direct to depending on the answer chosen
router.post('/v3-iona/pay-pcn-extend', function(request, response) {

  var country = request.session.data['example-inline']
  if (country == "yes"){
      response.redirect("pcn-payment-card")
  } else {
      response.redirect("pay-pcn-DD-start")
  }
})

// pay-pcn-dd-address.html in v3 folder - decide which page to direct to depending on the answer chosen
router.post('/v3-iona/pay-pcn-dd-address', function(request, response) {

  var country = request.session.data['address']
  if (country == "yes"){
      response.redirect("pay-pcn-dd-check-answers")
  } else {
      response.redirect("pay-pcn-dd-address-change")
  }
})

// pay-pcn-dd-complete-radios.html in v3 folder - decide which page to direct to depending on the answer chosen
router.post('/v3-iona/pay-pcn-dd-complete-radios', function(request, response) {

  var country = request.session.data['contact']
  if (country == "no"){
      response.redirect("pcn-css-view")
  } else {
      response.redirect("pay-pcn-dd-complete-enter-email")
  }
})

// cannot-pay-by-dd.html in v3 folder - decide which page to direct to depending on the answer chosen
router.post('/v3-iona/cannot-pay-by-dd', function(request, response) {

  var country = request.session.data['example-inline']
  if (country == "yes"){
      response.redirect("pcn-payment-card")
  } else {
      response.redirect("pcn-css-view")
  }
})

// V3-mvp Routes
// pay-pcn-extend.html in v3 folder - decide which page to direct to depending on the answer chosen
router.post('/v3-mvp/pay-pcn-extend', function(request, response) {

  var country = request.session.data['example-inline']
  if (country == "yes"){
      response.redirect("pcn-payment-card")
  } else {
      response.redirect("pay-pcn-dd-start")
  }
})

// pay-pcn-dd-address.html in v3 folder - decide which page to direct to depending on the answer chosen
router.post('/v3-mvp/pay-pcn-dd-address', function(request, response) {

  var country = request.session.data['address']
  if (country == "yes"){
      response.redirect("pay-pcn-dd-check-answers")
  } else {
      response.redirect("pay-pcn-dd-address-change")
  }
})

// V3 Routes
// add-payment.html in v3 folder - decide which page to direct to depending on the answer chosen
router.post('/v3/add-payment', function(request, response) {

  var payment = request.session.data['payment']
  if (payment == "card"){
      response.redirect("card-payment")
  } else {
      response.redirect("/v3/direct-debit/start")
  }
})

// direct-debit/address.html in v3 folder - decide which page to direct to depending on the answer chosen
router.post('/v3/direct-debit/address', function(request, response) {

  var addressCorrect = request.session.data['address']
  if (addressCorrect == "yes"){
      response.redirect("/v3/direct-debit/check-answers")
  } else {
      response.redirect("/v3/direct-debit/change-address")
  }
})

 // bank-details.html in v3 folder - if user inputs incorrect sort code, will be directed to cannot-verify-details
 router.post('/v3/direct-debit/bank-details', function(request, response) {
    var sortOne = request.session.data['sort-one']
    var sortTwo = request.session.data['sort-two']
    var sortThree = request.session.data['sort-three']
 if (sortOne === "40" && sortTwo === "00" && sortThree === "40"){
  response.redirect("/v3/direct-debit/cannot-verify-details")
} else {
  response.redirect("/v3/direct-debit/confirm")
}
})

// V4 Routes
// direct-debit/address.html in v4 folder - decide which page to direct to depending on the answer chosen
router.post('/v4/direct-debit/address', function(request, response) {

  var addressCorrect = request.session.data['address']
  if (addressCorrect == "yes"){
      response.redirect("/v4/direct-debit/check-answers")
  } else {
      response.redirect("/v4/direct-debit/change-address")
  }
})

// bank-details.html in v4 folder - if user inputs incorrect sort code, will be directed to cannot-verify-details
router.post('/v4/direct-debit/bank-details', function(request, response) {
  var sortOne = request.session.data['sort-one']
  var sortTwo = request.session.data['sort-two']
  var sortThree = request.session.data['sort-three']
if (sortOne === "40" && sortTwo === "00" && sortThree === "40"){
response.redirect("/v4/direct-debit/cannot-verify-details")
} else {
response.redirect("/v4/direct-debit/confirm")
}
})


// V5 Routes

// Option 1
router.post('/v5/option-one/address', function(request, response) {

  var addressCorrect = request.session.data['address']
  if (addressCorrect == "yes"){
      response.redirect("/v5/option-one/check-answers")
  } else {
      response.redirect("/v5/option-one/change-address")
  }
})

router.post('/v5/option-one/bank-details', function(request, response) {
  var sortOne = request.session.data['sort-one']
  var sortTwo = request.session.data['sort-two']
  var sortThree = request.session.data['sort-three']
if (sortOne === "40" && sortTwo === "00" && sortThree === "40"){
response.redirect("/v5/option-two/cannot-verify-details")
} else {
response.redirect("/v5/option-two/confirm")
}
})

// Option 2
router.post('/v5/option-two/address', function(request, response) {

  var addressCorrect = request.session.data['address']
  if (addressCorrect == "yes"){
      response.redirect("/v5/option-two/check-answers")
  } else {
      response.redirect("/v5/option-two/change-address")
  }
})

router.post('/v5/option-two/bank-details', function(request, response) {
  var sortOne = request.session.data['sort-one']
  var sortTwo = request.session.data['sort-two']
  var sortThree = request.session.data['sort-three']
if (sortOne === "40" && sortTwo === "00" && sortThree === "40"){
response.redirect("/v5/option-two/cannot-verify-details")
} else {
response.redirect("/v5/option-two/confirm")
}
})

// Option 2.1
router.post('/v5/option-two-one/address', function(request, response) {

  var addressCorrect = request.session.data['address']
  if (addressCorrect == "yes"){
      response.redirect("/v5/option-two-one/check-answers")
  } else {
      response.redirect("/v5/option-two-one/change-address")
  }
})

router.post('/v5/option-two-one/bank-details', function(request, response) {
  var sortOne = request.session.data['sort-one']
  var sortTwo = request.session.data['sort-two']
  var sortThree = request.session.data['sort-three']
if (sortOne === "40" && sortTwo === "00" && sortThree === "40"){
response.redirect("/v5/option-two-one/cannot-verify-details")
} else {
response.redirect("/v5/option-two-one/confirm")
}
})

// Option 3
router.post('/v5/option-three/address', function(request, response) {

  var addressCorrect = request.session.data['address']
  if (addressCorrect == "yes"){
      response.redirect("/v5/option-three/check-answers")
  } else {
      response.redirect("/v5/option-three/change-address")
  }
})

router.post('/v5/option-three/bank-details', function(request, response) {
  var sortOne = request.session.data['sort-one']
  var sortTwo = request.session.data['sort-two']
  var sortThree = request.session.data['sort-three']
if (sortOne === "40" && sortTwo === "00" && sortThree === "40"){
response.redirect("/v5/option-three/cannot-verify-details")
} else {
response.redirect("/v5/option-three/confirm")
}
})

// Option 4
router.post('/v5/option-four/address', function(request, response) {

  var addressCorrect = request.session.data['address']
  if (addressCorrect == "yes"){
      response.redirect("/v5/option-four/check-answers")
  } else {
      response.redirect("/v5/option-four/change-address")
  }
})

router.post('/v5/option-four/bank-details', function(request, response) {
  var sortOne = request.session.data['sort-one']
  var sortTwo = request.session.data['sort-two']
  var sortThree = request.session.data['sort-three']
if (sortOne === "40" && sortTwo === "00" && sortThree === "40"){
response.redirect("/v5/option-four/cannot-verify-details")
} else {
response.redirect("/v5/option-four/confirm")
}
})

// PECS WEB INTEGRATION Routes
// pecs-web/random-sample.html - decide which page to direct to depending on the radio answer selected
router.post('/pecs-web/random-sample', function(request, response) {

  var detailsCorrect = request.session.data['correct']
  if (detailsCorrect == "yes"){
      response.redirect("/pecs-web/random-sample-2")
  } else {
      response.redirect("/pecs-web/random-sample-edit")
  }
})

// pecs-web/random-sample-2.html - decide which page to direct to depending on the radio answer selected
router.post('/pecs-web/random-sample-2', function(request, response) {

  var detailsCorrect = request.session.data['correct']
  if (detailsCorrect == "yes"){
      response.redirect("/pecs-web/random-sample-2")
  } else {
      response.redirect("/pecs-web/random-sample-edit")
  }
})

// pecs-web/random-sample-back.html - decide which page to direct to depending on the radio answer selected
router.post('/pecs-web/random-sample-back', function(request, response) {

  var detailsCorrect = request.session.data['correct']
  if (detailsCorrect == "yes"){
      response.redirect("/pecs-web/random-sample-2")
  } else {
      response.redirect("/pecs-web/random-sample-edit")
  }
})

// pecs-web/random-sample-2-back.html - decide which page to direct to depending on the radio answer selected
router.post('/pecs-web/random-sample-2-back', function(request, response) {

  var detailsCorrect = request.session.data['correct']
  if (detailsCorrect == "yes"){
      response.redirect("/pecs-web/random-sample-2")
  } else {
      response.redirect("/pecs-web/random-sample-edit")
  }
})

module.exports = router;
