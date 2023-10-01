import siteMetadata from '@/data/siteMetadata';
import { PageSEO } from '@/components/SEO';
import SectionContainer from '@/components/SectionContainer';
import React, { useState, useRef } from 'react';

import { motion, useInView } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import ProjectTag from '@/components/ProjectTag';
import { DATABASE_ID, TOKEN } from 'config';

export async function getStaticProps() {
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      page_size: 100,
      sorts: [
        {
          property: '진행 기간',
          direction: 'descending',
        },
      ],
    }),
  };

  const response = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, options);
  const { results: projectsData } = await response.json();
  return {
    props: {
      projectsData,
    },
  };
}

export default function Projects({ projectsData }) {
  const [tag, setTag] = useState('All');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects =
    tag === 'All'
      ? projectsData
      : projectsData.filter((project) => project.properties['tag']['multi_select'].some((item) => item.name === tag));

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <SectionContainer>
      <PageSEO title={`Projects - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className='divide-y divide-gray-200 dark:divide-gray-700'>
        <div className='flex flex-row justify-between space-y-2 pt-6 md:space-y-5'>
          <h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14'>
            Projects
          </h1>
          <div className='flex flex-row items-center justify-center gap-2 py-6'>
            <ProjectTag onClick={handleTagChange} name='All' isSelected={tag === 'All'} />
            <ProjectTag onClick={handleTagChange} name='Web' isSelected={tag === 'Web'} />
            <ProjectTag onClick={handleTagChange} name='Mobile' isSelected={tag === 'Mobile'} />
          </div>
        </div>
        <div className='container py-6'>
          <ul ref={ref} className='grid gap-8 md:grid-cols-2 md:gap-12'>
            {filteredProjects.map((project, index) => (
              <motion.li
                key={project.id}
                variants={cardVariants}
                initial='initial'
                animate={isInView ? 'animate' : 'initial'}
                transition={{ duration: 0.3, delay: index * 0.2 }}
              >
                <ProjectCard
                  title={
                    (project.icon.emoji ? project.icon.emoji : '') +
                    project.properties['이름'].title.map((title) => title.plain_text).join('')
                  }
                  description={project.properties['한 줄 소개'].rich_text[0].plain_text}
                  imgUrl={project.cover.file?.url || project.cover.external.url}
                  tags={project.properties.Skills.multi_select}
                  gitUrl={project.properties['Github'].url}
                  previewUrl={project.public_url || ''}
                />
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </SectionContainer>
  );
}
