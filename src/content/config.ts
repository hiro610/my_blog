import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    author: z.string(),
    // tags: z.array(z.string()).optional(), // 必要であればタグも追加
  }),
});

export const collections = {
  blog: blogCollection,
};
