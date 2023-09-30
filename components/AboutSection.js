'use client';
import React, { useRef, useState } from 'react';
import Image from './Image';
import TabButton from './TabButton';
import { motion, useInView } from 'framer-motion';
import Animation from './Animation';
import imageDeveloper from '/public/static/animation-developer.json';

const TAB_DATA = [
  {
    title: 'Skills',
    id: 'skills',
    content: (
      <ul className='list-disc pl-2'>
        <li>Node.js</li>
        <li>Express</li>
        <li>PostgreSQL</li>
        <li>Sequelize</li>
        <li>JavaScript</li>
        <li>React</li>
      </ul>
    ),
  },
  {
    title: 'Education',
    id: 'education',
    content: (
      <ul className='list-disc pl-2'>
        <li>Fullstack Academy of Code</li>
        <li>University of California, Santa Cruz</li>
      </ul>
    ),
  },
  {
    title: 'Certifications',
    id: 'certifications',
    content: (
      <ul className='list-disc pl-2'>
        <li>AWS Cloud Practitioner</li>
        <li>Google Professional Cloud Developer</li>
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState('skills');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTabChange = (tabId) => {
    setTab(tabId);
  };

  const sectionVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <motion.section
      variants={sectionVariants}
      initial='initial'
      animate={isInView ? 'animate' : 'initial'}
      transition={{ duration: 0.5 }}
      ref={ref}
      className='text-white'
    >
      <div className='prose mx-auto mt-10 flex w-full max-w-3xl flex-col items-center gap-8 px-4 py-4 dark:prose-dark md:flex-row md:items-start xl:max-w-5xl xl:items-start xl:px-0 '>
        <Animation className='w-2/3 md:w-1/2' animationData={imageDeveloper} />
        <div className='mt-4 flex h-full w-full flex-col text-left md:mt-0 md:w-1/2'>
          <h2 className='mt-0 mb-4 text-4xl font-bold'>About Me</h2>
          <p className='text-base lg:text-lg'>
            I am a full stack web developer with a passion for creating interactive and responsive web applications. I
            have experience working with JavaScript, React, Redux, Node.js, Express, PostgreSQL, Sequelize, HTML, CSS,
            and Git. I am a quick learner and I am always looking to expand my knowledge and skill set. I am a team
            player and I am excited to work with others to create amazing applications.
          </p>
          <div className='mt-8 flex flex-row items-start justify-start'>
            <TabButton selectTab={() => handleTabChange('skills')} active={tab === 'skills'}>
              {' '}
              Skills{' '}
            </TabButton>
            <TabButton selectTab={() => handleTabChange('education')} active={tab === 'education'}>
              {' '}
              Education{' '}
            </TabButton>
            <TabButton selectTab={() => handleTabChange('certifications')} active={tab === 'certifications'}>
              {' '}
              Certifications{' '}
            </TabButton>
          </div>
          <div className='mt-0'>{TAB_DATA.find((t) => t.id === tab).content}</div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
