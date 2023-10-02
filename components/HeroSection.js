'use client';
import React from 'react';
import Image from './Image';
import Link from './Link';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className='py-0 md:py-10'>
      <div className='flex w-full flex-col justify-between md:flex-row'>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className='prose order-2 col-span-8 w-full place-self-center justify-self-start text-center dark:prose-dark sm:text-left md:order-1 md:w-2/3'
        >
          <h1 className='mb-4 text-center text-3xl font-extrabold leading-normal text-white sm:text-4xl sm:leading-normal md:text-left lg:text-5xl lg:leading-normal xl:text-6xl xl:leading-normal'>
            <span className='bg-gradient-to-r from-primary-600 to-gray-300 bg-clip-text text-transparent dark:from-primary-400 dark:to-gray-600 dark:bg-clip-text dark:text-transparent'>
              안녕하세요, 저는
            </span>
            <br />
            <TypeAnimation
              sequence={[
                'Hyunoh Jo',
                1000,
                'Frontend Developer',
                1000,
                'React Developer',
                1500,
                'Next.js Developer',
                1500,
              ]}
              wrapper='span'
              speed={50}
              deletionSpeed={60}
              repeat={Infinity}
            />
            <br />
            <span className='bg-gradient-to-r from-primary-600 to-gray-300 bg-clip-text text-transparent dark:from-primary-400 dark:to-gray-600 dark:bg-clip-text dark:text-transparent'>
              입니다.
            </span>
          </h1>
          <p className='mb-6 text-center text-base text-gray-700 dark:text-[#ADB7BE] sm:text-sm md:text-left lg:text-lg xl:text-xl'>
            문제를 집요하게 몰입해 끝까지 파고드는 것을 좋아하며,
            <br /> 스스로 성장하는 것을 즐깁니다.
          </p>
          <div className='flex flex-col items-center gap-2 md:flex-row'>
            <Link href='#contact' className='w-full md:w-fit'>
              <button
                href='#contact'
                className='w-full rounded-full bg-gradient-to-br from-primary-500 to-gray-300 px-6 py-3 text-white hover:brightness-90 hover:filter dark:to-gray-500 md:w-fit'
              >
                Contact Me
              </button>
            </Link>
            <button className='w-full rounded-full bg-gradient-to-br from-primary-500 to-gray-300 px-1 py-1 text-white hover:brightness-90 dark:to-gray-500 md:w-fit'>
              <span className='block rounded-full bg-gray-100 px-5 py-2 dark:bg-gray-900'>Portfolio</span>
            </button>
            <button className='w-full rounded-full bg-gradient-to-br from-primary-500 to-gray-300 px-1 py-1 text-white hover:brightness-90 dark:to-gray-500 md:w-fit'>
              <span className='block rounded-full bg-gray-100 px-5 py-2 dark:bg-gray-900'>Download CV</span>
            </button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className='prose order-1 col-span-4 mt-4 mb-3 w-1/3 place-self-center dark:prose-dark sm:mb-0 md:order-2 md:place-self-start lg:mt-0'
        >
          <div className='box relative overflow-hidden rounded-full'>
            <Image
              src='/static/images/hyunoh.png'
              alt='hero image'
              className='absolute top-1/2 left-1/2'
              width={400}
              height={400}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
