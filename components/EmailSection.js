import React, { useRef, useState } from 'react';
import GithubIcon from '/public/static/images/github-icon.svg';
import LinkedinIcon from '/public/static/images/linkedin-icon.svg';
import Link from './Link';
import Image from './Image';
import siteMetadata from '@/data/siteMetadata';
import emailjs from '@emailjs/browser';

const EmailSection = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [result, setResult] = useState('');
  const form = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      emailjs.sendForm(
        process.env.NEXT_PUBLIC_MAIL_SERVER_KEY,
        process.env.NEXT_PUBLIC_MAIL_TEMPLATE_KEY,
        form.current,
        process.env.NEXT_PUBLIC_MAIL_PUBLIC_KEY,
      );
      setResult('이메일 전송이 완료되었습니다.');
      setEmailSubmitted(true);
    } catch (error) {
      setResult('전송에 실패하였습니다.');
      setEmailSubmitted(true);
      console.log(error);
    }
  };

  return (
    <section id='contact' className='relative grid gap-4 py-0 my-0 md:my-12 md:grid-cols-2'>
      <div>
        <h5 className='my-2 text-xl font-bold'>Let&rsquo;s Connect</h5>
        <p className='max-w-md mb-4 text-base md:text-xs xl:text-lg'>
          <div>
            <p>새로운 기회를 찾고 있습니다 👀</p>
            <p>제안서📝 또는 간단한 커피챗☕좋습니다.</p>
            <p>그냥 인사👋🏻 메세지도 좋습니다.</p>
          </div>
        </p>
        <div className='socials flex flex-row gap-2 brightness-0 filter dark:brightness-100'>
          {siteMetadata.github && (
            <Link href={siteMetadata.github}>
              <Image src={GithubIcon} alt='Github' />
            </Link>
          )}
          {siteMetadata.linkedin && (
            <Link href={siteMetadata.linkedin}>
              <Image src={LinkedinIcon} alt='Linkedin' />
            </Link>
          )}
        </div>
      </div>
      <div>
        {emailSubmitted ? (
          <p className='flex flex-col mt-2 text-xl'>
            {result}
            <button
              onClick={() => setEmailSubmitted(false)}
              className='px-1 py-1 mt-5 text-white rounded-full bg-gradient-to-br from-primary-500 to-gray-300 hover:brightness-90 dark:to-gray-500'
            >
              재 전송하기
            </button>
          </p>
        ) : (
          <form className='flex flex-col' ref={form} onSubmit={handleSubmit}>
            <div className='mb-6'>
              <label htmlFor='email' className='block mb-2 text-sm font-medium'>
                Your email
              </label>
              <input
                name='email'
                type='email'
                id='email'
                required
                className='block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900 placeholder-[#9CA2A9] focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100'
                placeholder='someone@google.com'
              />
            </div>
            <div className='mb-6'>
              <label htmlFor='subject' className='block mb-2 text-sm font-medium'>
                Your name
              </label>
              <input
                name='name'
                type='text'
                id='name'
                required
                className='block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900 placeholder-[#9CA2A9] focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100'
                placeholder='Tummy Jo'
              />
            </div>
            <div className='mb-6'>
              <label htmlFor='message' className='block mb-2 text-sm font-medium'>
                Message
              </label>
              <textarea
                name='message'
                id='message'
                className='block h-28 w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900 placeholder-[#9CA2A9] focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100'
                placeholder="Let's talk about..."
              />
            </div>
            <button
              type='submit'
              className='w-full rounded-lg bg-primary-500 py-2.5 px-5 font-medium text-white hover:bg-primary-600'
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default EmailSection;
