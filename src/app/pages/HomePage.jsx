import React from 'react';
import Image from 'next/image';
import myPicture from '../media/Jesse.jpg'
import CallToActionButton from '../components/CallToActionButton';
import { getLocale } from '../../config/locale';

function HomePage() {
  const { home } = getLocale();

  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center">
      <div className="container">
        <div className='d-flex justify-content-center my-3'>
          <Image src={myPicture} alt={home.imageAlt} role="presentation" className="me-2" style={{width: '200px', height: 'auto'}}/>
        </div>
        <h1>{home.heading}</h1>
        <h2>{home.subHeading}</h2>
        <p className="text-left">{home.content}</p>
        <div className='d-flex'>
          {/* @TODO: Uncomment this when the projects page is ready */}
          {/* <CallToActionButton url='/portfolio' text={home.ctaProjects} customClass='me-3' /> */} 
          <CallToActionButton url='/resume' text={home.ctaResume} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
