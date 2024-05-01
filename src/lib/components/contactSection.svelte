<script>
  import { Icon } from 'svelte-icons-pack';
  import { BsAt } from "svelte-icons-pack/bs";
  import { BiLogoGmail } from "svelte-icons-pack/bi";
  import { FiInstagram } from "svelte-icons-pack/fi";
  import { BsTelephone } from "svelte-icons-pack/bs";
</script>
<div
  class="bg-background h-[100dvh] flex flex-col md:flex-row-reverse justify-center items-center gap-16 md:gap-0" id="contact"
>
  <div class="flex flex-col justify-center items-left w-1/2 md:w-1/3 gap-6">
    <h1 class="text-5xl text-primary w-full text-center">Contact</h1>
    <div class="flex gap-4 justify-center">
      <Icon size=28 color="#50413C" src={BsTelephone}></Icon>
      <p class="text-primary text-2xl">96206 73070 <br> 87626 98970 </p>
    </div>
    <div class="flex gap-4 justify-center">
      <Icon size=28 color="#50413C" src={FiInstagram}></Icon>
      <div class="flex items-center"><Icon size=28 color="#50413C" src={BsAt}></Icon> <h3 class="text-primary text-2xl">cafe_sanmathi</h3></div>
    </div>
    <div class="flex gap-4 justify-center">
      <Icon size=30 color="#50413C" src={BiLogoGmail}></Icon>
      <p class="text-primary text-2xl">cafesanmathikitchenbells@gmail.com</p>
    </div>
  </div>
  <img
    src="images/landingBg1.jpg"
    alt="Sanmathi_image"
    class="w-[80vw] md:w-[80vh] md:h-[50vh] h-[80vw] object-cover rounded-xl"
  />
</div>
