import { PageSEO } from '@/components/SEO';
import siteMetadata from '@/data/siteMetadata';
import { getAllFilesFrontMatter } from '@/lib/mdx';
import ListLayout from '@/layouts/ListLayout';
import { POSTS_PER_PAGE } from '../../blog';
import { getAllCategories } from '@/lib/categories';
import kebabCase from '@/lib/utils/kebabCase';

export async function getServerSideProps(context) {
  const {
    query: { page, tag },
  } = context;
  const allPosts = await getAllFilesFrontMatter('blog');
  const categories = await getAllCategories('blog');
  delete categories['coding-tests'];
  const sortedCategories = Object.keys(categories).sort((a, b) => categories[b] - categories[a]);
  const allPostsWithoutCodingTests = allPosts.filter((v) => v.categories?.indexOf('coding-tests') == -1);
  const posts = tag
    ? allPostsWithoutCodingTests.filter((post) => post.tags?.map((t) => kebabCase(t)).includes(tag))
    : allPostsWithoutCodingTests;
  const pageNumber = parseInt(page);
  const initialDisplayPosts = posts.slice(POSTS_PER_PAGE * (pageNumber - 1), POSTS_PER_PAGE * pageNumber);
  const tags = [...new Set(allPostsWithoutCodingTests.flatMap((post) => post.tags))].filter((v) => v !== null);
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  };

  return {
    props: {
      posts,
      initialDisplayPosts,
      pagination,
      sortedCategories,
      tags,
      tag: tag ? tag : 'all',
    },
  };
}

export default function PostPage({ posts, initialDisplayPosts, pagination, sortedCategories, tags, tag }) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
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
