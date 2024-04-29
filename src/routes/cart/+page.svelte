<script>
	// import AuthReset from "../../components/AuthReset.svelte";
	import { auth, db } from "../../lib/firebase/firebase.client";
	import { authHandlers, authStore } from "../../stores/authStore";
	import { getDoc, doc, setDoc } from "firebase/firestore";
	let iname;
	let iprice;
	let inum;
	authStore.subscribe((curr) => {
		console.log("CURR", curr);
		iname = curr.data.itemNames;
		iprice = curr.data.itemPrice;
		inum = curr.data.itemNum;
	});
	async function removeTodo(index) {
		let newNames = [...iname].filter((val, i) => {
			// console.log(i, index, i !== index);
			return i != index;
		});
		iname = newNames;
		let newNums = [...inum].filter((val, j) => {
			// console.log(j, index, j !== index);
			return j != index;
		});
		inum = newNums;
		let newPrice = [...iprice].filter((val, k) => {
			// console.log(k, index, k !== index);
			return k != index;
		});
		iprice = newPrice;
		try {
			const userRef = doc(db, "users", $authStore.user.uid);
			await setDoc(
				userRef,
				{
					itemNames: iname,
					itemPrice: iprice,
					itemNum: inum,
				},
				{ merge: true }
			);
		} catch (err) {
			console.log("There was an error saving your information");
		}
	}
</script>

{#if !$authStore.loading}
	<div>
		<p>h</p>
		<p>h</p>
		<p>h</p>
		<p>h</p>
		<p>h</p>
		<p>h</p>
		<p>h</p>
		<p>h</p>
		<p>h</p>
		<main>
			{#if inum.length === 0}
				<p>You have nothing to do!</p>
			{/if}
			{#each inum as index}
				<p>{iname[index]}, {iprice[index]}</p>
				<button
					on:click={() => {
						removeTodo(index);
					}}
					on:keydown={() => {}}>remove</button
				>
			{/each}
		</main>
	</div>
{/if}
