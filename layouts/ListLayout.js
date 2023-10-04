import Link from '@/components/Link';
import Tag from '@/components/Tag';
import { useState } from 'react';
import Pagination from '@/components/Pagination';
import formatDate from '@/lib/utils/formatDate';
import SectionContainer from '@/components/SectionContainer';
import TagButton from '@/components/TagButton';

export default function ListLayout({
  posts,
  initialDisplayPosts = [],
  pagination,
  category,
  sortedCategories,
  selectedTag,
  tags,
}) {
  const [searchValue, setSearchValue] = useState('');
  const isSelected = 'inline-block bg-primary-500 py-1 px-3 text-white text-lg';
  const isNotSelected =
    'border-primary inline-block py-1 px-3 text-gray-500 hover:text-white hover:border-primary-500 hover:bg-primary-500 text-lg';

  const isSelectedTags = 'inline-block bg-primary-500 py-1 px-3 text-white';
  const isNotSelectedTags =
    'border-primary inline-block py-1 px-3 text-gray-500 hover:text-white hover:border-primary-500 hover:bg-primary-500 ';

  const filteredBlogPosts = posts.filter((frontMatter) => {
    const searchContent = frontMatter.title + frontMatter.summary + frontMatter.tags?.join(' ');
    return searchContent.toLowerCase().includes(searchValue.toLowerCase());
  });

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts = initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts;

  const title = category ? category[0].toUpperCase() + category.split(' ').join('-').slice(1) : 'all';

  return (
    <SectionContainer>
      <div className='divide-y divide-gray-200 dark:divide-gray-700'>
        <div className='pt-6 pb-8 space-y-2 md:space-y-5'>
          <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14'>
            {category === 'all' ? 'Blog' : title}
          </h1>
          {sortedCategories && category !== 'memo' && (
            <>
              <ul className='flex flex-wrap items-center text-base'>
                <li className='sm:block' key={'all'}>
                  <Link className={`${category === 'all' ? isSelected : isNotSelected}`} href='/blog'>
                    all
                  </Link>
                </li>
                {sortedCategories.map((cate) => (
                  <li className='block' key={cate}>
                    <Link className={`${category === cate ? isSelected : isNotSelected}`} href={`/categories/${cate}`}>
                      {cate}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
          <div className='relative max-w-lg'>
            <input
              aria-label='게시글 검색'
              type='text'
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder='게시글 검색'
              className='block w-full px-4 py-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100'
            />
            <svg
              className='absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
          </div>
        </div>
        {tags?.length > 0 && (
          <>
            <h4 className='text-base text-gray-400'>관련키워드</h4>
            <ul className='flex flex-wrap gap-1'>
              <li className='sm:block' key={'all'}>
                <Link
                  className={`${selectedTag === 'ALL' ? isSelected : isNotSelected}`}
                  href={category === 'all' ? '/blog' : `/categories/${category}`}
                >
                  all
                </Link>
              </li>
              {tags.map((tag) => (
                <li key={tag} className={`${tag.toUpperCase() === selectedTag ? isSelectedTags : isNotSelectedTags}`}>
                  <TagButton text={tag} />
                </li>
              ))}
            </ul>
          </>
        )}
        <ul>
          {!filteredBlogPosts.length && (
            <div className='flex justify-center py-10 text-2xl font-semibold text-gray-500'>
              포스트를 찾을 수 없습니다.
            </div>
          )}
          {displayPosts.map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter;
            return (
              <li key={slug} className='py-4'>
                <article className='space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0'>
                  <dl>
                    <dt className='sr-only'>Published on</dt>
                    <dd className='text-base font-medium leading-6 text-gray-500 dark:text-gray-400'>
                      <time dateTime={date}>{formatDate(date)}</time>
                    </dd>
                  </dl>
                  <div className='space-y-3 xl:col-span-3'>
                    <div className='flex flex-col gap-2'>
                      <h3 className='text-2xl font-bold leading-8 tracking-tight'>
                        <Link href={`/blog/${slug}`} className='text-gray-900 dark:text-gray-100'>
                          {title}
                        </Link>
                      </h3>
                      <div className='flex flex-wrap'>
                        {tags?.map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </div>
                    </div>
                    <div className='prose text-gray-500 max-w-none dark:text-gray-400'>{summary}</div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </SectionContainer>
  );
}
