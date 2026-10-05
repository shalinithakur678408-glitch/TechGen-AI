const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const serviceAccount = {
  project_id: process.env.PROJECT_ID,
  client_email: process.env.CLIENT_EMAIL,
  private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
};

const firebaseApp = initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore(firebaseApp);

module.exports = db;