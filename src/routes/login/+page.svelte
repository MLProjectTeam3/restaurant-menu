<script>
  import { Checkbox } from "$lib/components/ui/checkbox";
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
  import { auth, db } from "$lib/firebase/firebase.config";
  import {
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    signInWithPopup,
  } from "firebase/auth";
  import { collection, doc, setDoc } from "firebase/firestore";
  import { FlatToast, ToastContainer, toasts } from "svelte-toasts";
  import { goto } from "$app/navigation";

  let email = "";
  let password = "";

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toasts.success("Signed in Successfully!");
        goto("/menu");
      })
      .catch((error) => {
        toasts.error(error.message);
        email = "";
        password = "";
      });
  };
  const forgotPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(function () {
        // Password reset email sent successfully
        console.log("Password reset email sent!");
      })
      .catch(function (error) {
        // An error occurred
        console.error("Error sending password reset email:", error);
      });
  };

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;

        // Store user data in Firestore
        await setDoc(
          doc(db, "Users", user.uid),
          {
            name: user.displayName,
            email: user.email,
            photo_url: user.photoURL,
            uid: user.uid,
          },
          { merge: true }
        )
          .then(() => {
            toasts.success("Signed in with Google successfully!");
            goto("/menu");
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
            toasts.error(error.message);
          });
      })
      .catch((error) => {
        toasts.error(error.message);
      });
  };
</script>

<div class="h-screen flex justify-center items-center">
  <img
    src="images/landingBg5.jpg"
    class="absolute h-full w-screen blur-lg z-10 opacity-70"
    alt="bgImage"
  />
  <div class="absolute bg-black h-full w-screen z-0" />
  <Card.Root
    class="z-20 pt-[15vh] md:pt-0 md:mt-24 md:h-[80vh] md:w-1/5 md:border-4 md:shadow-lg border-none shadow-none w-screen flex flex-col items-center justify-between h-screen"
  >
    <Card.Header
      class="text-6xl md:text-5xl md:pt-16 w-2/3 text-center text-primary"
    >
      <Card.Title><h1 class="font-normal">CAFE SANMATHI</h1></Card.Title>
    </Card.Header>
    <Card.Content>
      <form
        action=""
        class="pb-24 md:pb-0 md:max-w-[20vw] flex flex-col justify-between"
      >
        <p class="text-primary text-2xl">Email</p>
        <input
          id="email"
          type="email"
          class="p-2 border-2 rounded-xl border-secondary w-[80vw] md:w-full h-10"
          bind:value={email}
        />
        <div class="min-h-6" />
        <p class="text-primary text-2xl">Password</p>
        <input
          id="password"
          type="password"
          class="p-2 border-2 rounded-xl border-secondary w-[80vw] md:w-full h-10"
          bind:value={password}
        />

        <div class="min-h-2" />
        <div class="flex justify-between text-2xl md:text-base md:gap-16">
          <div class="flex gap-2 items-center">
            <Checkbox />
            <p>Remember me</p>
          </div>
          <button on:click={forgotPassword}>Forgot password ?</button>
        </div>
        <div class="min-h-16" />
        <Button on:click={handleLogin}>Login</Button>
        <Button on:click={handleGoogleLogin}>Login with Google</Button>
      </form>
    </Card.Content>
    <Card.Footer>
      <p class="text-2xl">Don't have an account?</p>
      <a href="/signup"><u class="text-2xl">Sign Up</u></a>
    </Card.Footer>
  </Card.Root>
  <ToastContainer placement="bottom-right" let:data>
    <FlatToast {data} />
    <!-- Provider template for your toasts -->
  </ToastContainer>
</div>
