'use client';
import React from 'react';
import Image from './Image';
import { TypeAnimation } from 'react-type-animation';

const HeroSection = () => {
  return (
    <section className='py-16'>
      <div className='grid grid-cols-1 sm:grid-cols-12'>
        <div className='order-2 col-span-8 place-self-center justify-self-start text-center sm:order-1 sm:text-left'>
          <h1 className='mb-4 text-3xl font-extrabold text-white sm:text-4xl lg:text-6xl lg:leading-normal'>
            <span className='bg-gradient-to-r from-primary-400 to-gray-600 bg-clip-text text-transparent'>
              Hello, I&apos;m{' '}
            </span>
            <br></br>
            <TypeAnimation
              sequence={['Tummy', 1000, 'Web Developer', 1000, 'Mobile Developer', 1000, 'UI/UX Designer', 1000]}
              wrapper='span'
              speed={50}
              repeat={Infinity}
            />
          </h1>
          <p className='mb-6 text-base text-[#ADB7BE] sm:text-lg lg:text-xl'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
          </p>
          <div>
            <button className='mr-4 w-full rounded-full bg-gradient-to-br from-primary-500 to-gray-500 px-6 py-3 text-white hover:bg-slate-200 sm:w-fit'>
              Hire Me
            </button>
            <button className='mt-3 w-full rounded-full bg-gradient-to-br from-primary-500 to-gray-500 px-1 py-1 text-white hover:bg-slate-800 sm:w-fit'>
              <span className='block rounded-full bg-[#121212] px-5 py-2 hover:bg-slate-800'>Download CV</span>
            </button>
          </div>
        </div>
        <div className='order-1 col-span-4 mt-4 mb-3 place-self-center sm:order-2 sm:mb-0 lg:mt-0'>
          <div className='relative rounded-full bg-[#424242] '>
            <Image
              src='/static/images/hero-image.png'
              alt='hero image'
              className='absolute top-1/2 left-1/2'
              width={300}
              height={300}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
