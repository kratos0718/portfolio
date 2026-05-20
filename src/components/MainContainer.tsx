import { Suspense, lazy } from 'react';
import Navbar from './Navbar';
import Landing from './Landing';
import About from './About';
import WhatIDo from './WhatIDo';
import Career from './Career';
import Research from './Research';
import Achievements from './Achievements';
import Work from './Work';
import Challenges from './Challenges';
import Story from './Story';
import ResumeDownload from './ResumeDownload';
import Contact from './Contact';
import SmoothScroll from './SmoothScroll';
import Grain from './Grain';
import AmbientLayer from './AmbientLayer';
import TickerStrip from './TickerStrip';
import SocialProof from './SocialProof';
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
      <AmbientLayer />
      <div className="grid-overlay">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="grid-col" />
        ))}
      </div>

      <div className="main-container">
        <Navbar />
        <Landing />

        {/* Scrolling keyword strip between hero and about */}
        <TickerStrip />

        {/* Credibility / social proof bar */}
        <SocialProof />

        <About />
        <Divider />
        <WhatIDo />
        <Divider />
        <Career />
        <Divider />
        <Research />
        <Divider />
        <Work />

        {/* Second ticker between Work and Achievements */}
        <TickerStrip reverse />

        <Achievements />
        <Divider />

        <Suspense fallback={null}>
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
