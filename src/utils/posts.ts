import { getCollection } from "astro:content";

const isDev = import.meta.env.DEV;

export const getPosts = async (max?: number) => {
  return (await getCollection("blog"))
    .filter((post) => (!isDev ? !post.data.draft : true))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .slice(0, max);
};

export const getTags = async () => {
  const posts = await getCollection("blog");
  const visiblePosts = posts.filter((post) =>
    !isDev ? !post.data.draft : true,
  );
  const tags = new Set();
  visiblePosts.forEach((post) => {
    post.data.tags.forEach((tag) => {
      tags.add(tag.toLowerCase());
    });
  });

  return Array.from(tags);
};

export const getPostByTag = async (tag: string) => {
  const posts = await getPosts();
  const visiblePosts = posts.filter((post) =>
    !isDev ? !post.data.draft : true,
  );
  const lowercaseTag = tag.toLowerCase();
  return visiblePosts.filter((post) => {
    return post.data.tags.some(
      (postTag) => postTag.toLowerCase() === lowercaseTag,
    );
  });
};
