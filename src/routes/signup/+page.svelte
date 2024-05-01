<script>
  // @ts-nocheck

  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
  import { auth } from "$lib/firebase/firebase.config";
  import { toasts, ToastContainer, FlatToast } from "svelte-toasts";
  import { updateProfile, createUserWithEmailAndPassword } from "firebase/auth";
  import { goto } from "$app/navigation";
  import { doc, setDoc } from "firebase/firestore";
  import { db } from "$lib/firebase/firebase.config";
  let email = "";
  let phone = null;
  let password = "";
  let confirmPassword = "";
  let name = "";

  const handleSignUp = async () => {
    // if both passwords to not match
    if (password != confirmPassword) {
      toasts.error("Passwords do not match!");
      confirmPassword = "";
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async () => {
        // Get the user variable :
        const user = auth.currentUser;
        updateProfile(user, {
          displayName: name,
          phoneNumber: phone,
        });
        await setDoc(
          doc(db, "Users", user.uid),
          {
            name: name,
            phone: phone,
            email: email,
            uid: user.uid,
          },
          { merge: true }
        );

        toasts.success("Account Created Successfully!");

        goto("/menu");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toasts.error(errorMessage);
      });
  };
</script>

<div class="h-screen flex justify-center items-center">
  <img
    src="images/landingBg11.jpg"
    class="absolute h-full w-screen blur-lg z-10 opacity-70"
    alt="bgImage"
  />
  <div class="absolute bg-black h-full w-screen z-0" />
  <Card.Root
    class="z-20 pt-[12vh] md:pt-0 md:mt-24  md:w-1/5 md:border-4 md:shadow-lg border-none rounded-none md:rounded-lg shadow-none w-screen flex flex-col items-center justify-between"
  >
    <Card.Header
      class="text-6xl md:text-4xl md:pt-12 w-2/3 text-center text-primary"
    >
      <Card.Title><h1 class="font-normal">CAFE SANMATHI</h1></Card.Title>
    </Card.Header>
    <Card.Content>
      <form action="" class="flex flex-col md:block md:w-full">
        <p class="text-primary md:ml-2 text-2xl md:text-base">Name</p>
        <input
          type="text"
          class="p-2 border-2 rounded-xl border-secondary w-[80vw] md:w-full h-10 md:h-8 mb-4"
          bind:value={name}
        />
        <p class="text-primary md:ml-2 text-2xl md:text-base">Email</p>
        <input
          type="email"
          class="p-2 border-2 rounded-xl border-secondary w-[80vw] md:w-full h-10 md:h-8 mb-4"
          bind:value={email}
        />
        <p class="text-primary md:ml-2 text-2xl md:text-base">Phone Number</p>
        <input
          type="number"
          class="p-2 border-2 rounded-xl border-secondary w-[80vw] md:w-full h-10 mb-4 md:h-8"
          bind:value={phone}
        />
        <p class="text-primary md:ml-2 text-2xl md:text-base">Password</p>
        <input
          type="password"
          class="p-2 border-2 rounded-xl border-secondary w-[80vw] md:w-full h-10 mb-4 md:h-8"
          bind:value={password}
        />
        <p class="text-primary md:ml-2 text-2xl md:text-base">
          Confirm Password
        </p>
        <input
          type="password"
          class="p-2 border-2 rounded-xl border-secondary w-[80vw] md:w-full h-10 mb-4 md:h-8"
          bind:value={confirmPassword}
        /><Button
          on:click={handleSignUp}
          class="text-2xl p-8 rounded-xl self-center mt-16 md:mt-1 md:p-2 md:text-base md:w-full"
          >Create Account</Button
        >
      </form>
    </Card.Content>
    <Card.Footer>
      <p class="text-2xl md:text-lg">Already have an account?</p>
      <a href="/login"><u class="text-2xl md:text-lg">Login</u></a>
    </Card.Footer>
  </Card.Root>
  <ToastContainer placement="bottom-right" let:data>
    <FlatToast {data} />
    <!-- Provider template for your toasts -->
  </ToastContainer>
</div>
