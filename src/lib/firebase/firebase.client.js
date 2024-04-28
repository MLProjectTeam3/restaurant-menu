// Import the functions you need from the SDKs you need
import { deleteApp, getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDBl4z7wk6gUs6lCov_b3pMm6FXmsUW6ZI",
	authDomain: "restaurant-database-f27d9.firebaseapp.com",
	databaseURL:
		"https://restaurant-database-f27d9-default-rtdb.firebaseio.com",
	projectId: "restaurant-database-f27d9",
	storageBucket: "restaurant-database-f27d9.appspot.com",
	messagingSenderId: "257625192971",
	appId: "1:257625192971:web:9961d458adec5d7179650e",
};

// Initialize Firebase
let firebaseApp;
if (!getApps().length) {
	firebaseApp = initializeApp(firebaseConfig);
} else {
	firebaseApp = getApp();
	deleteApp(firebaseApp);
	firebaseApp = initializeApp(firebaseConfig);
}

export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
