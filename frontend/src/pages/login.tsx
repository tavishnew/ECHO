import { useState } from 'react';
import { useLocation, Link } from 'wouter';
import { useAppStore } from '@/lib/store';
import { PageTransition } from '@/components/layout/page-transition';
import { ClayCard } from '@/components/ui/clay-card';
import { ClayButton } from '@/components/ui/clay-button';
import { ClayInput } from '@/components/ui/clay-input';
import { motion } from 'framer-motion';

export default function Login() {
  const [, setLocation] = useLocation();
  const { login } = useAppStore();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login
    login({
      name: formData.email.split('@')[0] || 'Student',
      email: formData.email,
      tier: 'free',
      accessibilityPreference: 'None'
    });
    setLocation('/dashboard');
  };

  return (
    <PageTransition className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        
        <ClayCard>
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Welcome Back!</h1>
            <p className="text-muted-foreground">Ready to learn something new?</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 ml-1 text-foreground">Email</label>
                <ClayInput 
                  required 
                  type="email" 
                  placeholder="parent@example.com" 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 ml-1 text-foreground">Password</label>
                <ClayInput 
                  required 
                  type="password" 
                  placeholder="••••••••" 
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <ClayButton type="submit" variant="primary" className="w-full">
              Log in
            </ClayButton>
          </form>
          
          <p className="text-center text-sm text-muted-foreground mt-8">
            Don't have an account? <Link href="/signup" className="text-primary font-bold hover:underline">Start free</Link>
          </p>
        </ClayCard>
      </motion.div>
    </PageTransition>
  );
}
