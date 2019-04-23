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
  database.ref("trains/").push({
    name: name,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
  });

  // Clear text boxes
  $("#name-input").val("");
  $("#destination-input").val("");
  $("#first-input").val("");
  $("#frequency-input").val("");
})




// Display that information back onto the page.
database.ref("trains/").on("child_added", function (childsnapshot) {
  // Take the snapshot and push the information onto the DOM.
  var snap = childsnapshot.val();

  // Variables to store info from the child snapshot.
  var trainName = snap.name;
  var trainDestination = snap.destination;
  var trainFrequency = snap.frequency;
  var trainFirst = snap.firstTrain;
  // var nextArrival = calculations;
  // moment.js to find the next arrival
  // var minsaway = calculations;
  //Calculate mins away so it can be updated to the page as well


  //Create a table row. Create table data corresponding to the name, destination, first, and frequency.
  var row = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFirst),
    $("<td>").text(trainFrequency)
    // $("<td>").text(minsAway)
  );

  //Append the row onto the train schedule div.
  $("#train-table > tbody").append(row);

}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});


// WHY DOES THIS CREATE AN EMPTY ROW? WHEN YOU REFRESH IT GOES AWAY

  // TO DO LIST
  // 1. User input control for train frequency
  // 2. Calculate minsAway and update it on the page...moment.js
  // 3. 