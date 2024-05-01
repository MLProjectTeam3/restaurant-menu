<script>
  import { Icon } from 'svelte-icons-pack';
  import { FaSolidLocationDot } from "svelte-icons-pack/fa";
</script>
<div
  class="bg-[#FFECD1] h-[100dvh] flex flex-col md:flex-row justify-center items-center gap-16 md:gap-0" id="about"
>
  <div class="flex flex-col justify-start items-left w-1/2 md:w-1/3 gap-6">
    <h1 class="text-5xl text-primary w-full text-left">About Us</h1>
    <div class="flex gap-4 md:justify-left">
      <img src="icons/clock.svg" alt="time" />
      <p class="text-primary text-2xl">9:00 am - 9:00 pm</p>
    </div>
    <div class="flex gap-4 md:justify-left">
      <img src="icons/map-pin.svg" class="fill-primary" alt="location" />
      <p class="text-primary  text-2xl md:w-1/2 md:text-left">Sanmathi Cafe, Sanmathi Garden, Short-cut NET Gents hostel to Main Rd, Nitte Campus, Nitte, Karkala, Udupi District, Karnataka 574110</p>
    </div>

  </div>
  <img src="images/landingBg2.jpg" alt="Sanmathi_image" class="shadow-lg w-[80vw] md:w-[80vh] md:h-[50vh] h-[80vw] object-cover rounded-xl">
</div>
