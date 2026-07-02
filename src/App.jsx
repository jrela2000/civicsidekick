import React, { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ThemeProvider from './components/ThemeProvider';
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
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
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
  const fallback = <div className="fixed inset-0 flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div></div>;

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

  return (
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
  )
}

export default App