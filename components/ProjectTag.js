import React from 'react';

const ProjectTag = ({ name, onClick, isSelected }) => {
  const buttonStyles = isSelected
    ? 'border-primary-500'
    : 'text-gray-500 border-slate-400 hover:border-gray-600 hover:text-gray-800 dark:hover:border-gray-400 dark:hover:text-gray-200';
  return (
    <button
      className={`${buttonStyles} cursor-pointer rounded-full border-2 px-4 py-2 text-xl md:px-6 md:py-3`}
      onClick={() => onClick(name)}
    >
      {name}
    </button>
  );
};

export default ProjectTag;
