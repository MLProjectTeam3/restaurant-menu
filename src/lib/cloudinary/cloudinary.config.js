import { Cloudinary } from "@cloudinary/url-gen/index";

const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUDNAME,
    apiKey: import.meta.env.VITE_CLOUDINARY_APIKEY,
  },
});

export default cld;
