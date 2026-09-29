import { career } from '../data/portfolioData';

export default function Experience() {
  return (
    <section className="section reveal" id="experience">
      <h2 className="section-title">Experience</h2>
      <ol className="timeline">
        {career.map(job => (
          <li key={job.company} className="timeline-item">
            <p className="timeline-period">{job.period}</p>
            <div>
              <h3 className="item-title">{job.role}</h3>
              <p className="muted">{job.company}</p>
              <ul className="points">
                {job.points.map(p => <li key={p}>{p}</li>)}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
