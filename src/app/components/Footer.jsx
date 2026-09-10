"use client"

import { React } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faInstagram, faLinkedin, faXTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { getLocale } from '../../config/locale';

function Footer() {
  const { site, footer } = getLocale();
  const siteName = process.env.NEXT_PUBLIC_NAME || site.name;
  const { social } = footer;

  return (
    <div className="bg-gradient-my-gradient-footer">
      <footer className="container py-3 my-4" role="contentinfo">
        <div className="d-flex align-items-center justify-content-lg-between w-100">
          <div className="mb-3 mb-md-0">© 2026 {siteName}</div>
          <ul className="mb-3 mb-md-0 nav list-unstyled">
            <li className="ms-3"><a className="text-body-secondary" href={`mailto:${footer.email}`} title={footer.emailTitle} target="_blank"><FontAwesomeIcon icon={faEnvelope} /></a></li>
            <li className="ms-3"><a className="text-body-secondary" href={social.instagram.url} title={social.instagram.title} target="_blank"><FontAwesomeIcon icon={faInstagram} /></a></li>
            <li className="ms-3"><a className="text-body-secondary" href={social.linkedin.url} title={social.linkedin.title} target="_blank"><FontAwesomeIcon icon={faLinkedin} /></a></li>
            <li className="ms-3"><a className="text-body-secondary" href={social.twitter.url} title={social.twitter.title} target="_blank"><FontAwesomeIcon icon={faXTwitter} /></a></li>
            <li className="ms-3"><a className="text-body-secondary" href={social.github.url} title={social.github.title} target="_blank"><FontAwesomeIcon icon={faGithub} /></a></li>

          </ul>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
