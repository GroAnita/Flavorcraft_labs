import type { MetadataRoute } from "next";

// Used when the site is added to a phone's home screen
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FlavorCraft Labs",
    short_name: "FlavorCraft",
    description:
      "Discover delicious recipes, explore meal ideas, and save your favorites with FlavorCraft Labs.",
    start_url: "/",
    display: "standalone",
    // salt-500 (page background) and sprout-500 (header) from globals.css
    background_color: "#f5f5f5",
    theme_color: "#a9c97d",
    icons: [
      {
        src: "/images/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
