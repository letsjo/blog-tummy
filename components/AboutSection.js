import React, { useRef, useState } from 'react';
import TabButton from './TabButton';
import { motion, useInView } from 'framer-motion';
import Animation from './Animation';
import imageDeveloper from '/public/static/animation-developer.json';
import ProfileCard from './ProfileCard';
import {
  UserCircleIcon,
  CakeIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  BriefcaseIcon,
} from '@heroicons/react/24/solid';

const TAB_DATA = [
  {
    title: 'Profile',
    id: 'profile',
    content: (
      <div className='grid grid-cols-1 gap-0 pt-5'>
        <ProfileCard icon={<UserCircleIcon className='w-10 h-10' />} title='NAME' data='조현오' />
        <ProfileCard icon={<MapPinIcon className='w-10 h-10' />} title='ADDRESS' data='서울' />
        <ProfileCard icon={<PhoneIcon className='w-10 h-10' />} title='PHONE' data='010-2077-7780' />
        <ProfileCard icon={<EnvelopeIcon className='w-10 h-10' />} title='EMAIL' data='hyunoh.jo@gmail.com' />
        {/* <ProfileCard icon={<MapPinIcon className='w-10 h-10' />} title='GITHUB' data='서울' />
        <ProfileCard icon={<MapPinIcon className='w-10 h-10' />} title='LINKEDIN' data='서울' /> */}
      </div>
    ),
  },
  {
    title: 'Skills',
    id: 'skills',
    content: (
      <ul className='tagBox flex flex-wrap gap-2'>
        <li className='frontend'>React</li>
        <li className='frontend'>Next.js</li>
        <li className='frontend'>React-native</li>
        <li className='frontend'>TypeScript</li>
        <li className='frontend'>JavaScript</li>
        <li className='backend'>Node.js</li>
        <li className='backend'>Flask</li>
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
      <ul className='[&>li>span]:text-xs list-disc pl-2'>
        <li>
          크래프톤(krafton) 정글 수료 <span>/ 2023.04-2023.08</span>
        </li>
        <li>
          원티드 프리온보딩 인턴십 수료 <span>/ 2023.02-2023.03</span>
        </li>
        <li>
          스파르타코딩클럽 항해99 수료 <span>/ 2022.05-2022.09</span>
        </li>
        <li>
          Australia browns school 어학연수 <span>/ 2016.10-2017.10</span>
        </li>
        <li>
          계명대학교 기계공학과 졸업 <span>/ 2009.03-2023.02</span>
        </li>
      </ul>
    ),
  },
  {
    title: 'Experience',
    id: 'experience',
    content: (
      <ul className='[&>li>span]:text-xs list-disc pl-2'>
        <li>
          2023 SKT Prompt-er Day Seoul 본선 진출 🤖 <span>/ 2023.09</span>
        </li>
        <li>
          Team Sparta 인턴 (개발자 매니지먼트 및 지도 교육 👨🏽‍💻) <span>/ 2022.12</span>
        </li>
        <li>
          2022 Google Devfest Daegu : Hackathon 대상 수상 🏆 <span>/ 2022.12</span>
        </li>
        <li>
          우아한테크코스 프리코스 최종 코딩테스트 👨🏻‍💻 <span>/ 2023.11(2개월)</span>
        </li>
        <li>
          해외 쇼핑몰 운영 및 매니징 경험 CEO 👑 <span>/ 2017.03~2022.01 (약 5년)</span>
        </li>
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState('profile');
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
      <div className='flex flex-col items-center w-full max-w-3xl gap-8 px-4 py-4 mx-auto prose dark:prose-dark md:flex-row md:items-start xl:max-w-5xl xl:items-start xl:px-0 '>
        <Animation className='hidden w-1/2 md:block' animationData={imageDeveloper} />
        <div className='flex flex-col w-full h-full mt-4 text-left md:mt-0 md:w-1/2'>
          <div className='flex flex-row items-start justify-start mt-8 text-sm md:text-lg '>
            <TabButton selectTab={() => handleTabChange('profile')} active={tab === 'profile'}>
              Profile
            </TabButton>
            <TabButton selectTab={() => handleTabChange('skills')} active={tab === 'skills'}>
              Skills
            </TabButton>
            <TabButton selectTab={() => handleTabChange('education')} active={tab === 'education'}>
              Education
            </TabButton>
            <TabButton selectTab={() => handleTabChange('experience')} active={tab === 'experience'}>
              Experience
            </TabButton>
          </div>
          <div className='mt-0'>{TAB_DATA.find((t) => t.id === tab).content}</div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
