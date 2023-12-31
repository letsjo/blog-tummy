import Link from '@/components/Link';
import { PageSEO } from '@/components/SEO';
import Tag from '@/components/Tag';
import siteMetadata from '@/data/siteMetadata';
import { getAllFilesFrontMatter } from '@/lib/mdx';
import formatDate from '@/lib/utils/formatDate';
import { getAllCategories } from '@/lib/categories';

import NewsletterForm from '@/components/NewsletterForm';
import SectionContainer from '@/components/SectionContainer';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import EmailSection from '@/components/EmailSection';

const MAX_DISPLAY = 5;

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog');
  const filteredPosts = posts.filter((p) => p.categories?.indexOf('coding-tests') == -1);

  const categories = await getAllCategories('blog');

  return { props: { posts: filteredPosts, categories } };
}

export default function Home({ posts, categories }) {
  return (
    <SectionContainer>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <HeroSection />
      <AboutSection />
      <div className='divide-y divide-gray-200 dark:divide-gray-700'>
        <div className='pt-6 pb-8 space-y-2 md:space-y-5'>
          <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:leading-10 md:text-4xl md:leading-14 lg:text-6xl'>
            Latest
          </h1>
        </div>
        <ul className='divide-y divide-gray-200 dark:divide-gray-700'>
          {!posts.length && (
            <div className='flex justify-center py-10 text-2xl font-semibold text-gray-500'>
              포스트를 찾을 수 없습니다.
            </div>
          )}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter;
            return (
              <li key={slug} className='py-12'>
                <article>
                  <div className='space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0'>
                    <dl>
                      <dt className='sr-only'>Published on</dt>
                      <dd className='text-base font-medium leading-6 text-gray-500 dark:text-gray-400'>
                        <time dateTime={date}>{formatDate(date)}</time>
                      </dd>
                    </dl>
                    <div className='space-y-5 xl:col-span-3'>
                      <div className='space-y-6'>
                        <div>
                          <h2 className='text-2xl font-bold leading-8 tracking-tight'>
                            <Link href={`/blog/${slug}`} className='text-gray-900 dark:text-gray-100'>
                              {title}
                            </Link>
                          </h2>
                          <div className='flex flex-wrap'>
                            {tags?.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className='prose text-gray-500 max-w-none dark:text-gray-400'>{summary}</div>
                      </div>
                      <div className='text-base font-medium leading-6'>
                        <Link
                          href={`/blog/${slug}`}
                          className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
                          aria-label={`Read "${title}"`}
                        >
                          더보기 &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className='flex justify-end text-base font-medium leading-6'>
          <Link
            href='/blog'
            className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'
            aria-label='all posts'
          >
            전체 포스트 &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter.provider !== '' && (
        <div className='flex items-center justify-center pt-4'>
          <NewsletterForm />
        </div>
      )}
      <EmailSection />
    </SectionContainer>
  );
}
