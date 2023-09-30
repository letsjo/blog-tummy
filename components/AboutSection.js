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
      <ul className='flex list-none flex-wrap gap-3 pl-2 text-sm [&>li]:rounded-xl [&>li]:bg-primary-700 [&>li]:px-2 [&>li]:py-1 [&>li.backend]:bg-gray-700'>
        <li>React</li>
        <li>Next.js</li>
        <li>React-native</li>
        <li>React-native</li>
        <li className='backend'>Node.js</li>
        <li className='backend'>Flask</li>
      </ul>
    ),
  },
  {
    title: 'Languages',
    id: 'languages',
    content: (
      <ul className='flex list-none flex-wrap gap-3 pl-2 text-sm [&>li]:rounded-xl [&>li]:bg-slate-700 [&>li]:px-2 [&>li]:py-1 [&>li.backend]:bg-gray-700'>
        <li>JavaScript</li>
        <li>TypeScript</li>
        <li className='backend'>Python</li>
        <li className='backend'>C</li>
        <li className='backend'>Java</li>
      </ul>
    ),
  },
  {
    title: 'Education',
    id: 'education',
    content: (
      <ul className='list-disc pl-2 [&>li>span]:text-xs'>
        <li>
          크래프톤(krafton) 정글 수료 <span>(2023.04-2023.08)</span>
        </li>
        <li>
          원티드 프리온보딩 인턴십 수료 <span>(2023.02-2023.03)</span>
        </li>
        <li>
          스파르타코딩클럽 항해99 수료 <span>(2022.05-2022.09)</span>
        </li>
        <li>
          Australia browns school 어학연수 <span>(2016.10-2017.10)</span>
        </li>
        <li>
          계명대학교 기계공학과 졸업 <span>(2009.03-2023.02)</span>
        </li>
      </ul>
    ),
  },
  {
    title: 'Experience',
    id: 'experience',
    content: (
      <ul className='list-disc pl-2 [&>li>span]:text-xs'>
        <li>
          2023 SKT Prompt-er Day Seoul 본선 진출 🤖 <span>(2023.09)</span>
        </li>
        <li>
          Team Sparta 인턴 (개발자 매니지먼트 및 지도 교육 👨🏽‍💻) <span>(2022.12)</span>
        </li>
        <li>
          2022 Google Devfest Daegu : Hackathon 대상 수상 🏆 <span>(2022.12)</span>
        </li>
        <li>
          우아한테크코스 프리코스 최종 코딩테스트 👨🏻‍💻 <span>(2023.11)</span>
        </li>
        <li>
          해외 쇼핑몰 운영 및 매니징 경험 CEO 👑 <span>(2017.03~2022.01)</span>
        </li>
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState('education');
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
          <ul className='text-base lg:text-lg'>
            <li>다수의 UI 구현 및 서비스 운영 경험으로 사용자 인터렉션에 대한 높은 이해도</li>
            <li>다양한 Components 라이브러리 사용 경험 (MUI, Chakra UI, Tailwind css 등)</li>
            <li>코드 리펙토링만으로 50% 이상의 성능 향상을 이뤄낸 경험</li>
            <li>WebGL 라이브러리 three.js를 이용한 3D 웹 구현 개발</li>
            <li>Github Action을 통한 CI/CD 자동화 환경 구축</li>
            <li>Testing library로 테스트 주도 개발 (TDD)</li>
          </ul>
          <div className='mt-8 flex flex-row items-start justify-start'>
            <TabButton selectTab={() => handleTabChange('education')} active={tab === 'education'}>
              Education
            </TabButton>
            <TabButton selectTab={() => handleTabChange('experience')} active={tab === 'experience'}>
              Experience
            </TabButton>
            <TabButton selectTab={() => handleTabChange('skills')} active={tab === 'skills'}>
              Skills
            </TabButton>
            <TabButton selectTab={() => handleTabChange('languages')} active={tab === 'languages'}>
              Languages
            </TabButton>
          </div>
          <div className='mt-0'>{TAB_DATA.find((t) => t.id === tab).content}</div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
