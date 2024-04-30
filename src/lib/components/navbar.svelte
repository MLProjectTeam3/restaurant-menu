<script>
// @ts-nocheck

  import { Button } from "./ui/button";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { auth } from "$lib/firebase/firebase.config";
  import { Icon } from "svelte-icons-pack";
  import { FaCircleUser } from "svelte-icons-pack/fa";
  import { LuShoppingCart } from "svelte-icons-pack/lu";
  import { Separator } from "bits-ui";
  import { onAuthStateChanged, signOut } from 'firebase/auth'
  import { FlatToast, ToastContainer, toasts } from "svelte-toasts";
  import { goto } from "$app/navigation";
  import { onMount } from 'svelte' ;

    let current_user;
    onAuthStateChanged(auth, (user) => {
      current_user = user;
    })
  
  let widget;

  onMount(() => {
    if('cloudinary' in window) {
      widget=window.cloudinary.createUploadWidget({
        cloudName:import.meta.env.VITE_CLOUDINARY_CLOUD,
        uploadPreset: 'mabmow43'
      }, (result) => {
        console.log(result)
        result.
      });
    }
  });

  const handleClick = () => {
      console.log("clicked",widget)
    if(widget){
      widget.open()
    }
  }
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
    <a href="/orders">
      <Icon src={LuShoppingCart} size="32" className="stroke-primary" />
    </a>

    <!-- Render the profile options button if user exists(ie. user has signed in) -->
    {#if current_user}
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
          <DropdownMenu.Group class="flex flex-col items-center m-4 gap-1">
            <DropdownMenu.Label>My Account</DropdownMenu.Label>
            <DropdownMenu.Separator />

            <img
              src="images/landingBg4.jpg"
              alt="profile"
              class="w-24 h-24 rounded-md"
            />
            <button on:click={handleClick}>edit</button>
            <h1 class="text-xl">
              {current_user.displayName}
            </h1>
            <h1 class="text-xl">
              {current_user.phoneNumber}
            </h1>
            <DropdownMenu.Separator />
            <Button
              class="bg-red-600"
              on:click={() => {
                signOut(auth)
                  .then(() => {
                    toasts.success("Logout Successfull!");
                    goto("/home");
                  })
                  .catch((error) => {
                    toasts.error("Failed to Logout!" + " " + error.message);
                  });
              }}>LOGOUT</Button
            >
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
    {#if current_user}
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
          <DropdownMenu.Item class="text-xl"
            ><a href="/home">Home</a></DropdownMenu.Item
          ><DropdownMenu.Separator />
          <DropdownMenu.Item class="text-xl"
            ><a href="/menu">Menu</a></DropdownMenu.Item
          ><DropdownMenu.Separator />
          <DropdownMenu.Item class="text-xl"
            ><a href="/home#about">AboutUs</a></DropdownMenu.Item
          ><DropdownMenu.Separator />
          <DropdownMenu.Item class="text-xl"
            ><a href="/home#contact">Contact</a></DropdownMenu.Item
          ><DropdownMenu.Separator />
          <DropdownMenu.Item class="text-xl"
            ><a href="/home#reviews">Reviews</a></DropdownMenu.Item
          ><DropdownMenu.Separator />
        </DropdownMenu.Group>
        <DropdownMenu.Group
          class="p-2 border-t border-primary border-opacity-25"
        >
          <DropdownMenu.Item
            class="p-0 items-start data-[highlighted]:bg-transparent flex flex-col gap-2"
          >
            {#if current_user}
              <div class="flex gap-2">
                <img
                  src="images/landingBg4.jpg"
                  alt="profile"
                  class="h-8 w-8 rounded-full"
                />
                <h2 class="text-lg">{current_user.displayName}</h2>
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
