import { Suspense, lazy } from 'react';
import Navbar from './Navbar';
import Landing from './Landing';
import About from './About';
import WhatIDo from './WhatIDo';
import Career from './Career';
import Achievements from './Achievements';
import Work from './Work';
import Challenges from './Challenges';
import Story from './Story';
import ResumeDownload from './ResumeDownload';
import Contact from './Contact';
import SmoothScroll from './SmoothScroll';
import Grain from './Grain';
import './styles/MainContainer.css';

const TechStack = lazy(() => import('./TechStack'));

function Divider() {
  return (
    <div style={{
      width: 'calc(100% - 160px)',
      margin: '0 80px',
      height: '1px',
      background: 'linear-gradient(90deg, transparent, var(--border), transparent)',
    }} />
  );
}

export default function MainContainer() {
  return (
    <>
      <SmoothScroll />
      <Grain />
      <div className="grid-overlay">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="grid-col" />
        ))}
      </div>

      <div className="main-container">
        <Navbar />
        <Landing />
        <Divider />
        <About />
        <Divider />
        <WhatIDo />
        <Divider />
        <Career />
        <Divider />
        <Work />
        <Divider />
        <Achievements />
        <Divider />

        {/* Tech stack after achievements */}
        <Suspense fallback={
          <div style={{ height: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cyan)', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.3em' }}>
            LOADING NEURAL GRAPH...
          </div>
        }>
          <TechStack />
        </Suspense>
        <Divider />

        <Challenges />
        <Divider />
        <Story />
        <Divider />
        <ResumeDownload />
        <Divider />
        <Contact />
      </div>
    </>
  );
}
