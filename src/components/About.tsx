import type { CSSProperties } from 'react';
import type { IconType } from 'react-icons';
import { FiCheck, FiCpu, FiDatabase, FiLayers, FiSearch, FiServer, FiTool, FiZap, FiCheckCircle } from 'react-icons/fi';
import { FaAws } from 'react-icons/fa';
import {
  SiClaude, SiDocker, SiFastapi, SiGit, SiGithubactions, SiHuggingface, SiJavascript, SiLangchain,
  SiModelcontextprotocol, SiNodedotjs, SiNumpy, SiOpenai, SiOpencv, SiOpenjdk, SiPandas, SiPostgresql,
  SiPytest, SiPython, SiPytorch, SiReact, SiScikitlearn, SiTypescript,
} from 'react-icons/si';
import { about, whatIDo, skillGroups, education } from '../data/portfolioData';

const cardIcons = [FiCpu, FiLayers, FiServer];

const skillIcons: Record<string, IconType> = {
  python: SiPython, typescript: SiTypescript, javascript: SiJavascript, java: SiOpenjdk, postgres: SiPostgresql,
  pytorch: SiPytorch, huggingface: SiHuggingface, sklearn: SiScikitlearn, opencv: SiOpencv, numpy: SiNumpy,
  pandas: SiPandas, langchain: SiLangchain, openai: SiOpenai, claude: SiClaude, mcp: SiModelcontextprotocol,
  rag: FiDatabase, search: FiSearch, tool: FiTool, check: FiCheckCircle, fastapi: SiFastapi, zap: FiZap,
  react: SiReact, node: SiNodedotjs, docker: SiDocker, aws: FaAws, gha: SiGithubactions, pytest: SiPytest, git: SiGit,
};

type Skill = { name: string; icon?: string; color?: string; img?: string };

function SkillChip({ skill }: { skill: Skill }) {
  const Icon = skill.icon ? skillIcons[skill.icon] : undefined;
  return (
    <li className="skill-chip" style={{ '--brand': skill.color ?? 'var(--text-dim)' } as CSSProperties}>
      {skill.img
        ? <img src={skill.img} alt="" width={16} height={16} />
        : Icon && <Icon size={15} aria-hidden="true" />}
      {skill.name}
    </li>
  );
}

export default function About() {
  return (
    <section className="section reveal" id="about">
      <h2 className="section-title">About</h2>
      <div className="about-grid">
        <div className="prose">
          {about.map(p => <p key={p.slice(0, 24)}>{p}</p>)}
        </div>
        <aside className="about-side">
          <h3 className="label">Education</h3>
          {education.map(e => (
            <div key={e.degree} className="edu">
              <p className="about-edu">{e.degree}</p>
              <p className="muted">{e.institution} · {e.period}</p>
              {e.detail && <p className="edu-detail">{e.detail}</p>}
            </div>
          ))}
        </aside>
      </div>

      <h3 className="label sub-label">What I do</h3>
      <div className="what-grid">
        {whatIDo.map((w, i) => {
          const Icon = cardIcons[i];
          return (
            <article key={w.title} className="card what" style={{ '--accent': w.accent } as CSSProperties}>
              <div className="what-head">
                <span className="what-badge"><Icon size={18} aria-hidden="true" /></span>
                <h3 className="item-title">{w.title}</h3>
              </div>
              <p className="what-proof">
                <strong>{w.proof.num}</strong>
                <span>{w.proof.label}</span>
              </p>
              <ul className="what-points">
                {w.points.map(pt => (
                  <li key={pt}><FiCheck size={14} aria-hidden="true" /> {pt}</li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>

      <h3 className="label sub-label">Tech I use</h3>
      <div className="skills">
        {skillGroups.map(g => (
          <div key={g.label} className="skill-row">
            <h4 className="label">{g.label}</h4>
            <ul className="skill-chips">
              {g.items.map(s => <SkillChip key={s.name} skill={s} />)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
