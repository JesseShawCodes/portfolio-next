"use client"
import { React } from 'react';
import Link from 'next/link';
import NavLink from './NavLink';
import Image from 'next/image';

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" role="navigation">
      <div className="container">
        <Link href="/" className="nav-link active navbar-brand">
          <Image src={`https://${process.env.NEXT_PUBLIC_API_ROOT_MEDIA}/portfolio_logo_81df80a9d5.PNG`} alt="Jesse Shaw portfolio logo" width={30} height={30} className='me-3'/>
          {process.env.NEXT_PUBLIC_NAME}
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <NavLink name="About" link="/about" />
            <NavLink name="Resume" link="/resume" />
            <NavLink name="Projects" link="/portfolio" />
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
