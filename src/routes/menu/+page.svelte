<script>
	import { Cloudinary } from "@cloudinary/url-gen";
	import * as Card from "$lib/components/ui/card";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { Switch } from "$lib/components/ui/switch";

	let vegOnly = false;
	const categories = [
		["Veg Starters", "veg"],
		["Non Veg Starters", "non-veg"],
		["Roti", "veg"],
		["Veg Curry", "veg"],
		["Non Veg Curry", "non-veg"],
		["Fried Rice", "veg"],
		["Rice", "veg"],
		["Stuff Paratha", "veg"],
		["Noodles", "veg"],
		["SPL Chinese Rice  & Noodles (Veg)", "veg"],
		["SPL Chinese Rice  & Noodles (Non-Veg)", "non-veg"],
		["Veg Sandwich", "veg"],
		["Rools", "veg"],
		["Burgers", "veg"],
		["Pizza", "veg"],
		["Non-Veg Sandwich", "non-veg"],
		["Pasta", "veg"],
		["SPL Omlettes", "veg"],
		["Maggi", "veg"],
		["Juice", "veg"],
		["Fruit Milk Shakes", "veg"],
		["Ice Cream Milk Shake", "veg"],
		["Special Milk Shakes", "veg"],
		["Smoothies", "veg"],
		["SPL Icecream", "veg"],
	];
	let searchTerm = "";
	let matchingCategories = categories; // State variable to store matching categories

	function buildMatchingCategories() {
		matchingCategories = [];
		if (searchTerm === "") {
			matchingCategories = categories;
			return;
		}
		for (const category of categories) {
			for (const item of menu_items) {
				if (
					item.category === category[0] &&
					item.itemName
						.toLowerCase()
						.includes(searchTerm.toLowerCase())
				) {
					matchingCategories.push(category);
					break;
				}
			}
		}
	}

	const cld = new Cloudinary({
		cloud: {
			cloudName: "dxgkiabgb",
			apiKey: "599262657695471",
		},
	});

	import menu_items from "./menu.json";
	import { Button } from "$lib/components/ui/button";

	const imageUrls = menu_items.map((item) =>
		cld
			.image("MENU/" + item.id.toString()) // Replace with your image's public ID
			.format("auto")
			.quality("auto")
			.toURL()
	);
	import { getDoc, doc, setDoc } from "firebase/firestore";
	import { authStore } from "../../stores/authStore.js";
	import { db } from "$lib/firebase/firebase.client";
	let nameItem = [];
	let pricesItem = [];
	let numItem = [];
	let iname = [];
	let iprice = [];
	let inum = [];

	authStore.subscribe((curr) => {
		console.log("CURR", curr);
		iname = curr.data.itemNames;
		iprice = curr.data.itemPrice;
		inum = curr.data.itemNum;
	});

	// let error = false;
	async function addToCart(item, index) {
		iname = [...iname, item.itemName];
		iprice = [...iprice, item.price];
		inum = [...inum, index];
		// nameItem = [iname];
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

<div class="max-h-[89vh] mt-[11vh] flex flex-col items-center">
	<h1 class="text-4xl text-primary">MENU</h1>
	<input
		type="text"
		placeholder="Search here"
		class="w-[80%] mb-4 shadow-lg shadow-zinc-400 rounded-full p-1 px-4 lg:w-[50%] text-xl mt-6 bg-background text-primary placeholder-primary border border-b-2 border-primary border-opacity-15"
		bind:value={searchTerm}
		on:input={buildMatchingCategories}
	/>
	<div class="flex w-[80%] lg:w-[45%] py-4 justify-between items-center">
		<DropdownMenu.Root>
			<DropdownMenu.Trigger
				class="text-2xl bg-primary text-primary-foreground w-1/2 py-1 rounded-full flex justify-between px-4 items-center"
				><p class="font-thin text-lg">Categories</p>
				<img
					src="icons/downArrow.png"
					alt="v"
				/></DropdownMenu.Trigger
			>
			<DropdownMenu.Content>
				<DropdownMenu.Group class="py-4 max-h-[60vh] overflow-scroll">
					<DropdownMenu.Label class="text-2xl"
						>Select Category</DropdownMenu.Label
					>
					<DropdownMenu.Separator />
					{#each categories as category}
						<a href="#{category[0]}"
							><DropdownMenu.Item class="text-2xl"
								>{category[0]}</DropdownMenu.Item
							></a
						>
					{/each}
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
		<div class="flex flex-col items-center">
			<Switch
				class="border-2 border-green-700 border-opacity-20"
				bind:checked={vegOnly}
				on:click={() => {
					console.log(vegOnly);
				}}
			/>
			<p class="text-green-600">VEG ONLY</p>
		</div>
	</div>
	<div
		class="mt-8 flex lg:w-[90%] flex-col items-center max-h-[70vh] overflow-scroll"
		style="scrollbar-width: none;"
	>
		{#each matchingCategories as category}
			{#if !vegOnly || (vegOnly && category[1] === "veg")}
				<h1
					class="text-4xl pb-4"
					id={category[0]}
				>
					{category[0]}
				</h1>
				<div
					class="sm:grid sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 sm:w-full sm:px-10"
				>
					{#each menu_items as item, index}
						{#if item.category === category[0] && item.itemName
								.toLowerCase()
								.includes(searchTerm.toLowerCase())}
							{#if !vegOnly || (vegOnly && item.type === "Veg")}
								<Card.Root class="mb-4">
									<Card.Content
										class="w-full h-[120px] flex justify-between border pt-6 items-center"
									>
										<img
											src={imageUrls[index]}
											alt={item.itemName}
											class="h-24 w-24 object-cover rounded-md"
										/>
										<div class="flex flex-col text-2xl">
											<h1>{item.itemName}</h1>
											<h2>&#8377;{item.price}</h2>
										</div>
										<Button
											on:click={() =>
												addToCart(item, index)}
											class=" bg-[#D9D9D9] px-6 h-16 rounded-md flex justify-center items-center text-2xl text-primary"
											>Add</Button
										>
									</Card.Content>
								</Card.Root>
							{/if}
						{/if}
					{/each}
				</div>
			{/if}
		{/each}
	</div>
	<a href="#Veg%20Starters"
		><Button
			class="fixed bottom-6 right-6 rounded-full w-16 h-16 text-2xl font-extrabold bg-primary"
			>&and;</Button
		></a
	>
</div>
