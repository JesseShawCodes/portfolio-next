import React from 'react';
import Image from 'next/image';
import myPicture from '../media/Jesse.jpg'
import PropTypes from 'prop-types';
import CallToActionButton from '../components/CallToActionButton';

function HomePage({
  homeHeading = 'My name is Jesse. I am a Full Stack Developer',
  homeSubHeading = 'From logic to layout, my goal is to build experiences in my work that feel good to use and are fun to share.',
  homeContent = "I am a Full Stack Developer currently working on a Learning Management System application at Amentum. I love coding not just for the challenge, but because it is a form of creation - taking ideas from sketch to screen. Whether it's crafting clean APIs or intuitive front ends, I enjoy the whole stack. I am passionate about collaborating with developers, designers, and big thinkers who care about quality and aren't afraid to experiment. If you are someone who builds with curiosity and purpose, we will probably get along just great.",
}) {
  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center bg-gradient-my-gradient">
      <div className="container">
        <div className='d-flex justify-content-center my-3'>
          <Image src={myPicture} alt="Dadgad logo" role="presentation" className="me-2" style={{width: '200px', height: 'auto'}}/>
        </div>
        <h1>{homeHeading}</h1>
        <h2>{homeSubHeading}</h2>
        <p className="text-left">{homeContent}</p>
        <div className='d-flex'>
          <CallToActionButton url='/portfolio' text='Projects I am working on' customClass='me-3' />          
          <CallToActionButton url='/resume' text='My Resume' />
        </div>
      </div>
    </div>
  );
}

export default HomePage;

HomePage.propTypes = {
  homeHeading: PropTypes.string.isRequired,
  homeSubHeading: PropTypes.string.isRequired,
  homeContent: PropTypes.string.isRequired,
};
