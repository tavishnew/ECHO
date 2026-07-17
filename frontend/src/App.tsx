import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, Router as WouterRouter, useLocation } from 'wouter';
import { AnimatePresence } from 'framer-motion';
import { AppProvider, useAppStore } from './lib/store';
import { Navbar } from './components/layout/navbar';
import { Toaster } from 'sonner';
import { cn } from './lib/utils';

// Pages
import Home from './pages/home';
import Signup from './pages/signup';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Tutor from './pages/tutor';
import Rewards from './pages/rewards';
import Pricing from './pages/pricing';
import Account from './pages/account';
import NotFound from './pages/not-found';

const queryClient = new QueryClient();

function Router() {
  const { state } = useAppStore();
  const [location] = useLocation();
  const isAuth = !!state.user;
  return (
    <div className="flex flex-col min-h-[100dvh] relative">
      {/* Ambient claymorphism warmth — three soft radial blobs behind content */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute -top-40 -left-40 w-[36rem] h-[36rem] rounded-full blur-3xl opacity-30 animate-blob-drift"
          style={{ background: 'radial-gradient(circle, var(--primary), transparent 60%)' }}
        />
        <div
          className="absolute top-1/3 -right-40 w-[32rem] h-[32rem] rounded-full blur-3xl opacity-25 animate-blob-drift"
          style={{ background: 'radial-gradient(circle, var(--sage), transparent 60%)', animationDelay: '-4s' }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-[30rem] h-[30rem] rounded-full blur-3xl opacity-20 animate-blob-drift"
          style={{ background: 'radial-gradient(circle, var(--sky), transparent 60%)', animationDelay: '-8s' }}
        />
      </div>
      <main className={cn('flex-1', isAuth ? 'pt-0' : 'pt-20')}>
        <Navbar />
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
      </main>
      <Toaster position="top-center" richColors closeButton />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <WouterRouter base={import.meta.env.BASE_URL?.replace(/\/$/, '') || ''}>
          <Router />
        </WouterRouter>
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
