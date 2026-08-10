import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";
import firebaseConfig from "../../firebase-applet-config.json";

// Initialize Firebase App
export const app = initializeApp(firebaseConfig);

// Initialize Firestore targeting custom databaseId if configured
export const db = getFirestore(
  app,
  firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== ""
    ? firebaseConfig.firestoreDatabaseId
    : "(default)"
);

// Initialize Analytics if supported in the browser environment
export const analyticsPromise = isSupported().then((supported) =>
  supported ? getAnalytics(app) : null
);

