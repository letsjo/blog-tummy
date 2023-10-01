import { TagSEO } from '@/components/SEO';
import siteMetadata from '@/data/siteMetadata';
import ListLayout from '@/layouts/ListLayout';
import { getAllCategories } from '@/lib/categories';
import generateRss from '@/lib/generate-rss';
import { getAllFilesFrontMatter } from '@/lib/mdx';
import kebabCase from '@/lib/utils/kebabCase';

const root = process.cwd();

export async function getStaticPaths() {
  const categories = await getAllCategories('blog');
  const paths = Object.keys(categories).map((category) => ({
    params: {
      category,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const allPosts = await getAllFilesFrontMatter('blog');
  const categories = await getAllCategories('blog');
  delete categories['memo'];
  const sortedCategories = Object.keys(categories).sort((a, b) => categories[b] - categories[a]);
  const posts = allPosts.filter(
    (post) => post.draft !== true && post.categories?.map((t) => kebabCase(t)).includes(params.category),
  );
  // const posts = allPosts.filter((v) => v.categories?.indexOf('memo') == -1);

  return { props: { posts, category: params.category, sortedCategories } };
}

export default function Category({ posts, category, sortedCategories }) {
  // Capitalize first letter and convert space to dash
  return (
    <>
      <ListLayout posts={posts} category={category} sortedCategories={sortedCategories} />
    </>
  );
}
