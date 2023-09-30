'use client';
import React from 'react';
import Image from './Image';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className='py-10'>
      <div className='flex flex-col sm:flex-row'>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className='prose order-2 col-span-8 place-self-center justify-self-start text-center dark:prose-dark sm:order-1 sm:text-left'
        >
          <h1 className='mb-4 text-3xl font-extrabold text-white sm:text-4xl lg:text-6xl lg:leading-normal'>
            <span className='bg-gradient-to-r from-primary-500 to-gray-500 bg-clip-text text-transparent dark:from-primary-400 dark:to-gray-600 dark:bg-clip-text dark:text-transparent'>
              Hello, I&apos;m{' '}
            </span>
            <br></br>
            <TypeAnimation
              sequence={[
                'Tummy',
                1000,
                'Web Developer',
                1000,
                'Frontend Developer',
                1500,
                'used to React, Next.js',
                1500,
              ]}
              wrapper='span'
              speed={50}
              repeat={Infinity}
            />
          </h1>
          <p className='mb-6 text-base text-gray-700 dark:text-[#ADB7BE] sm:text-lg lg:text-xl'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
          </p>
          <div>
            <button className='mr-4 w-full rounded-full bg-gradient-to-br from-primary-500 to-gray-500 px-6 py-3 text-white hover:bg-slate-200 sm:w-fit'>
              Hire Me
            </button>
            <button className='mt-3 w-full rounded-full bg-gradient-to-br from-primary-500 to-gray-500 px-1 py-1 text-white hover:bg-slate-800 sm:w-fit'>
              <span className='block rounded-full bg-gray-100 px-5 py-2 hover:bg-slate-200 dark:bg-gray-900 dark:hover:bg-slate-800'>
                Download CV
              </span>
            </button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className='prose order-1 col-span-4 mt-4 mb-3 place-self-center dark:prose-dark sm:order-2 sm:mb-0 lg:mt-0'
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
