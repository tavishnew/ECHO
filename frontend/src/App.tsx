import { lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { AppProvider, useAppStore } from './lib/store';
import { Navbar } from './components/layout/navbar';
import { PageSkeleton } from './components/layout/page-skeleton';
import { Toaster } from 'sonner';
import { cn } from './lib/utils';

// Pages are lazy-loaded so the route-level loading skeleton (ISSUE-003) has a
// real boundary to fill while each chunk downloads.
const Home = lazy(() => import('./pages/home'));
const Signup = lazy(() => import('./pages/signup'));
const Login = lazy(() => import('./pages/login'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const Tutor = lazy(() => import('./pages/tutor'));
const Rewards = lazy(() => import('./pages/rewards'));
const Pricing = lazy(() => import('./pages/pricing'));
const Account = lazy(() => import('./pages/account'));
const NotFound = lazy(() => import('./pages/not-found'));

const queryClient = new QueryClient();

function Router() {
  const { state } = useAppStore();
  const [location] = useLocation();
  const isAuth = !!state.user;
  // Ambient blobs are decorative warmth on marketing/section pages, but they
  // compete with content on focused task screens like the tutor chat, so we
  // suppress them there (ISSUE-001).
  const showBlobs = location !== '/tutor';
  return (
    <div className="flex flex-col min-h-[100dvh] relative">
      {/* Ambient claymorphism warmth — three soft radial blobs behind content */}
      {showBlobs && (
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute -top-40 -left-40 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-30 animate-blob-drift"
          style={{ background: 'radial-gradient(circle, var(--primary), transparent 60%)', animationDelay: '0s' }}
        />
        <div
          className="absolute top-1/3 -right-40 w-[32rem] h-[32rem] rounded-full blur-3xl opacity-25 animate-blob-drift"
          style={{ background: 'radial-gradient(circle, var(--sage), transparent 60%)', animationDelay: '4s' }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[30rem] h-[30rem] rounded-full blur-3xl opacity-20 animate-blob-drift"
          style={{ background: 'radial-gradient(circle, var(--sky), transparent 60%)', animationDelay: '8s' }}
        />
      </div>
      )}
      <main className={cn('flex-1', isAuth ? 'pt-0' : 'pt-20')}>
        <Navbar />
        {/* Suspense boundary renders the shimmer skeleton while a route chunk
            loads, preventing the blank flash between page transitions
            (ISSUE-003). */}
        <Suspense fallback={<PageSkeleton />}>
          <AnimatePresence mode="wait">
            <Switch key={location}>
              <Route path="/" component={Home} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/tutor" component={Tutor} />
              <Route path="/rewards" component={Rewards} />
              <Route path="/pricing" component={Pricing} />
              <Route path="/account" component={Account} />
              <Route component={NotFound} />
            </Switch>
          </AnimatePresence>
        </Suspense>
      </main>
      <Toaster position="top-center" richColors closeButton />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MotionConfig reducedMotion="user">
        <AppProvider>
          <WouterRouter base={import.meta.env.BASE_URL?.replace(/\/$/, '') || ''}>
            <Router />
          </WouterRouter>
        </AppProvider>
      </MotionConfig>
    </QueryClientProvider>
  );
}

export default App;
