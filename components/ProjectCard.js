import React from 'react';
import { CodeBracketIcon, EllipsisHorizontalIcon, WindowIcon, FilmIcon } from '@heroicons/react/24/outline';
import Link from './Link';
import Tilt from 'react-tilt';

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
  tags,
  end,
}) => {
  return (
    <Tilt options={{ max: 45, scale: 1, speed: 450 }} className='group flex flex-col h-full prose dark:prose-dark'>
      <div
        className='relative h-52 rounded-t-xl md:h-72'
        style={{ background: `url(${imgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className='overlay absolute top-0 left-0 hidden h-full w-full items-center justify-center bg-[#181818] bg-opacity-0 transition-all duration-500 group-hover:flex group-hover:bg-opacity-80'>
          {gitUrl && (
            <Link
              href={gitUrl}
              className='group/link relative mr-2 h-12 w-12 rounded-full border-2 border-[#ADB7BE] hover:border-white'
            >
              <CodeBracketIcon className='icon group-hover/link:text-white absolute top-1/2 left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer text-[#ADB7BE]' />
            </Link>
          )}
          {deployUrl && (
            <Link
              href={deployUrl}
              className='group/link relative mr-2 h-12 w-12 rounded-full border-2 border-[#ADB7BE] hover:border-white'
            >
              <WindowIcon className='icon group-hover/link:text-white absolute top-1/2 left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer text-[#ADB7BE]' />
            </Link>
          )}
          {youtubeUrl && (
            <Link
              href={youtubeUrl}
              className='group/link relative mr-2 h-12 w-12 rounded-full border-2 border-[#ADB7BE] hover:border-white'
            >
              <FilmIcon className='icon group-hover/link:text-white absolute top-1/2 left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer text-[#ADB7BE]' />
            </Link>
          )}
          {previewUrl && (
            <Link
              href={previewUrl}
              className='group/link relative h-12 w-12 rounded-full border-2 border-[#ADB7BE] hover:border-white'
            >
              <EllipsisHorizontalIcon className='icon group-hover/link:text-white absolute top-1/2 left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer text-[#ADB7BE]' />
            </Link>
          )}
        </div>
      </div>
      <div className='box flex-auto px-4 py-4 rounded-b-xl'>
        <h5 className='mb-2 text-xl font-semibold tracking-wide'>{title}</h5>
        <p className='my-0 tracking-tight'>{description}</p>
        <span className='text-sm tracking-tighter'>{activity}</span>
        <br />
        <span className='text-sm tracking-tighter'>
          {start} ~ {end}
        </span>
        <div className='flex flex-wrap gap-2 mt-2'>
          {tags.map((tag) => (
            <h4
              key={`${tag.id}`}
              style={{ color: '#fff', backgroundColor: `${tag.color}`, opacity: 0.75 }}
              className={`px-2 py-1 rounded-full text-[14px] m-0`}
            >
              #{tag.name}
            </h4>
          ))}
        </div>
      </div>
    </Tilt>
  );
};

export default ProjectCard;
