import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  site: "https://davidbrooksio.github.io",
  base: "cwf-lite-docs",
  integrations: [
    starlight({
      title: "CWF Lite",
      social: {
        github: "https://github.com/davidbrooksio",
      },
      customCss: [
        // Relative path to your custom CSS file
        "/src/styles/framework.css",
      ],
      sidebar: [
        {
          label: "Base",
          collapsed: false,
          autogenerate: { directory: "bases" },
        },
        {
          label: "Modules",
          collapsed: false,
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Button", link: "/modules/button/" },
          ],
        },
        {
          label: "Utilities",
          collapsed: false,
          items: [
            // Each item here is one entry in the navigation menu.
          ],
        },
      ],
    }),
  ],
});
