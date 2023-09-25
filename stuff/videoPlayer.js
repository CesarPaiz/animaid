import React from 'react';
import dynamic from 'next/dynamic';

const CustomVideoPlayer = dynamic(() => import('./videoCostructor'), {
  ssr: false,
});


const MyComponent = ({ videoURLmain, subtitleURLmain }) => {
  return (
    <div>
      <CustomVideoPlayer subtitleURL={subtitleURLmain} videoURL={videoURLmain} />
    </div>
  );
};

export default MyComponent;
