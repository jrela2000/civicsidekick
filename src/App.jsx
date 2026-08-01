import React, { Suspense, lazy, useState } from 'react';
import SplashScreen from '@/components/SplashScreen';
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ThemeProvider from './components/ThemeProvider';
import LoadingScreen from '@/components/LoadingScreen';
import PageNotFound from './lib/PageNotFound';
import Layout from './components/Layout.jsx';

const Home = lazy(() => import('./pages/Home'));
const Officials = lazy(() => import('./pages/Officials'));
const Glossary = lazy(() => import('./pages/Glossary'));
const Settings = lazy(() => import('./pages/Settings'));
const Deadlines = lazy(() => import('./pages/Deadlines'));
// Add page imports here

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return <LoadingScreen message="Getting everything ready…" />;
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  const fallback = <LoadingScreen />;

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Suspense fallback={fallback}><Home /></Suspense>} />
        <Route path="/officials" element={<Suspense fallback={fallback}><Officials /></Suspense>} />
        <Route path="/glossary" element={<Suspense fallback={fallback}><Glossary /></Suspense>} />
        <Route path="/settings" element={<Suspense fallback={fallback}><Settings /></Suspense>} />
        <Route path="/deadlines" element={<Suspense fallback={fallback}><Deadlines /></Suspense>} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};


function App() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <>
      {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}
      <ThemeProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClientInstance}>
            <Router>
              <AuthenticatedApp />
            </Router>
            <Toaster />
          </QueryClientProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  )
}

export default App