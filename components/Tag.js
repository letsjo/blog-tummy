import Link from 'next/link';
import kebabCase from '@/lib/utils/kebabCase';

const Tag = ({ text }) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`} passHref>
      <span className='mr-3 text-sm font-medium uppercase cursor-pointer  text-primary-500 hover:text-primary-600 dark:text-primary-500 dark:hover:text-primary-400'>
        {text.split(' ').join('-')}
      </span>
    </Link>
  );
};

export default Tag;
