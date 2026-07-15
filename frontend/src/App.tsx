import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { AppProvider } from './lib/store';
import { Navbar } from './components/layout/navbar';

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
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Navbar />
      <main className="flex-1 pt-20">
        <Switch>
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
      </main>
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
