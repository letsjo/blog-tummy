import Link from 'next/link';
import kebabCase from '@/lib/utils/kebabCase';
import { useRouter } from 'next/router';

const TagButton = ({ text }) => {
  const { push, query } = useRouter();

  const changeQuery = query.page ? { tag: kebabCase(text), page: 1 } : { ...query, tag: kebabCase(text) };

  return <button onClick={() => push({ query: changeQuery })}>{text.split(' ').join('-')}</button>;
};

export default TagButton;
