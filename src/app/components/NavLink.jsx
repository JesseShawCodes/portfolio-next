import { React } from 'react';
import Link from 'next/link';

function NavLink({ name, link }) {
  return (
    <li className="nav-item">
      <Link href={link} className="nav-link active">{name}</Link>
    </li>
  );
}

export default NavLink;
