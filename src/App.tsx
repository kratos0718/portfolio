import { Suspense, lazy } from 'react';
import './App.css';
import Cursor from './components/Cursor';
import FloatingController from './components/FloatingController';

const MainContainer = lazy(() => import('./components/MainContainer'));

export default function App() {
  return (
    <div className="app-wrapper">
      <Cursor />
      <FloatingController />
      <Suspense fallback={null}>
        <MainContainer />
      </Suspense>
    </div>
  );
}
