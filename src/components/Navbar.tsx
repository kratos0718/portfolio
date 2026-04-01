import { useEffect, useRef, useState } from 'react';
import './styles/Navbar.css';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Story', href: '#story' },
  { label: 'Work', href: '#work' },
  { label: 'Wins', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav ref={navRef} className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="navbar-logo">
        <span>AT</span>_portfolio
      </div>
      <ul className="navbar-links">
        {links.map(l => (
          <li key={l.href}>
            <a href={l.href}>{l.label}</a>
          </li>
        ))}
      </ul>
      <a href="#contact" className="navbar-cta">
        <span>Hire me</span>
      </a>
    </nav>
  );
}
