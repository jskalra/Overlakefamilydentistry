import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Enforced SEO frontmatter — a page missing required fields fails the build (spec §11).
const seo = {
  title: z.string(),
  metaDescription: z.string().min(50).max(165),
  keyword: z.string(),
};

const services = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/services" }),
  schema: z.object({
    ...seo,
    category: z.string(),
    categorySlug: z.string(),
    isCategory: z.boolean().default(false),
    heading: z.string(),
    summary: z.string(),
    image: z.string().optional(),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    order: z.number().default(0),
  }),
});

const locations = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/locations" }),
  schema: z.object({
    ...seo,
    suburb: z.string(),
    heading: z.string(),
    summary: z.string(),
    directions: z.string(),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    ...seo,
    heading: z.string(),
    date: z.coerce.date(),
    author: z.string().default("Overlake Family Dentistry"),
    excerpt: z.string(),
  }),
});

export const collections = { services, locations, blog };
