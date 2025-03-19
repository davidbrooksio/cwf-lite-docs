import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://davidbrooksio.github.io",
  base: "/cwf-lite-docs",
  integrations: [
    sitemap(),
    starlight({
      title: "CWF Lite",
      description: "A very lightweight but modern css framework.",
      social: {
        github: "https://github.com/davidbrooksio",
        linkedin: "https://www.linkedin.com/in/davidbrooksio/",
      },
      sidebar: [
        {
          label: "Start here",
          collapsed: false,
          // autogenerate: { directory: "start-here" },
          items: [
            {
              label: "Getting Started",
              link: "/",
            },
            { label: "Installation", link: "/installation/" },
            { label: "File structure", link: "/file-structure/" },
            { label: "Syntax", link: "/syntax/" },
            { label: "Customisation", link: "/customisation/" },
          ],
        },
        {
          label: "Base",
          collapsed: false,
          items: [
            { label: "Root", link: "/base/root/" },
            { label: "HTML", link: "/base/html/" },
            { label: "Body", link: "/base/body/" },
            { label: "Typogography", link: "/base/typogography/" },
            { label: "Horizontal rule", link: "/base/hr/" },
            { label: "Link", link: "/base/link/" },
            { label: "Container", link: "/base/container/" },
            { label: "Grid System", link: "/base/grid/" },
          ],
        },
        {
          label: "Modules",
          collapsed: false,
          items: [
            { label: "Alert", link: "/modules/alert/" },
            { label: "Button", link: "/modules/button/" },
            { label: "Card", link: "/modules/card/" },
            { label: "Form Input", link: "/modules/form/" },
            { label: "List", link: "/modules/list/" },
            { label: "Navigation", link: "/modules/navigation/" },
            { label: "Pill", link: "/modules/pill/" },
            { label: "Table", link: "/modules/table/" },
            { label: "Tag", link: "/modules/tag/" },
            { label: "Tile", link: "/modules/tile/" },
          ],
        },
        {
          label: "Utilities",
          collapsed: false,
          items: [
            { label: "Alignment", link: "/utilities/alignment/" },
            {
              label: "Vertical Alignment",
              link: "/utilities/vertical-alignment/",
            },
            { label: "Display", link: "/utilities/display/" },
            { label: "Float", link: "/utilities/float/" },
            { label: "Gap", link: "/utilities/gap/" },
            { label: "Group", link: "/utilities/group/" },
            { label: "Inset", link: "/utilities/inset/" },
            { label: "Margin", link: "/utilities/margin/" },
            { label: "Order", link: "/utilities/order/" },
            { label: "Overflow", link: "/utilities/overflow/" },
            { label: "Padding", link: "/utilities/padding/" },
            { label: "Position", link: "/utilities/position/" },
            { label: "Size", link: "/utilities/size/" },
            { label: "Text & Font", link: "/utilities/typography/" },
            { label: "Z Index", link: "/utilities/z-index/" },
          ],
        },
      ],
    }),
  ],
});
