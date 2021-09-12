const functions = require("firebase-functions");
// require("firebase/functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const usda = require("usda-ingredients-api");
// const results = usda("815893000163");
let returning;

exports.sayHello = functions.https.onCall((data, context) => {
  const barcode = data.barcode;
  const answer = usda(barcode);
  answer.then(function(result) {
    returning = result; // .nutrientNumber)
  });
  return returning;
});
