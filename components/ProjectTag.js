import React from 'react';

const ProjectTag = ({ name, onClick, isSelected }) => {
  const buttonStyles = isSelected ? 'border-primary-500' : 'text-gray-500 border-slate-500';
  return (
    <button
      className={`${buttonStyles} cursor-pointer rounded-full border-2 px-6 py-3 text-xl`}
      onClick={() => onClick(name)}
    >
      {name}
    </button>
  );
};

export default ProjectTag;
