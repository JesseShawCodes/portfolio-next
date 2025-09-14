'use client';
import { React } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function NavLink({ name, link }) {
  const pathname = usePathname();
  const isActive = pathname === link;
  return (
    <li className="nav-item">
      <Link href={link} className={`nav-link ${isActive ? 'active' : ''}`}>{name}</Link>
    </li>
  );
}

export default NavLink;
