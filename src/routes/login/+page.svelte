<script>
  import { Checkbox } from "$lib/components/ui/checkbox";
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
</script>

<div class="max-h-full flex justify-center items-center ">
<img src="images/landingBg5.jpg" class="absolute h-full w-screen blur-lg z-10 opacity-70" alt="bgImage" />
<div class="absolute bg-black h-full w-screen z-0 " />
<Card.Root
  class="z-20 pt-[15vh] md:pt-0 md:mt-24 md:h-[80vh] md:w-1/5 md:border-4 md:shadow-lg border-none shadow-none w-screen flex flex-col items-center justify-between h-screen"
>
  <Card.Header class="text-6xl md:text-5xl md:pt-16 w-2/3 text-center text-primary">
    <Card.Title
      ><h1 class="font-normal">
        CAFE SANMATHI
      </h1></Card.Title
    >
  </Card.Header>
  <Card.Content>
    <form action="" class="pb-24 md:pb-0 md:max-w-[20vw] flex flex-col justify-between">
      <p class="text-primary text-2xl">Email</p>
      <input
        type="email"
        class="p-2 border-2 rounded-xl border-secondary w-[80vw] md:w-full h-10"
      />
      <div class="min-h-6" />
      <p class="text-primary text-2xl">Password</p>
      <input
        type="password"
        class="p-2 border-2 rounded-xl border-secondary w-[80vw]  md:w-full h-10"
      />

      <div class="min-h-2" />
      <div class="flex justify-between text-2xl md:text-base md:gap-16">
        <div class="flex gap-2 items-center">
          <Checkbox />
          <p>Remember me</p>
        </div>
        <p>Forgot password?</p>
      </div>
      <div class="min-h-16" />
      <Button class="text-2xl p-5 w-1/3 self-center">Login</Button>
    </form>
  </Card.Content>
  <Card.Footer>
    <p class="text-2xl">Don't have an account?</p><a href="/signup"><u class="text-2xl">Sign Up</u></a>
  </Card.Footer>
</Card.Root>
</div>