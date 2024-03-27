<script lang="ts">
  import { Swiper, SwiperSlide } from "swiper/svelte";
  import "swiper/css";
  import * as Card from "$lib/components/ui/card"
  import { Button } from "$lib/components/ui/button"
  
</script>

<div class="w-full max-h-[90vh] flex justify-center items-center">

<div class="w-full max-h-[90vh] bg-black">
    <Swiper
    slidesPerView={1}
    autoplay={true}
    on:slideChange={() => console.log('slide change')}
  >
    <SwiperSlide><img class="w-full h-[90vh] object-cover opacity-50" src="images/landingBg5.jpg" alt="landingBg1"></SwiperSlide>
    <SwiperSlide><img class="w-full h-[90vh] object-cover opacity-50" src="images/landingBg6.jpg" alt="landingBg1"></SwiperSlide>
    <SwiperSlide><img class="w-full h-[90vh] object-cover opacity-50" src="images/landingBg7.jpg" alt="landingBg1"></SwiperSlide>
    <SwiperSlide><img class="w-full h-[90vh] object-cover opacity-50" src="images/landingBg3.jpg" alt="landingBg1"></SwiperSlide>
  </Swiper>
</div>

<Card.Root class="absolute z-10 text-center w-[90vw] py-12 rounded-3xl sm:w-[480px]">
    <Card.Header>
      <Card.Title class="text-5xl text-primary font-normal drop-shadow-md">CAFE SANMATHI</Card.Title>
      <Card.Description class="text-xl text-primary opacity-75">Every Coffe Has A Story</Card.Description>
    </Card.Header>
    <Card.Footer class="justify-center">
      <Button class="font-normal text-4xl px-12 py-8">MENU</Button>
    </Card.Footer>
  </Card.Root>
</div>