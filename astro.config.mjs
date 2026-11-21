import { defineConfig } from "astro/config";
import partytown from '@astrojs/partytown';

export default defineConfig({
  site: "https://straykerpl.github.io/blog/",
  base: "/blog",
  integrations: [
    partytown({
      config: {
        forward: ["dataLayer.push"],
      }
    })
  ]
});