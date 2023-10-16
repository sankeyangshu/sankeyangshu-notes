import { createContentLoader } from 'vitepress';

export interface BlogType {
  title: string;
  url: string;
  date: string;
}

declare const data: BlogType[];
export { data };

export default createContentLoader('posts/*.md', {
  transform(raw): BlogType[] {
    return raw
      .map((blog) => {
        return {
          title: blog.frontmatter.title,
          url: blog.url,
          date: formatDate(blog.frontmatter.date),
        };
      })
      .sort((a, b) => +new Date(b.date) - +new Date(a.date));
  },
});

function formatDate(raw: string): BlogType['date'] {
  const date = new Date(raw);
  date.setUTCHours(12);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
}
