<script>
    import * as Card from "$lib/components/ui/card";
    import { Button } from "$lib/components/ui/button";
  import { goto } from "$app/navigation";
  </script>
  
  <div class="w-full h-[100dvh] flex justify-center items-center">
    <div class="w-full max-h-full bg-black absolute bottom-0">
      <img
            class="w-full h-[100dvh] object-cover opacity-50"
            src="images/landingBg5.jpg"
            alt="landingBg1"
          />
    </div>
  
    <Card.Root
      class="absolute z-10 text-center w-[90vw] py-12 rounded-3xl sm:w-[480px]"
    >
      <Card.Header>
        <Card.Title class="text-6xl text-primary font-normal drop-shadow-md"
          >CAFE SANMATHI</Card.Title
        >
        <Card.Description class="text-xl text-primary opacity-75"
          >Every Coffe Has A Story</Card.Description
        >
      </Card.Header>
      <Card.Footer class="justify-center">
        <a href="/menu"><Button class="font-normal text-4xl px-12 py-8">MENU</Button></a> 
      </Card.Footer>
    </Card.Root>
  </div>
  