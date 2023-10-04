import { getAllFilesFrontMatter } from '@/lib/mdx';
import siteMetadata from '@/data/siteMetadata';
import ListLayout from '@/layouts/ListLayout';
import { PageSEO } from '@/components/SEO';
import { getAllCategories } from '@/lib/categories';

export const POSTS_PER_PAGE = 15;

export async function getStaticProps() {
  const allPosts = await getAllFilesFrontMatter('blog');
  const categories = await getAllCategories('blog');
  delete categories['memo'];
  const sortedCategories = Object.keys(categories).sort((a, b) => categories[b] - categories[a]);
  const posts = allPosts.filter((v) => v.categories?.indexOf('memo') == -1);
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE);
  const tags = [...new Set(posts.flatMap((post) => post.tags))];
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  };

  return { props: { initialDisplayPosts, posts, pagination, sortedCategories, tags } };
}

export default function Blog({ posts, initialDisplayPosts, pagination, sortedCategories, tags }) {
  return (
    <>
      <PageSEO title={`Blog - ${siteMetadata.author}`} description={siteMetadata.description} />
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        category='all'
        sortedCategories={sortedCategories}
        tags={tags}
      />
    </>
  );
}
