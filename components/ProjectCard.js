import React from 'react';
import { CodeBracketIcon, EllipsisHorizontalIcon, WindowIcon, PlayIcon } from '@heroicons/react/24/outline';
import Link from './Link';

const ProjectCard = ({
  imgUrl,
  title,
  description,
  youtubeUrl,
  deployUrl,
  gitUrl,
  previewUrl,
  activity,
  start,
  end,
}) => {
  return (
    <div className='group prose flex h-full flex-col dark:prose-dark'>
      <div
        className='relative h-52 rounded-t-xl md:h-72'
        style={{ background: `url(${imgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className='overlay absolute top-0 left-0 hidden h-full w-full items-center justify-center bg-[#181818] bg-opacity-0 transition-all duration-500 group-hover:flex group-hover:bg-opacity-80'>
          {gitUrl && (
            <Link
              href={gitUrl}
              className='relative mr-2 h-12 w-12 rounded-full border-2 border-[#ADB7BE] hover:border-white [&>.icon]:hover:text-white'
            >
              <CodeBracketIcon className='icon absolute top-1/2 left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer text-[#ADB7BE]' />
            </Link>
          )}
          {youtubeUrl && (
            <Link
              href={youtubeUrl}
              className='relative mr-2 h-12 w-12 rounded-full border-2 border-[#ADB7BE] hover:border-white [&>.icon]:hover:text-white'
            >
              <PlayIcon className='icon absolute top-1/2 left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer text-[#ADB7BE]' />
            </Link>
          )}
          {deployUrl && (
            <Link
              href={deployUrl}
              className='relative mr-2 h-12 w-12 rounded-full border-2 border-[#ADB7BE] hover:border-white [&>.icon]:hover:text-white'
            >
              <WindowIcon className='icon absolute top-1/2 left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer text-[#ADB7BE]' />
            </Link>
          )}
          {previewUrl && (
            <Link
              href={previewUrl}
              className='relative h-12 w-12 rounded-full border-2 border-[#ADB7BE] hover:border-white [&>.icon]:hover:text-white'
            >
              <EllipsisHorizontalIcon className='icon absolute top-1/2 left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer text-[#ADB7BE]' />
            </Link>
          )}
        </div>
      </div>
      <div className='box flex-auto rounded-b-xl py-4 px-4'>
        <h5 className='mb-2 text-xl font-semibold tracking-wide'>{title}</h5>
        <p className='my-0 tracking-tight'>{description}</p>
        <span className='text-sm tracking-tighter'>{activity}</span>
        <br />
        <span className='text-sm tracking-tighter'>
          {start} ~ {end}
        </span>
      </div>
    </div>
  );
};

export default ProjectCard;
