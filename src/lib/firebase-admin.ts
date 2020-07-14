import admin from 'firebase-admin'

export default function getDb() {
  try {
    return admin.firestore()
  } catch {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/gm, '\n'),
      }),
      databaseURL: 'https://proginth.firebaseio.com',
    })
    return admin.firestore()
  }
}
