import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    description: z.string(),
    author: z.string(),
    // tags: z.array(z.string()).optional(), // 必要であればタグも追加
  }),
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/blog" }),
});

export const collections = {
  blog: blogCollection,
};
