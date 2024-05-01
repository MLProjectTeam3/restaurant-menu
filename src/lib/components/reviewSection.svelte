<!-- Your script section -->
<script>
	// Import necessary modules
	import * as Card from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import Carousel from "svelte-carousel";
	import * as Dialog from "$lib/components/ui/dialog";
	import { Icon } from "svelte-icons-pack";
	import { FaPenToSquare, FaCircleUser } from "svelte-icons-pack/fa";
	import { BiSolidStar } from "svelte-icons-pack/bi";
	import {
		addDoc,
		collection,
		getDocs,
		doc,
		getDoc,
	} from "firebase/firestore";
	import { db, auth } from "$lib/firebase/firebase.config";
	import { onMount } from "svelte";

	// Initialize variables
	let reviewss = "";
	let rating = "";
	let reviewData = [];
	let changeNotifier;
	let userData = null;
	let uid = null;
	auth.onAuthStateChanged(async (user) => {
		let current_user = user;
		if (user) {
			// User is logged in, update the UID
			uid = user.uid;
			// Fetch user data
			userData = await fetchUserData(uid);
		} else {
			// User is not logged in, reset UID and user data
			uid = null;
			userData = null;
		}
	});

	onMount(async () => {
		if (auth.currentUser) {
			uid = auth.currentUser.uid;
			userData = await fetchUserData(uid);
		}
		reviewData = await getReviewsFromFirestore();
		changeNotifier = 1;
	});

	// Function to handle adding review
	const handleAddReview = async () => {
		// Get the current user
		const user = auth.currentUser;

		try {
			// Add a new review to Firestore
			const docRef = await addDoc(collection(db, "Reviews"), {
				name: userData.name,
				rating: rating,
				review: reviewss,
				prifilePic: userData.photo_url,
			});
			console.log("Review added with ID: ", docRef.id);
			// Clear the input fields after successful submission
			reviewss = "";
			rating = "";
		} catch (error) {
			console.error("Error adding review: ", error);
		}

		reviewData = await getReviewsFromFirestore();
		changeNotifier += 1;
	};

	const getReviewsFromFirestore = async () => {
		try {
			// Get the reviews collection from Firestore
			const querySnapshot = await getDocs(collection(db, "Reviews"));

			// Initialize an array to store the reviews
			let reviews = [];

			// Loop through each document in the collection
			querySnapshot.forEach((doc) => {
				// Get the data from each document and push it to the reviews array
				reviews.push(doc.data());
			});

			// Return the array of reviews
			console.log(reviews);
			return reviews;
		} catch (error) {
			console.error("Error fetching reviews: ", error);
			// Return null or handle the error as needed
			return null;
		}
	};

	async function fetchUserData(uid) {
		try {
			const docRef = doc(db, "Users", uid);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				// Extract the data from the document snapshot
				const userData = docSnap.data();
				return userData;
			} else {
				// Document doesn't exist
				return null;
			}
		} catch (error) {
			console.error("Error fetching user data:", error);
			return null;
		}
	}
</script>

<!-- Your HTML section -->
<div
	class="bg-[#FFECD1] mt-[11vh] h-[100dvh] w-full flex flex-col md:flex-col items-center gap-16 md:gap-0"
	id="reviews"
>
	<div
		class="flex flex-col mt-28 items-left items-center justify-center w-full md:w-1/3 gap-6"
	>
		<h1 class="text-7xl text-primary w-full text-center">REVIEWS</h1>
	</div>
	<div class="flex flex-row mt-[5vh] w-full justify-evenly">
		{#if changeNotifier > 0}
			<Carousel
				autoplay
				autoplayDuration={5000}
				arrows={false}
				particlesToShow={1}
				swiping={true}
			>
				{#each reviewData as review}
					<div class="flex justify-center">
						<Card.Root
							class="w-[80vw] md:w-[20vw] h-[80vw] md:h-[20vw] border-2 border-primary"
						>
							<Card.Content
								class="py-12 px-5 flex flex-col gap-16"
							>
								<div class="w-full h-full flex justify-between">
									<div class="flex justify-evenly gap-4">
										{#if review.prifilePic}
											<img
												src={review.prifilePic}
												alt="profile"
												class="w-24 h-24 rounded-md object-cover"
											/>
										{:else}
											<Icon
												src={FaCircleUser}
												size="32"
											/>
										{/if}
										<h1 class="text-3xl md:text-2xl">
											{review.name}
										</h1>
									</div>
									<div class="flex gap-2 items-center">
										<h2 class="text-3xl md:text-2xl">
											{review.rating}.0
										</h2>
										<Icon
											src={BiSolidStar}
											className="fill-yellow-300 drop-shadow-sm"
											size="28"
										></Icon>
									</div>
								</div>

								<div class="justify-center items-center w-full">
									{review.review}
								</div>
							</Card.Content>
							<!--<div class=" bg-white rounded shadow-md p-4 ">
        <div class="flex items-center mb-2 justify-between ">
          <span class="font-bold">{review.name}</span>
          <span class="text-[#f1c40f] ">{review.rating}</span>
        </div>
        <p>{review.review}</p>
      </div>-->
						</Card.Root>
					</div>
				{/each}
			</Carousel>
		{/if}
	</div>
	<div
		class="flex flex-col mt-12 items-left items-center justify-center w-full md:w-1/3 gap-6"
	>
		<Dialog.Root>
			<Dialog.Trigger>
				<Button>
					<Icon src={FaPenToSquare}></Icon>
					<p class="ml-2">Write Your Review</p>
				</Button>
			</Dialog.Trigger>
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title>Write Your Review</Dialog.Title>
				</Dialog.Header>
				<p class="text-primary md:ml-2 text-2xl md:text-base">Rating</p>
				<input
					type="text"
					class="p-2 border-2 rounded-xl border-secondary w-[80vw] md:w-full h-10 md:h-8 mb-4"
					bind:value={rating}
				/>
				<p class="text-primary md:ml-2 text-2xl md:text-base">Review</p>
				<input
					type="text"
					class="p-2 border-2 rounded-xl border-secondary w-[80vw] md:w-full h-10 md:h-8 mb-4"
					bind:value={reviewss}
				/>

				<Dialog.Footer>
					<Button
						on:click={handleAddReview}
						class="text-2xl p-8 rounded-xl self-center mt-16 md:mt-1 md:p-2 md:text-base md:w-full"
						>Submit Review</Button
					>
				</Dialog.Footer>
			</Dialog.Content>
		</Dialog.Root>
	</div>
</div>
