import React from 'react';

const ProfileCard = ({ icon, title, data }) => {
  return (
    <div className='flex flex-row items-center justify-start gap-3 px-3 py-5'>
      <div>{icon}</div>
      <div className='flex flex-col'>
        <h5 className='border-b-2 border-gray-400 text-xs font-semibold'>{title}</h5>
        <span className='break-all text-sm sm:text-base lg:text-sm xl:text-base'>{data}</span>
      </div>
    </div>
  );
};

export default ProfileCard;
