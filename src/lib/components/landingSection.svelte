<script>
  import * as Card from "$lib/components/ui/card";
  import { Button } from "$lib/components/ui/button";
  import Carousel from "svelte-carousel";

  const numbs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
</script>

<div class="w-full h-[100dvh] flex justify-center items-center">
  <div class="w-full max-h-full bg-black absolute bottom-0 carousel-item">
    <Carousel autoplay autoplayDuration={2000} arrows={false} dots={false}>
      {#each numbs as num}
        <img
          class="w-full h-[100dvh] object-cover opacity-50"
          src="images/landingBg{num}.jpg"
          alt="Bg{num}"
        />
      {/each}
    </Carousel>
  </div>

  <Card.Root
    class="absolute z-10 text-center w-[90vw] py-12 rounded-3xl sm:w-[480px]"
  >
    <Card.Header>
      <Card.Title class="text-6xl text-primary font-normal drop-shadow-md"
        >CAFE SANMATHI</Card.Title
      >
      <Card.Description class="text-xl text-primary opacity-75 pt-3"
        >Order Before You Reach</Card.Description
      >
    </Card.Header>
    <Card.Footer class="justify-center">
      <a href="/menu"
        ><Button class="font-normal text-4xl px-12 py-8">MENU</Button></a
      >
    </Card.Footer>
  </Card.Root>
</div>
