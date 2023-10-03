import React from 'react';

const ProfileCard = ({ icon, title, data }) => {
  return (
    <div className='flex flex-row items-center justify-start gap-3 px-3 py-3'>
      <div>{icon}</div>
      <div className='flex flex-col'>
        <h5 className='text-xs font-semibold border-b-2 border-gray-400'>{title}</h5>
        <span className='text-sm break-all sm:text-base lg:text-sm xl:text-base'>{data}</span>
      </div>
    </div>
  );
};

export default ProfileCard;
