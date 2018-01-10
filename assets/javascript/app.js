// Initialize Firebase
var config = {
    apiKey: "AIzaSyDijFIuerjSpGHedmrt6wncFgjw4jbKMas",
    authDomain: "test-project-88293.firebaseapp.com",
    databaseURL: "https://test-project-88293.firebaseio.com",
    projectId: "test-project-88293",
    storageBucket: "test-project-88293.appspot.com",
    messagingSenderId: "658311507950"
};

firebase.initializeApp(config);

// Variable to reference firebase data 
var trainData = firebase.database();

// Collect and store data from submitted form
$("#addTrainBtn").on("click", function() {
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
    var frequency = $("#frequencyInput").val().trim();

    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    }

    trainData.ref().push(newTrain);

    alert("Train Added!");

    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");

    return false;
})

// Collect and store data from Firebase
trainData.ref().on("child_added", function(snapshot) {
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var firstTrain = snapshot.val().firstTrain;
    var frequency = snapshot.val().frequency;

    var remainder = moment().diff(moment.unix(firstTrain), "minutes") % frequency;
    var minutes = frequency - remainder;
    var arrival = moment().add(minutes, "m").format("hh:mm A");

    console.log(remainder);
    console.log(minutes);
    console.log(arrival);

// Appending new data to html
    $("#trainTable > tBody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrival + "</td><td>" + minutes + "</td><td>");

})