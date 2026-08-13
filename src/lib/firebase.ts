import { initializeApp } from "firebase/app";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentSingleTabManager,
  getFirestore,
} from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";
import firebaseConfig from "../../firebase-applet-config.json";

// Initialize Firebase App
export const app = initializeApp(firebaseConfig);

const dbName =
  firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== ""
    ? firebaseConfig.firestoreDatabaseId
    : "(default)";

// Initialize Firestore with persistent local cache for robust offline resilience
let dbInstance;
try {
  dbInstance = initializeFirestore(
    app,
    {
      localCache: persistentLocalCache({
        tabManager: persistentSingleTabManager({}),
      }),
    },
    dbName
  );
} catch (e) {
  dbInstance = getFirestore(app, dbName);
}

export const db = dbInstance;

// Initialize Analytics if supported in the browser environment
export const analyticsPromise = isSupported().then((supported) =>
  supported ? getAnalytics(app) : null
);


