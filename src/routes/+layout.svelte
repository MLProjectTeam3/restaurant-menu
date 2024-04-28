<script>
	import Navbar from "$lib/components/navbar.svelte";
	import "../lib/app.css";
	import { onMount } from "svelte";
	import { auth, db } from "../lib/firebase/firebase.client";
	import { browser } from "$app/environment";
	import { getDoc, doc, setDoc } from "firebase/firestore";

	import { authStore } from "../stores/authStore.js";
	const nonAuthRoutes = [
		"/",
		"/home",
		"/menu",
		"/home#about",
		"/home#contact",
		"/home#reviews",
	];
	onMount(() => {
		console.log("Mounting");
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			console.log(user);
			const currentPath = window.location.pathname;

			if (!user && !nonAuthRoutes.includes(currentPath)) {
				window.location.href = "/";
				return;
			}

			if (user && currentPath === "/") {
				window.location.href = "/home";
				return;
			}

			if (!user) {
				return;
			}
			// if (
			// 	browser &&
			// 	!$authStore?.user &&
			// 	!$authStore.loading &&
			// 	window.location.pathname !== "/"
			// ) {
			// 	window.location.href = "/";
			// 	console.log(authStore.user, authStore.loading);
			// }

			let dataToSetToStore;
			const docRef = doc(db, "users", user.uid);
			const docSnap = await getDoc(docRef);
			if (!docSnap.exists()) {
				console.log("Creating User");
				const userRef = doc(db, "users", user.uid);
				dataToSetToStore = {
					email: user.email,
					name: "",
					phone: "",
				};
				await setDoc(userRef, dataToSetToStore, { merge: true });
			} else {
				console.log("Fetching User");
				const userData = docSnap.data();
				dataToSetToStore = userData;
			}

			authStore.update((curr) => {
				return {
					...curr,
					user,
					data: dataToSetToStore,
					loading: false,
				};
			});
		});
		return unsubscribe;
	});
</script>

<Navbar />
<slot />
