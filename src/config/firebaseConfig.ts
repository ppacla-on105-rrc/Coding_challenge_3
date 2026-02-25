import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";


initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});

export const db = getFirestore();