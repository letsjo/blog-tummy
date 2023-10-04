import Link from 'next/link';
import kebabCase from '@/lib/utils/kebabCase';
import { useRouter } from 'next/router';

const TagButton = ({ text }) => {
  const { push, query } = useRouter();
  return (
    <button onClick={() => push({ query: { ...query, tag: kebabCase(text) } })}>{text.split(' ').join('-')}</button>
  );
};

export default TagButton;
