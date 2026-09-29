import { FiArrowUpRight } from 'react-icons/fi';
import { career, personalInfo } from '../data/portfolioData';

export default function Experience() {
  return (
    <section className="section reveal" id="experience">
      <h2 className="section-title">Experience</h2>
      <ol className="jobs">
        {career.map(job => (
          <li key={job.company} className="card job">
            <div className="job-head">
              <span className="logo-tile">
                <img src={job.logo} alt={`${job.company} logo`} loading="lazy" />
              </span>
              <div className="job-title">
                <h3 className="item-title">{job.role}</h3>
                <p className="muted">{job.company}{job.program && job.program !== job.company ? ` · ${job.program}` : ''}</p>
              </div>
              <p className="job-when">
                <span>{job.period}</span>
                <span>{job.type}</span>
              </p>
            </div>
            <ul className="points">
              {job.points.map(p => <li key={p}>{p}</li>)}
            </ul>
            <ul className="chips chips-sm">
              {job.tech.map(t => <li key={t}>{t}</li>)}
            </ul>
          </li>
        ))}
      </ol>
      <a className="text-link resume-link" href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer">
        View full résumé <FiArrowUpRight size={14} />
      </a>
    </section>
  );
}
