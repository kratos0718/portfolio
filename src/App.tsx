import { Suspense, lazy } from 'react';
import './App.css';
import { LoadingProvider, useLoading } from './context/LoadingProvider';
import Loading from './components/Loading';
import Cursor from './components/Cursor';

const MainContainer = lazy(() => import('./components/MainContainer'));

function AppInner() {
  const { isLoading } = useLoading();
  return (
    <div className="app-wrapper">
      <Cursor />
      <Loading />
      {!isLoading && (
        <Suspense fallback={null}>
          <MainContainer />
        </Suspense>
      )}
    </div>
  );
}

export default function App() {
  return (
    <LoadingProvider>
      <AppInner />
    </LoadingProvider>
  );
}
