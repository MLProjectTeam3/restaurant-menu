<script>
  import { Cloudinary } from '@cloudinary/url-gen';

const cld = new Cloudinary({
  cloud: {
    cloudName: "dxgkiabgb",
    apiKey: "599262657695471",
  },
});
  const arr = [1,2,3,4,5];
  const imageUrls = arr.map((id)=>
    cld
    .image("MENU/"+id.toString()) // Replace with your image's public ID
    .format('auto')
    .quality('auto')
    .toURL()
  )

</script>

<div class="pt-[10vh] flex flex-col justify-center gap-2">
  {#each imageUrls as url}
  <img src="{url}" alt="food" />
  {/each}
</div>
