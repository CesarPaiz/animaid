import React from 'react';
import dynamic from 'next/dynamic';

const CustomVideoPlayer = dynamic(() => import('./videoCostructor'), {
  ssr: false,
});


const MyComponent = ({  subsEspanish, subsEnglish, videoURLmain}) => {
  return (
    <div>
      <CustomVideoPlayer subsES={subsEspanish} subsEN={subsEnglish} videoURL={videoURLmain} />
    </div>
  );
};

export default MyComponent;
