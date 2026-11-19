import type { ReactNode } from 'react';
import { FiArrowLeft, FiArrowUpRight, FiDownload, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import type { Block } from '../data/caseStudies';
import { personalInfo, socials } from '../data/portfolioData';
import { numerals } from './numerals';
import './v2.css';

// Shared layout for the static, script-free pages (case studies, articles,
// open source). Same ruled column as the homepage, with a still of the banner.

export function BlockView({ block }: { block: Block }) {
  if (block.type === 'p') return <p>{block.text}</p>;
  if (block.type === 'list') {
    return <ul>{block.items.map(item => <li key={item}>{item}</li>)}</ul>;
  }
  return (
    <div className="v2-table">
      <table>
        <thead><tr>{block.head.map(h => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>
          {block.rows.map(row => (
            <tr key={row.join('|')}>{row.map((cell, i) => <td key={i}>{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const Sep = () => <div className="v2-sep" aria-hidden="true" />;

type ShellProps = {
  back: string;
  kicker: string;
  title: string;
  tagline: string;
  cover?: string;
  children: ReactNode;
  related?: ReactNode;
};

export default function Shell({ back, kicker, title, tagline, cover, children, related }: ShellProps) {
  return (
    <div className="app-wrapper">
      <div className="v2 v2-page">
        <div className="v2-col">
          <nav className="v2-topbar">
            <a href={back} className="v2-back">
              <FiArrowLeft size={14} />
              <img src={personalInfo.photo} alt="" width={24} height={24} />
              {personalInfo.name}
            </a>
            <a className="v2-btn v2-btn-solid" href={personalInfo.resumeUrl} download="Abhinav_Tarigoppula_Resume.pdf"><FiDownload size={14} /> Résumé</a>
          </nav>
          <div className="v2-still" aria-hidden="true" />

          <header className="v2-page-head">
            <p className="v2-k">{kicker}</p>
            <h1>{numerals(title)}</h1>
            <p className="v2-tagline">{tagline}</p>
          </header>

          {cover && (
            <div className="v2-cover">
              <img src={cover} alt={`${title} preview`} width={1280} height={800} />
            </div>
          )}

          <main className="v2-page-main">{children}</main>

          {related && (
            <>
              <Sep />
              <section className="v2-section">{related}</section>
            </>
          )}

          <Sep />
          <section className="v2-cta">
            <h2>Hiring for AI engineers?</h2>
            <p>I'm {personalInfo.name}, open to AI engineer roles: internships now, full-time from 2027.</p>
            <div className="v2-links v2-center">
              <a className="v2-btn v2-btn-solid" href={`mailto:${personalInfo.email}`}><FiMail size={15} /> {personalInfo.email}</a>
              <a className="v2-btn" href={socials.linkedin}><FiLinkedin size={15} /> LinkedIn</a>
              <a className="v2-btn" href={socials.github}><FiGithub size={15} /> GitHub</a>
              <a className="v2-btn" href="/">Portfolio <FiArrowUpRight size={14} /></a>
            </div>
          </section>
          <footer className="v2-foot">
            <span>© {new Date().getFullYear()} {personalInfo.name}</span>
            <span>Last updated {personalInfo.updated}</span>
          </footer>
        </div>
      </div>
    </div>
  );
}
