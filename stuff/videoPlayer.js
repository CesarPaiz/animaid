import React from 'react';
import dynamic from 'next/dynamic';

const CustomVideoPlayer = dynamic(() => import('./videoCostructor'), {
  ssr: false,
});


const MyComponent = ({ videoURLmain, subsEspanish, subsEnglish }) => {
  return (
    <div>
      <CustomVideoPlayer subsES={subsEspanish} subsEN={subsEnglish} videoURL={videoURLmain} />
    </div>
  );
};

export default MyComponent;
