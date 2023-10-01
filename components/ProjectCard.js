import React from 'react';
import { CodeBracketIcon, EyeIcon } from '@heroicons/react/24/outline';
import Link from './Link';

const ProjectCard = ({ imgUrl, title, description, gitUrl, previewUrl }) => {
  return (
    <div className='prose flex h-full flex-col dark:prose-dark'>
      <div
        className='group relative h-52 rounded-t-xl md:h-72'
        style={{ background: `url(${imgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className='overlay absolute top-0 left-0 hidden h-full w-full items-center justify-center bg-[#181818] bg-opacity-0 transition-all duration-500 group-hover:flex group-hover:bg-opacity-80'>
          <Link
            href={gitUrl}
            className='group/link relative mr-2 h-14 w-14 rounded-full border-2 border-[#ADB7BE] hover:border-white'
          >
            <CodeBracketIcon className='group-hover/link:text-white absolute top-1/2 left-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer text-[#ADB7BE]' />
          </Link>
          <Link
            href={previewUrl}
            className='group/link relative h-14 w-14 rounded-full border-2 border-[#ADB7BE] hover:border-white'
          >
            <EyeIcon className='group-hover/link:text-white absolute top-1/2 left-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer text-[#ADB7BE]' />
          </Link>
        </div>
      </div>
      <div className='box flex-auto rounded-b-xl py-4 px-4'>
        <h5 className='mb-2 text-xl font-semibold'>{title}</h5>
        <span>{description}</span>
      </div>
    </div>
  );
};

export default ProjectCard;
