import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiX, FiChevronLeft, FiChevronRight, FiFileText, FiArrowRight } from 'react-icons/fi';
import './styles/Certifications.css';

gsap.registerPlugin(ScrollTrigger);

interface Cert {
  title: string;
  subtitle?: string;
  issuer: string;
  date: string;
  category: string;
  categoryColor: string;
  image?: string;
  pdf?: string;
}

const certs: Cert[] = [
  {
    title: 'Mastering AI Agents Bootcamp',
    subtitle: 'Build Smart Chatbots & Tools',
    issuer: 'Udemy',
    date: 'Jun 2025',
    category: 'AI/ML',
    categoryColor: 'cyan',
    image: '/certs/ai-agents-udemy.jpg',
  },
  {
    title: 'What Is Generative AI?',
    subtitle: 'LinkedIn Learning',
    issuer: 'LinkedIn Learning',
    date: 'Jun 2025',
    category: 'AI/ML',
    categoryColor: 'cyan',
    image: '/certs/genai-linkedin.jpg',
  },
  {
    title: 'AWS Solutions Architecture',
    subtitle: 'Job Simulation',
    issuer: 'Forage · Amazon Web Services',
    date: 'Jul 2025',
    category: 'Cloud',
    categoryColor: 'blue',
    image: '/certs/aws-forage.jpg',
  },
  {
    title: 'AI Program & Internship',
    subtitle: 'Alcheringa · IIT Guwahati',
    issuer: '1stop · IIT Guwahati',
    date: 'Jun 2025',
    category: 'AI/ML',
    categoryColor: 'cyan',
    image: '/certs/1stop-ai-iitg.png',
  },
  {
    title: 'AI Internship Certificate',
    subtitle: 'Personifwy · 1stop',
    issuer: '1stop',
    date: 'Jun 2025',
    category: 'AI/ML',
    categoryColor: 'cyan',
    image: '/certs/1stop-internship.png',
  },
  {
    title: 'Alpha: DSA with Java',
    subtitle: 'Data Structures & Algorithms',
    issuer: 'ApnaCollege',
    date: '2025',
    category: 'DSA',
    categoryColor: 'amber',
    image: '/certs/dsa-java-apna.jpg',
  },
  {
    title: 'Python for Beginners',
    subtitle: 'Mastering the Essentials',
    issuer: 'Scaler Topics',
    date: 'Jul 2025',
    category: 'Python',
    categoryColor: 'green',
    image: '/certs/python-scaler.jpg',
  },
  {
    title: 'MATLAB Fundamentals',
    subtitle: '100% Self-Paced Course',
    issuer: 'MathWorks',
    date: 'Jan 2025',
    category: 'Engineering',
    categoryColor: 'blue',
    image: '/certs/matlab-mathworks.jpg',
  },
  {
    title: 'AI/ML Workshop & Hackathon',
    subtitle: 'BITS Pilani · Hyderabad',
    issuer: 'Techgyan Technologies',
    date: 'Jan 2026',
    category: 'Workshop',
    categoryColor: 'purple',
    image: '/certs/techgyan-hackathon.jpg',
  },
  {
    title: 'AI/ML Workshop',
    subtitle: 'BITS Pilani Campus',
    issuer: 'Techgyan Technologies',
    date: 'Jan 2026',
    category: 'Workshop',
    categoryColor: 'purple',
    image: '/certs/techgyan-workshop.jpg',
  },
  {
    title: 'Digital Application Fundamentals',
    subtitle: 'STEM Track',
    issuer: 'FutureSkills Prime · Nasscom',
    date: 'May 2026',
    category: 'Tech',
    categoryColor: 'muted',
    pdf: '/certs/futureskills-nasscom.pdf',
  },
  {
    title: 'Code Gen & Optimization',
    subtitle: 'Using IBM Granite',
    issuer: 'IBM SkillsBuild',
    date: 'Jun 2026',
    category: 'AI/ML',
    categoryColor: 'blue',
    pdf: '/certs/ibm-design.pdf',
  },
];

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const imageCerts = certs.filter(c => c.image);
  const imageIndexMap = certs.map(c =>
    c.image ? imageCerts.findIndex(ic => ic === c) : -1
  );

  const openLightbox = useCallback((certIdx: number) => {
    const imgIdx = imageIndexMap[certIdx];
    if (imgIdx !== -1) setLightboxIdx(imgIdx);
  }, [imageIndexMap]);

  const closeLightbox = useCallback(() => setLightboxIdx(null), []);

  const prev = useCallback(() => {
    setLightboxIdx(cur => (cur !== null ? (cur - 1 + imageCerts.length) % imageCerts.length : null));
  }, [imageCerts.length]);

  const next = useCallback(() => {
    setLightboxIdx(cur => (cur !== null ? (cur + 1) % imageCerts.length : null));
  }, [imageCerts.length]);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIdx === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIdx, closeLightbox, prev, next]);

  // Lock scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightboxIdx !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIdx]);

  // Drag-to-scroll
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onDown = (e: MouseEvent) => {
      isDown = true;
      track.classList.add('dragging');
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    };
    const onUp = () => { isDown = false; track.classList.remove('dragging'); };
    const onMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      track.scrollLeft = scrollLeft - (x - startX) * 1.2;
    };

    track.addEventListener('mousedown', onDown);
    track.addEventListener('mouseleave', onUp);
    track.addEventListener('mouseup', onUp);
    track.addEventListener('mousemove', onMove);
    return () => {
      track.removeEventListener('mousedown', onDown);
      track.removeEventListener('mouseleave', onUp);
      track.removeEventListener('mouseup', onUp);
      track.removeEventListener('mousemove', onMove);
    };
  }, []);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: 'top 72%' };
      gsap.to(tagRef.current, {
        clipPath: 'inset(0 0% 0 0)', duration: 0.8, ease: 'power3.inOut', scrollTrigger: st,
      });
      gsap.to(titleRef.current, {
        clipPath: 'inset(0 0 0% 0)', duration: 0.9, ease: 'power3.out', delay: 0.1, scrollTrigger: st,
      });
      gsap.fromTo(trackRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.25, ease: 'power2.out', scrollTrigger: st }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={sectionRef} className="certifications" id="certifications">
        <div ref={tagRef} className="section-tag" style={{ clipPath: 'inset(0 100% 0 0)' }}>
          Certifications
        </div>

        <div className="cert-header-row">
          <h2 ref={titleRef} className="section-title" style={{ clipPath: 'inset(0 0 100% 0)' }}>
            Learning & <span className="accent">credentials</span>
          </h2>
          <span className="cert-scroll-hint">
            Drag to scroll <FiArrowRight size={12} />
          </span>
        </div>

        <div className="cert-track-wrap">
          <div ref={trackRef} className="cert-track">
            {certs.map((cert, idx) => (
              <div
                key={cert.title + cert.issuer}
                className={`cert-card cert-card--${cert.categoryColor}`}
                onClick={() => cert.image ? openLightbox(idx) : window.open(cert.pdf, '_blank')}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && (cert.image ? openLightbox(idx) : window.open(cert.pdf, '_blank'))}
              >
                <div className="cert-thumb-wrap">
                  {cert.image ? (
                    <img src={cert.image} alt={cert.title} className="cert-thumb" loading="lazy" draggable="false" />
                  ) : (
                    <div className="cert-pdf-placeholder">
                      <FiFileText size={26} />
                      <span>View PDF</span>
                    </div>
                  )}
                  <div className={`cert-category-badge cert-category--${cert.categoryColor}`}>
                    {cert.category}
                  </div>
                </div>

                <div className="cert-info">
                  <div className="cert-title">{cert.title}</div>
                  {cert.subtitle && <div className="cert-subtitle">{cert.subtitle}</div>}
                  <div className="cert-footer">
                    <span className="cert-issuer">{cert.issuer}</span>
                    <span className="cert-date">{cert.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div className="cert-lightbox" onClick={closeLightbox}>
          <button className="cert-lb-close" onClick={closeLightbox} aria-label="Close">
            <FiX size={18} />
          </button>
          <button className="cert-lb-nav cert-lb-prev" onClick={e => { e.stopPropagation(); prev(); }} aria-label="Previous">
            <FiChevronLeft size={22} />
          </button>
          <div className="cert-lb-content" onClick={e => e.stopPropagation()}>
            <img
              src={imageCerts[lightboxIdx].image}
              alt={imageCerts[lightboxIdx].title}
              className="cert-lb-img"
            />
            <div className="cert-lb-meta">
              <span className="cert-lb-title">{imageCerts[lightboxIdx].title}</span>
              <span className="cert-lb-issuer">{imageCerts[lightboxIdx].issuer} · {imageCerts[lightboxIdx].date}</span>
            </div>
          </div>
          <button className="cert-lb-nav cert-lb-next" onClick={e => { e.stopPropagation(); next(); }} aria-label="Next">
            <FiChevronRight size={22} />
          </button>
        </div>
      )}
    </>
  );
}
