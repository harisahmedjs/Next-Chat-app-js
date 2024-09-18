import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBx5fcH-gGFh2BZsndQ_dPsW0bZ0nBT9wA",
  authDomain: "chatapp-d3d8d.firebaseapp.com",
  projectId: "chatapp-d3d8d",
  storageBucket: "chatapp-d3d8d.appspot.com",
  messagingSenderId: "831751785313",
  appId: "1:831751785313:web:6b9401cae82de44633d320",
  measurementId: "G-KN54HXGWER"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export default app