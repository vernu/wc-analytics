let admin = require('firebase-admin')

let serviceAccount = require('./firebase-service-account.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

export const firebaseAdmin = admin
