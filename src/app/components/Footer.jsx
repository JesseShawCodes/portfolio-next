"use client"

import { React } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faInstagram, faLinkedin, faXTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

function Footer() {
  return (
    <div className="bg-gradient-my-gradient-footer">
      <footer className="container py-3 my-4" role="contentinfo">
        <div className="d-flex align-items-center justify-content-lg-between w-100">
          <div className="mb-3 mb-md-0">© 2025 {process.env.NEXT_PUBLIC_NAME}</div>
          <ul className="mb-3 mb-md-0 nav list-unstyled">
            <li className="ms-3"><a className="text-body-secondary" href="mailto:JesseShawCodes@gmail.com.com" title="Email me" target="_blank"><FontAwesomeIcon icon={faEnvelope} /></a></li>
            <li className="ms-3"><a className="text-body-secondary" href="https://www.instagram.com/jesseshawcodes/" title="Instagram" target="_blank"><FontAwesomeIcon icon={faInstagram} /></a></li>
            <li className="ms-3"><a className="text-body-secondary" href="https://www.linkedin.com/in/itsjesseshaw/" title="LinkedIn" target="_blank"><FontAwesomeIcon icon={faLinkedin} /></a></li>
            <li className="ms-3"><a className="text-body-secondary" href="https://x.com/jesseshawcodes" title="Twitter" target="_blank"><FontAwesomeIcon icon={faXTwitter} /></a></li>
            <li className="ms-3"><a className="text-body-secondary" href="http://github.com/jesseShawCodes" title="GitHub" target="_blank"><FontAwesomeIcon icon={faGithub} /></a></li>

          </ul>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
