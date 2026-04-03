import { useEffect, useRef, useState } from 'react';
import { FiDownload, FiMenu, FiX } from 'react-icons/fi';
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
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
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
        <div className="navbar-actions">
          <a
            href="/Abhinav_Tarigoppula_Resume.pdf"
            download="Abhinav_Tarigoppula_Resume.pdf"
            className="navbar-cv"
            data-hover
          >
            <FiDownload size={12} />
            <span>CV</span>
          </a>
          <a href="#contact" className="navbar-cta">
            <span>Hire me</span>
          </a>
          <button
            className={`navbar-hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <div className={`navbar-mobile-overlay${menuOpen ? ' open' : ''}`} onClick={closeMenu} />
      <div className={`navbar-mobile-menu${menuOpen ? ' open' : ''}`}>
        <ul className="navbar-mobile-links">
          {links.map((l, i) => (
            <li key={l.href} style={{ '--delay': `${i * 0.06}s` } as React.CSSProperties}>
              <a href={l.href} onClick={closeMenu}>
                <span className="navbar-mobile-num">0{i + 1}</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="navbar-mobile-footer">
          <a
            href="/Abhinav_Tarigoppula_Resume.pdf"
            download="Abhinav_Tarigoppula_Resume.pdf"
            className="navbar-mobile-cv-btn"
            onClick={closeMenu}
          >
            <FiDownload size={14} />
            Download CV
          </a>
          <p className="navbar-mobile-tagline">AI/ML Engineer · Open to Internships</p>
        </div>
      </div>
    </>
  );
}
