import {
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut,
	updateEmail,
	updatePassword,
} from "firebase/auth";
import { writable } from "svelte/store";
import { auth } from "../lib/firebase/firebase.client";

export const authStore = writable({
	user: null,
	loading: true,
	data: {},
});

export const authHandlers = {
	login: async (email, password) => {
		await signInWithEmailAndPassword(auth, email, password);
	},
	signup: async (email, password) => {
		await createUserWithEmailAndPassword(auth, email, password);
	},
	logout: async () => {
		await signOut(auth);
	},
	resetPassword: async (email) => {
		console.log("WE ARE HERE", email);
		if (!email) {
			console.log("inHERE");
			return;
		}
		await sendPasswordResetEmail(auth, email);
	},
	updateEmail: async (email) => {
		authStore.update((curr) => {
			if (!curr.user) {
				return curr; // or handle this case accordingly
			}

			return {
				...curr,
				user: {
					...curr.user,
					email: email,
				},
			};
		});
		await updateEmail(auth.user, email);
	},
	updatePassword: async (password) => {
		await updatePassword(auth.user, password);
	},
};
