// Initialize Firebase
var config = {
    apiKey: "AIzaSyAEeCpHM-BdMVxbbEuL7ER6GeHLVrbbL3g",
    authDomain: "train-scheduler-8a4e8.firebaseapp.com",
    databaseURL: "https://train-scheduler-8a4e8.firebaseio.com",
    projectId: "train-scheduler-8a4e8",
    storageBucket: "train-scheduler-8a4e8.appspot.com",
    messagingSenderId: "65351513165"
  };
  firebase.initializeApp(config);

  //Reference to Firebase.database
  var database = firebase.database();

  // Define on click event for the new train button.
  $("#add").on("click", function () {
    // grab data from the following forms
    // name destination first and frequency
    var name = $("#name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = $("#first-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    // You will now push these to firebase
    database.ref().push({
      name: name,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency
    })
  })

  // Display that information back onto the page
  