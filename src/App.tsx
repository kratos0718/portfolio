import { Suspense, lazy } from 'react';
import './App.css';
import Cursor from './components/Cursor';

const MainContainer = lazy(() => import('./components/MainContainer'));

export default function App() {
  return (
    <div className="app-wrapper">
      <Cursor />
      <Suspense fallback={null}>
        <MainContainer />
      </Suspense>
    </div>
  );
}
