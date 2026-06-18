import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "e.g. Brand & Web, Product Design, Motion / 3D",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
    }),
    defineField({ name: "role", title: "Your role", type: "string" }),
    defineField({ name: "client", title: "Client", type: "string" }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 2,
      description: "One or two lines shown on the card and detail header.",
      validation: (r) => r.required().max(220),
    }),
    defineField({
      name: "body",
      title: "Description paragraphs",
      type: "array",
      of: [{ type: "text", rows: 3 }],
      description: "Each entry is rendered as a paragraph on the detail page.",
    }),
    defineField({
      name: "accent",
      title: "Accent colour (hex)",
      type: "string",
      description: "Used for the card gradient + detail page, e.g. #c9924f",
      initialValue: "#c9924f",
      validation: (r) =>
        r.regex(/^#([0-9a-fA-F]{6})$/, { name: "hex colour" }),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", title: "Alt text", type: "string" },
            { name: "caption", title: "Caption", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({ name: "liveUrl", title: "Live URL", type: "url" }),
    defineField({ name: "repoUrl", title: "Repository URL", type: "url" }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "coverImage" },
  },
});
