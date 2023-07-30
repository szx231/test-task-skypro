import './components/UI/ProgressBar';

import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes } from 'react-router-dom';

import { Header } from './components/Header/index.tsx';
import { ErrFallBackMessage } from './components/UI/ErrFallBackMessage/index.tsx';
import { Loader } from './components/UI/Loader/index.tsx';

const Home = React.lazy(() => import(/* webpackChunkName: "Home" */ './pages/home'));
const Profile = React.lazy(() => import(/* webpackChunkName: "Profile" */ './pages/profile'));

const App = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <ErrorBoundary fallback={<ErrFallBackMessage />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="*" element={<div>Не найдено</div>} />
          </Routes>
        </ErrorBoundary>
      </Suspense>
    </>
  );
};

export default App;
