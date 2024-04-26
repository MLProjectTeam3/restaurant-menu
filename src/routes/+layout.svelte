<script>
	import Navbar from "$lib/components/navbar.svelte";
	import "../lib/app.css";
	import { onMount } from "svelte";
	import { auth } from "../lib/firebase/firebase.client";
	import { browser } from "$app/environment";
	import { authStore } from "../stores/authStore.js";
	onMount(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			console.log(user);
			authStore.update((curr) => {
				return { ...curr, isLoading: false, currentUser: user };
			});

			if (
				browser &&
				!$authStore?.currentUser &&
				!$authStore.isLoading &&
				window.location.pathname !== "/"
			) {
				window.location.href = "/";
				console.log(authStore.currentUser, authStore.isLoading);
			}
		});
		return unsubscribe;
	});
</script>

<Navbar />
<slot />
