<script>
  import { Button } from "./ui/button";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { auth, db } from "$lib/firebase/firebase.config";
  import { Icon } from "svelte-icons-pack";
  import { FaCircleUser } from "svelte-icons-pack/fa";
  import { LuShoppingCart } from "svelte-icons-pack/lu";
  import { FlatToast, ToastContainer, toasts } from "svelte-toasts";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { doc, getDoc, setDoc } from "firebase/firestore";
  import { signOut } from "firebase/auth";
  import { BiSolidPencil } from "svelte-icons-pack/bi";

  // let current_user;
  // onAuthStateChanged((user) => {
  //
  // });

  let widget;
  let userData = null;
  let uid = null;

  // Listen for authentication state changes
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

    if ("cloudinary" in window) {
      widget = window.cloudinary.createUploadWidget(
        {
          cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD,
          uploadPreset: "ifdwjxdh",
        },
        async (error, result) => {
          if (result.event === "success") {
            const user = auth.currentUser;
            console.log(result.event.public_id);
            await setDoc(
              doc(db, "Users", user.uid),
              {
                photo_url: `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUDNAME}/image/upload/f_auto/q_auto/v1/${result.info.public_id}?_a=DATAdtAAZAA0`,
              },
              { merge: true }
            );
          }
        }
      );
    }
  });

  const handleUploadProfilePhoto = () => {
    console.log("clicked", widget);
    if (widget) {
      widget.open();
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
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toasts.success("Logout Successfull!");
        goto("/home");
      })
      .catch((error) => {
        toasts.error("Failed to Logout!" + " " + error.message);
      });
  };
</script>

<div
  class="navbar invisible md:visible z-50 p-4 w-full bg-background border-b-2 border-primary border-opacity-15 flex items-center justify-between fixed top-0"
>
  <a href="/home" class="flex justify-center items-center space-x-2">
    <img src="icons/coffee.svg" alt="Coffee" class="h-8 stroke-primary" />
    <h1 class="text-2xl text-primary">CAFE SANMATHI</h1>
  </a>

  <div
    class="flex text-xl font text-primary justify-between items-center space-x-16"
  >
    <a href="/home">Home</a>
    <a href="/menu">Menu</a>
    <a href="/home#about">AboutUs</a>
    <a href="/home#contact">Contact</a>
    <a href="/home#reviews">Reviews</a>
  </div>

  <div class="flex justify-center items-center space-x-8">
    <!-- Render the profile options button if user exists(ie. user has signed in) -->
    {#if userData}
      <a href="/orders">
        <Icon src={LuShoppingCart} size="32" className="stroke-primary" />
      </a>
      <p class="text-primary font-serif text-3xl text-opacity-50">|</p>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger
          ><Icon
            src={FaCircleUser}
            size="32"
            className="fill-primary"
          /></DropdownMenu.Trigger
        >
        <DropdownMenu.Content>
          <DropdownMenu.Group class="flex flex-col items-center gap-1 m-2">
            <DropdownMenu.Label class="text-xl">Your Profile</DropdownMenu.Label
            >

            <div class="flex flex-col gap-4">
              <div class="flex gap-2 px-4 w-full min-w-60">
                {#if userData.photo_url}
                  <img
                    src={userData.photo_url}
                    alt="profile"
                    class="h-16 w-16 rounded-full hover:opacity-45"
                  />
                  <button
                    class="absolute h-16 w-16 flex items-center bg-black justify-center rounded-full opacity-0 hover:opacity-50"
                    on:click={handleUploadProfilePhoto}
                  >
                    <Icon src={BiSolidPencil} className="fill-white " />
                  </button>
                {:else}
                  <Icon
                    src={FaCircleUser}
                    className="h-14 w-14 rounded-full hover:opacity-50 fill-gray-300"
                  />
                  <div
                    class="absolute h-14 w-14 bg-white opacity-0 hover:opacity-50"
                    on:click={handleUploadProfilePhoto}
                  >
                    <Icon
                      src={BiSolidPencil}
                      className="absolute left-9 fill-black"
                    />
                  </div>
                {/if}
                <div>
                  <h2 class="text-lg">{userData.name}</h2>
                  <h2 class="text-lg">{userData.phone}</h2>
                </div>
              </div>
              <Button
                class="bg-red-600 w-full hover:none"
                on:click={handleLogout}>LOGOUT</Button
              >
            </div>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    {:else}
      <a href="/login"><Button variant="outline">LOGIN</Button></a>
    {/if}
  </div>
</div>

<div
  class="navbar md:invisible z-50 p-4 w-full bg-background border-b-2 border-primary border-opacity-15 flex items-center justify-between fixed top-0"
>
  <a href="/home" class="flex justify-center items-center space-x-2">
    <img src="icons/coffee.svg" alt="Coffee" class="h-8" />
    <h1 class="text-2xl text-primary">CAFE SANMATHI</h1>
  </a>

  <div class="flex gap-4">
    {#if userData}
      <a href="/orders"
        ><Icon src={LuShoppingCart} size="24" className="stroke-primary" /></a
      >
    {/if}
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <img src="icons/menu.svg" alt="menu" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content class="w-1/2 bg-background">
        <DropdownMenu.Group>
          <a href="/home"
            ><DropdownMenu.Item class="text-xl">Home</DropdownMenu.Item></a
          ><DropdownMenu.Separator />
          <a href="/menu"
            ><DropdownMenu.Item class="text-xl">Menu</DropdownMenu.Item></a
          ><DropdownMenu.Separator />
          <a href="/home#about"
            ><DropdownMenu.Item class="text-xl">AboutUs</DropdownMenu.Item></a
          ><DropdownMenu.Separator />
          <a href="/home#contact"
            ><DropdownMenu.Item class="text-xl">Contact</DropdownMenu.Item></a
          ><DropdownMenu.Separator />
          <a href="/home#reviews"
            ><DropdownMenu.Item class="text-xl">Reviews</DropdownMenu.Item></a
          ><DropdownMenu.Separator />
        </DropdownMenu.Group>
        <DropdownMenu.Group
          class="p-2 border-t border-primary border-opacity-25"
        >
          <DropdownMenu.Item
            class="p-0 items-start data-[highlighted]:bg-transparent flex flex-col gap-2"
          >
            {#if userData}
              <div class="flex gap-2">
                <img
                  src={userData.photo_url}
                  alt="profile"
                  class="h-8 w-8 rounded-full"
                />
                <h2 class="text-lg">{userData.name}</h2>
              </div>
              <Button class="bg-red-600 w-full" on:click={handleLogout}
                >LOGOUT</Button
              >
            {:else}
              <a href="/login"><Button variant="outline">LOGIN</Button></a>
            {/if}
          </DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </div>
  <ToastContainer placement="bottom-right" let:data>
    <FlatToast {data} />
    <!-- Provider template for your toasts -->
  </ToastContainer>
</div>
