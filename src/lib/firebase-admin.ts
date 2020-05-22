import admin from 'firebase-admin'

let firestore: FirebaseFirestore.Firestore = null

export default function getDb() {
  if (firestore === null) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/gm, '\n'),
      }),
      databaseURL: 'https://proginth.firebaseio.com',
    })

    firestore = admin.firestore()
  }

  return firestore
}
