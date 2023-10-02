import Link from './Link';
import kebabCase from '@/lib/utils/kebabCase';

const Category = ({ text }) => {
  return (
    <Link href={`/categories/${kebabCase(text)}`}>
      <div className='mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400'>
        {text.split(' ').join('-')}
      </div>
    </Link>
  );
};

export default Category;
