// Initialize Firebase
var config = {
    apiKey: "AIzaSyC9MDdcy45WokbyKUmzPf93RpeAcKaWcWo",
    authDomain: "medme-f87ee.firebaseapp.com", 
    authDomain: "http://kridlet.github.io/",
    databaseURL: "https://medme-f87ee.firebaseio.com",
    projectId: "medme-f87ee",
    storageBucket: "medme-f87ee.appspot.com",
    messagingSenderId: "658068228468"
};
firebase.initializeApp(config);

var database = firebase.database();
var auth = firebase.auth();

if (page !== "About") {
    $(".menu-about-link").html("<a href='#about'>ABOUT</a>");
}

$(document).ready(function () {
    // watch for login/logout events
    auth.onAuthStateChanged(function (user) {
        console.log(user);
        if (user) {
            // do things when logged in, like show the logout button and hide the login button
            console.log("I am: " + user.email);
            $(".menu-signinout-link").html("<a id='btn-sign-out'>SIGN OUT</a>");
            $(".menu-profile-link").html("<a href='myprofile.html'>MY PROFILE</a>");
        } else {
            // do things when logged out, like show the login button and hide the logout button
            console.log("I am: no one");
            $(".menu-signinout-link").html("<a href='signin.html'>SIGN IN</a>");
        }
    });
});

//auto complete states
$(function () {
    var availableStates = ["AK", "AL", "AR", "AZ", "CA", "CO", "CT", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY"];
    $("#state").autocomplete({
        source: availableStates
    });
});

function addDrug(drugName, drugDosage, drugFrequency, alertTime, drugDuration, lastDoseTime, RxCUI) {
    // add a new drug to the user
    database.ref('users/' + auth.currentUser.uid + '/rx').push().set({
        name: drugName,
        dosage: drugDosage,
        frequency: drugFrequency,
        alert: alertTime, // **********************  HOW IS IS PICKING UP the html??????????
        duration: drugDuration,
        lastDoseTime : lastDoseTime,
        RxCUI: RxCUI,
    });
    if (drugFrequency === "As Needed") {
        $(".alert-area").html("<div class='alert alert-success fade in alert-dismissible'><a href='#' class='close' data-dismiss='alert'>&times;</a>" + drugName + " was successfully added.</div>");
    }  
    
    else {
        $(".alert-area").html("<div class='alert alert-success fade in alert-dismissible'><a href='#' class='close' data-dismiss='alert'>&times;</a>" + drugName + " was successfully added. You will receive text messages to help you remember when to take your medicine.</div>");
    }
    }


function createAccountAndLogin(email, password, firstName, lastName, address, city, state, zip, phone, termsAccepted) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user){
        console.log('everything went fine');
        console.log('user object:' + user);
        database.ref('users/' + auth.currentUser.uid).set({
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            state: state,
            zip: zip,
            email: email,
            phone: phone,
            termsAccepted: Date.now(),
        });
        $(".alert-area").html("<div class='alert alert-success fade in alert-dismissible'><a href='#' class='close' data-dismiss='alert'>&times;</a>New user account successfully added.</div>");
        $(location).attr('href','myprofile.html');
    }).catch(function(error) {
        $(".alert-area").html("<div class='alert alert-danger fade in alert-dismissible'><a href='#' class='close' data-dismiss='alert'>&times;</a>" + error.message + "<br /><br />Try again or <a href='signin.html#signin' class='alert-link'>login with an existing account here</a></div>");
    });
}

// watch for add drug request
// $("#btn-add-drug").click(function () {
//     // get drug details from user input
//     var drugName = $("#drug-name").val();
//     var drugDosage = $("#drug-dosage").val();
//     var drugFrequency = $("#drug-frequency").val();
//     var RxCUI = $("#RxCUI").val();
//     // add the drug to the user's profile
//     addDrug(drugName, drugDosage, drugFrequency, RxCUI);
// });

//watch for profile submit, at which time we generate a credentialed account
$(document).on('submit', '#registration', function (event) {
    console.log("button");
    event.preventDefault();
    // get user details from user input
    var email = $("#email").val();
    var password = $("#password").val();
    var firstName = $("#first-name").val();
    var lastName = $("#last-name").val();
    var address = $("#address").val();
    var city = $("#city").val();
    var state = $("#state").val();
    var zip = $("#zip").val();
    var phone = $("#phone").val();
    var termsAccepted = $("#terms-accepted").val();
    // convert the anonymous account to a credentialed account and fill user profile with input data
    console.log(email, password, firstName, lastName, address, city, state, zip, phone, termsAccepted);
    createAccountAndLogin(email, password, firstName, lastName, address, city, state, zip, phone, termsAccepted);
});

// watch for logout
$(document).on('click', '#btn-sign-out', function (event) {
    // logout
    auth.signOut();
    $(location).attr('href','index.html');
});

// watch for sign in of existing credentialed user (for return to their profile)
$(document).on('submit', '#sign-in', function (event) {
    event.preventDefault();
    // get credentials from user input
    var email = $("#login-email").val();
    var password = $("#login-password").val();
    // log the user in
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function() {
            $(location).attr('href','myprofile.html');
        })
        .catch(function (error) {
            // Handle Errors here.
            $(".alert-area").html("<div class='alert alert-danger fade in alert-dismissible'><a href='#' class='close' data-dismiss='alert'>&times;</a>" + error.message + "<br />Try again or <a href='reset.html' class='alert-link'>reset your password</a></div>");
        });
});

$(document).on('click', '.btn-remove-drug', function (event) {
    event.preventDefault();
    $("#drug-table").html("");
    deleteRef = database.ref('users/' + auth.currentUser.uid + '/rx/' + $(this).attr("id"));
    deleteRef.remove();
});

$(document).on('click', '#btn-list-drug-interaction', function (event) {
    event.preventDefault();

    // Loop through users in order with the forEach() method. The callback
    // provided to forEach() will be called synchronously with a DataSnapshot
    // for each child:
    var query = database.ref('users/' + auth.currentUser.uid + '/rx').orderByKey();
    query.once("value")
        .then(function (snapshot) {
            // initialize a blank drug array
            var drugRxCUIs = '';
            snapshot.forEach(function (childSnapshot) {
                // childData is the actual contents of the child
                var childData = childSnapshot.val();
                // add the drug ID to drug array
                drugRxCUIs += childData.RxCUI + '+';
            });
            // go get the interactions from NIH 
            $.ajax({
                url: 'https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=' + drugRxCUIs,
                success: function (data) {
                    console.info(data);
                    var interactions = "";
                    $(".alert-area").html("");
                    var html = "<div class='alert alert-warning fade in alert-dismissible'><a href='#' class='close' data-dismiss='alert'>&times;</a>";
                    // loop through interaction type groups - this is specific to the data format of the NIH API response
                    for (i = 0; i < data.fullInteractionTypeGroup.length; i++) {
                        // loop through interaction types - this is specific to the data format of the NIH API response
                        for (j = 0; j < data.fullInteractionTypeGroup[i].fullInteractionType.length; j++) {
                            console.log(data.fullInteractionTypeGroup[i].fullInteractionType[j].interactionPair[0].description);
                            console.log(data.fullInteractionTypeGroup[i].fullInteractionType[j].interactionPair[0].severity);
                            interactions += interactions + '<br /> <br />' + data.fullInteractionTypeGroup[i].fullInteractionType[j].interactionPair[0].description;
                            html += data.fullInteractionTypeGroup[i].fullInteractionType[j].interactionPair[0].description + "<br>";
                        }
                    }
                    $(".alert-area").append(html+"</div>");
                }
            });
        });
});