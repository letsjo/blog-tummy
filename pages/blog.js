import { getAllFilesFrontMatter } from '@/lib/mdx';
import siteMetadata from '@/data/siteMetadata';
import ListLayout from '@/layouts/ListLayout';
import { PageSEO } from '@/components/SEO';
import { getAllCategories } from '@/lib/categories';
import kebabCase from '@/lib/utils/kebabCase';

export const POSTS_PER_PAGE = 10;

export async function getServerSideProps(context) {
  const allPosts = await getAllFilesFrontMatter('blog');
  const categories = await getAllCategories('blog');
  const { tag } = context.query;
  delete categories['coding-tests'];
  const sortedCategories = Object.keys(categories).sort((a, b) => categories[b] - categories[a]);
  const allPostsWithoutCodingTest = allPosts.filter((v) => v.categories?.indexOf('coding-tests') == -1);
  const posts = tag
    ? allPostsWithoutCodingTest.filter((post) => post.tags?.map((t) => kebabCase(t)).includes(tag))
    : allPostsWithoutCodingTest;
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE);
  const tags = [...new Set(allPostsWithoutCodingTest.flatMap((post) => post.tags))].filter((v) => v !== null);
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  };

  return { props: { initialDisplayPosts, posts, pagination, sortedCategories, tags, tag: tag ? tag : 'all' } };
}

export default function Blog({ posts, initialDisplayPosts, pagination, sortedCategories, tags, tag }) {
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
        selectedTag={tag.toUpperCase()}
      />
    </>
  );
}
