// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
const { logger } = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const { initializeApp } = require("firebase-admin/app");
//const { getFirestore } = require("firebase-admin/firestore");

const functions = require("firebase-functions");
//const admin = require("firebase-admin");

exports.printToLog = functions.pubsub.schedule("* * * * *").onRun(() => {
  console.log("Prints every minute")
})

initializeApp();
 