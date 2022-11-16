import { getFirestore } from "firebase/firestore";
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebaseConfig from "../config/firebaseconfig";

let app;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
}else{
    app = getApps()[0]
}


export const auth = getAuth(app);
export const fireStoreApp = getFirestore(app);
export default app;
