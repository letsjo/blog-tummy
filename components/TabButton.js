import React from 'react';
import { motion } from 'framer-motion';

const TabButton = ({ active, selectTab, children }) => {
  const buttonClasses = active ? 'text-black dark:text-white' : 'text-[#ADB7BE] dark:text-[#ADB7BE]';

  const variants = {
    default: { width: 0 },
    active: { width: 'calc(95% - 0.75rem)' },
  };

  return (
    <button onClick={selectTab}>
      <p className={`my-0 mr-3 font-semibold hover:text-black dark:hover:text-white ${buttonClasses}`}>{children}</p>
      <motion.div
        animate={active ? 'active' : 'default'}
        variants={variants}
        className='mt-2 mr-3 h-1 bg-primary-500'
      ></motion.div>
    </button>
  );
};

export default TabButton;
