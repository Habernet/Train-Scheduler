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

  // Clear text boxes
  $("#name-input").val("");
  $("#destination-input").val("");
  $("#first-input").val("");
  $("#frequency-input").val("");

})




// Display that information back onto the page.
database.ref().on("child_added", function (childsnapshot) {
  // Take the snapshot and push the information onto the DOM.
  var snap = childsnapshot.val();

  // Variables to store info from the child snapshot.
  var trainName = snap.name;
  var trainDestination = snap.destination;
  var trainFrequency = snap.frequency;
  var trainFirst = snap.firstTrain;

  //Create a table row. Create table data corresponding to the name, destination, first, and frequency.
  var row = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFirst),
    $("<td>").text(trainFrequency)
  );

  //Append the row onto the train schedule div.
  $("#train-table").append(row);

  // WHY DOES THIS CREATE AN EMPTY ROW? WHEN YOU REFRESH IT GOES AWAY
})