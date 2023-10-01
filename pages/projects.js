import siteMetadata from '@/data/siteMetadata';
// import projectsData from '@/data/projectsData';
import { PageSEO } from '@/components/SEO';
import SectionContainer from '@/components/SectionContainer';
import React, { useState, useRef } from 'react';

import { motion, useInView } from 'framer-motion';
import ProjectCard from '@/components/ProjectCard';
import ProjectTag from '@/components/ProjectTag';

const projectsData = [
  {
    id: 1,
    title: 'React Portfolio Website',
    description: 'Project 1 description',
    image: '/static/images/projects/1.png',
    tag: ['All', 'Web'],
    gitUrl: '/',
    previewUrl: '/',
  },
  {
    id: 2,
    title: 'Potography Portfolio Website',
    description: 'Project 2 description',
    image: '/static/images/projects/2.png',
    tag: ['All', 'Web'],
    gitUrl: '/',
    previewUrl: '/',
  },
  {
    id: 3,
    title: 'E-commerce Application',
    description: 'Project 3 description',
    image: '/static/images/projects/3.png',
    tag: ['All', 'Web'],
    gitUrl: '/',
    previewUrl: '/',
  },
  {
    id: 4,
    title: 'Food Ordering Application',
    description: 'Project 4 description',
    image: '/static/images/projects/4.png',
    tag: ['All', 'Mobile'],
    gitUrl: '/',
    previewUrl: '/',
  },
  {
    id: 5,
    title: 'React Firebase Template',
    description: 'Authentication and CRUD operations',
    image: '/static/images/projects/5.png',
    tag: ['All', 'Web'],
    gitUrl: '/',
    previewUrl: '/',
  },
  {
    id: 6,
    title: 'Full-stack Roadmap',
    description: 'Project 5 description',
    image: '/static/images/projects/6.png',
    tag: ['All', 'Web'],
    gitUrl: '/',
    previewUrl: '/',
  },
];

export default function Projects() {
  const [tag, setTag] = useState('All');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) => project.tag.includes(tag));

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
                  title={project.title}
                  description={project.description}
                  imgUrl={project.image}
                  tags={project}
                  gitUrl={project.gitUrl}
                  previewUrl={project.previewUrl}
                />
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </SectionContainer>
  );
}
