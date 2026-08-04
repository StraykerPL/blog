type Config = {
  title: string;
  description: string;
  lang: string;
  favicon: string;
  og: {
    image: string;
    imageAlt: string;
    imageType: string;
    imageWidth: string;
    imageHeight: string;
  };
};

export const siteConfig: Config = {
  // Appears in the nav logo, browser title bar, and RSS feed title.
  title: "Strayker Blog",
  // Used as the default meta description and OG description on pages without their own.
  description: "A place where I document my learning process and thoughs.",
  // BCP 47 language tag for the HTML lang attribute (e.g. "en", "de", "fr", "zh-TW").
  lang: "pl",
  favicon: "/blog/favicon.svg",
  og: {
    // Replace with your own image (1200×630px recommended). Path is relative to /public.
    image: "/blog/ogImage.png",
    imageAlt: "Open Graph image for the smallworld Astro template",
    imageType: "image/png",
    imageWidth: "1200",
    imageHeight: "630",
  },
};
