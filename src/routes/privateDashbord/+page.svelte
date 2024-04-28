<script>
	import { name } from "@cloudinary/url-gen/actions/namedTransformation";

	// import AuthReset from "../../components/AuthReset.svelte";
	import { auth, db } from "../../lib/firebase/firebase.client";
	import { authHandlers, authStore } from "../../stores/authStore";
	import { getDoc, doc, setDoc } from "firebase/firestore";
	let email;
	authStore.subscribe((curr) => {
		console.log("CURR", curr);
		email = curr?.user?.email;
	});

	let names = "";
	let phones = "";
	let currphone = "";
	let currTodo = "";
	let error = false;

	authStore.subscribe((curr) => {
		names = curr.data;
		phones = curr.data;
	});
	function addTo() {
		error = false;
		if (!currTodo || !currphone) {
			error = true;
		}

		names = currTodo;
		phones = currphone;
	}

	async function saveTo() {
		error = false;
		if (!currTodo || !names || !phones) {
			error = true;
		}

		names = currTodo;
		phones = currphone;

		try {
			const userRef = doc(db, "users", $authStore.user.uid);
			await setDoc(
				userRef,
				{
					name: names,
					phone: phones,
				},
				{ merge: true }
			);
		} catch (err) {
			console.log("There was an error saving your information");
		}
	}
</script>

<p>hi</p>
<p>hi</p>
<p>hi</p>
<p>hi</p>
<p>hi</p>
<p>hi</p>

{#if $authStore.user}
	<div>
		<h1>CURRENT USER: {email}</h1>
		<!-- <AuthReset /> -->
		<button on:click={authHandlers.logout}>Logout</button>
	</div>
{:else}
	<div>Loading....</div>
{/if}
<input
	bind:value={currTodo}
	type="text"
	placeholder="name"
/>
<input
	bind:value={currphone}
	type="number"
	placeholder="phone"
/>
<br />
<br />
<button on:click={addTo}>ADD</button>
<br />
<br />
<button on:click={saveTo}>
	<i class="fa-regular fa-floppy-disk" />
	<p>Save</p></button
>

<style>
	div {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	h1 {
		text-align: center;
	}
</style>
