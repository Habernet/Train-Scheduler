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
$("#add").on("click", () => {
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

database.ref("trains/").on("child_added", (childsnapshot) => {
  // Take the snapshot and push the information onto the DOM.
  var snap = childsnapshot.val();
  
  // Variables to store info from the child snapshot.
  var trainName = snap.name;
  var trainDestination = snap.destination;
  var trainFrequency = snap.frequency;
  
  // Take off a year so that it happens in the past?
  var firstTrainNewYear = moment(snap.firstTrain, "hh:mm").subtract(1, "years");
  
  // Difference between now and  firstTrain
  var timeDiff = moment().diff(moment(firstTrainNewYear), "minutes")
  var remainderTime = timeDiff % snap.frequency;

  // Calculate minutes until next train arrives
  var minsUntilNext = snap.frequency - remainderTime;

  // Calculate next train arrival based on the above
  var nextArrival = moment().add(minsUntilNext, "minutes");
  nextArrival = moment(nextArrival).format("hh:mm");

  //Create a table row. Create table data corresponding to the name, destination, first, and frequency.
  var row = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(nextArrival),
    $("<td>").text(minsUntilNext)
  );

  //Append the row onto the train schedule div.
  $("#train-table > tbody").append(row);

}, function (errorObject) {
  console.log("Errors handled: " + errorObject.code);
});

  // TO DO LIST
  // 1. User input control for train frequency
  // 2. README! Needs work!