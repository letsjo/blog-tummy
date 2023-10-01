import Link from '@/components/Link';
import PageTitle from '@/components/PageTitle';
import SectionContainer from '@/components/SectionContainer';
import { BlogSEO } from '@/components/SEO';
import Image from '@/components/Image';
import Tag from '@/components/Tag';
import siteMetadata from '@/data/siteMetadata';
import Comments from '@/components/comments';
import ScrollTopAndComment from '@/components/ScrollTopAndComment';
import moment from 'moment';

const editUrl = (fileName) => `${siteMetadata.siteRepo}/blob/master/data/blog/${fileName}`;
const discussUrl = (slug) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/blog/${slug}`)}`;

const postDateTemplate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

export default function PostLayout({ frontMatter, authorDetails, next, prev, children }) {
  const { slug, fileName, date, title, images, tags } = frontMatter;

  return (
    <SectionContainer>
      <BlogSEO url={`${siteMetadata.siteUrl}/blog/${slug}`} authorDetails={authorDetails} {...frontMatter} />
      <ScrollTopAndComment />
      <article className='prose flex max-w-none flex-col pt-6 dark:prose-dark'>
        <h1 className='mb-4 text-3xl font-bold md:text-5xl '>{title}</h1>
        <div className=' border-muted border-b-[1px] pb-4 '>
          <div className='mt-0 flex flex-col items-start justify-between md:flex-row md:items-center'>
            <div className='flex items-center'>
              <p className='text-subtle m-0'>
                {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
              </p>
            </div>
          </div>
          <div className='mt-2 flex flex-wrap gap-3'>
            {tags?.map((tag) => (
              <Tag key={tag} text={tag} />
            ))}
          </div>
        </div>
        <div className='mt-8 max-w-none'>{children}</div>
        {(prev || next) && (
          <div className='box rounded-lg p-4 '>
            <div className='flex flex-row'>
              {prev ? (
                <div className='w-1/2'>
                  <h2 className='text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400'>이전글</h2>
                  <div className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'>
                    <Link href={`/blog/${prev.slug}`}>{prev.title}</Link>
                  </div>
                </div>
              ) : (
                <div className='w-1/2'></div>
              )}
              {next ? (
                <div className='w-1/2 text-right'>
                  <h2 className='text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400'>다음글</h2>
                  <div className='text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'>
                    <Link href={`/blog/${next.slug}`}>{next.title}</Link>
                  </div>
                </div>
              ) : (
                <div className='w-1/2'></div>
              )}
            </div>
          </div>
        )}
        <div className='mt-2'>
          <Comments frontMatter={frontMatter} />
        </div>
      </article>
    </SectionContainer>
  );
}
