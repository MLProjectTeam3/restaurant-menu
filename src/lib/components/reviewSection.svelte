<!-- Your script section -->
<script>
	// Import necessary modules
	import * as Card from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import Carousel from "svelte-carousel";
	import * as Dialog from "$lib/components/ui/dialog";
	import { Icon } from "svelte-icons-pack";
	import { FaPenToSquare } from "svelte-icons-pack/fa";
	import { BiSolidStar } from "svelte-icons-pack/bi";
	import { addDoc, collection, getDocs } from "firebase/firestore";
	import { db, auth } from "$lib/firebase/firebase.config";
	import { onMount } from "svelte";

	// Initialize variables
	let reviewss = "";
	let rating = "";
	let reviewData = [
		{ name: "John Doe", rating: 5, review: "Excellent product!" },
		{ name: "Jane Smith", rating: 4, review: "Great value for the price." },
		// Add more sample reviews here if needed
	];

	onMount(async () => {
		reviewData = await getReviewsFromFirestore();
	});

	// Function to handle adding review
	const handleAddReview = async () => {
		// Get the current user
		const user = auth.currentUser;

		try {
			// Add a new review to Firestore
			const docRef = await addDoc(collection(db, "Reviews"), {
				name: user.displayName,
				rating: rating,
				review: reviewss,
			});
			console.log("Review added with ID: ", docRef.id);
			// Clear the input fields after successful submission
			reviewss = "";
			rating = "";
		} catch (error) {
			console.error("Error adding review: ", error);
		}
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
			return reviews;
		} catch (error) {
			console.error("Error fetching reviews: ", error);
			// Return null or handle the error as needed
			return null;
		}
	};
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
						class="w-[80vw] md:w-1/5 h-[80vw] md:h-[20vw] border-2 border-primary"
					>
						<Card.Content class="py-12 px-5 flex flex-col gap-16">
							<div class="w-full h-full flex justify-between">
								<div class="flex justify-evenly gap-4">
									<img
										src="images/landingBg4.jpg"
										alt="profile"
										class="h-8 w-8 rounded-full"
									/>
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
