import { Suspense, lazy } from 'react';
import './App.css';

const MainContainer = lazy(() => import('./components/MainContainer'));

export default function App() {
  return (
    <div className="app-wrapper">
      <Suspense fallback={null}>
        <MainContainer />
      </Suspense>
    </div>
  );
}
