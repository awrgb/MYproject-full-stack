import { apps, initializeApp, credential as _credential, firestore } from 'firebase-admin';

if (!apps.length) {
  const { FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY, FIREBASE_PROJECT_ID, FIREBASE_DATABASE_URL } = process.env;

  if (!FIREBASE_CLIENT_EMAIL || !FIREBASE_PROJECT_ID || !FIREBASE_DATABASE_URL) {
    throw new Error('Missing one or more required Firebase environment variables.');
  }    

  initializeApp({
    credential: _credential.cert({
      client_email: FIREBASE_CLIENT_EMAIL,
      private_key: FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      project_id: FIREBASE_PROJECT_ID,
    }),
    databaseURL: FIREBASE_DATABASE_URL,
  });
}

export default firestore();
