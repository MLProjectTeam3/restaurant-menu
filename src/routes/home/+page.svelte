<script>
	import AboutSection from "$lib/components/aboutSection.svelte";
	import ContactSection from "$lib/components/contactSection.svelte";
	import ReviewSection from "$lib/components/reviewSection.svelte";
	import LandingSection from "$lib/components/landingSection.svelte";
	// import AuthReset from "../../components/AuthReset.svelte";
	import { auth } from "../../lib/firebase/firebase.client";
	import { authHandlers, authStore } from "../../stores/authStore";

	let email;
	authStore.subscribe((curr) => {
		console.log("CURR", curr);
		email = curr?.currentUser?.email;
	});
</script>

{#if $authStore.currentUser}
	<div>
		<h1>CURRENT USER: {email}</h1>
		<!-- <AuthReset /> -->
		<button on:click={authHandlers.logout}>Logout</button>
	</div>
{:else}
	<div>Loading....</div>
{/if}
<LandingSection />
<AboutSection />
<ContactSection />
<ReviewSection />
