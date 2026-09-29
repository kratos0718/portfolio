import { useEffect, useState } from 'react';
import { FiDownload, FiMenu, FiX } from 'react-icons/fi';
import './styles/Navbar.css';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Open Source', href: '#open-source' },
  { label: 'Research', href: '#research' },
  { label: 'Awards', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  // Mark the nav link for whichever section is in the middle of the screen.
  const [active, setActive] = useState('');
  useEffect(() => {
    const sections = links
      .map(l => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(`#${e.target.id}`); }),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <a href="#top" className="navbar-logo">
          <span>AT</span>
        </a>
        <ul className="navbar-links">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} className={active === l.href ? 'is-active' : undefined} aria-current={active === l.href ? 'true' : undefined}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="navbar-actions">
          <a
            href="/ABHINAV_RESUME.pdf"
            download="Abhinav_Tarigoppula_Resume.pdf"
            className="navbar-cv"
          >
            <FiDownload size={12} />
            <span>CV</span>
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
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="navbar-mobile-footer">
          <a
            href="/ABHINAV_RESUME.pdf"
            download="Abhinav_Tarigoppula_Resume.pdf"
            className="navbar-mobile-cv-btn"
            onClick={closeMenu}
          >
            <FiDownload size={14} />
            Download CV
          </a>
          <p className="navbar-mobile-tagline">AI/ML engineer · open to roles</p>
        </div>
      </div>
    </>
  );
}
