import { PageTransition } from '@/components/layout/page-transition';
import { ClayCard } from '@/components/ui/clay-card';
import { ClayButton } from '@/components/ui/clay-button';
import { Link } from 'wouter';
import { Ghost } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <PageTransition className="min-h-[70vh] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
      >
        <ClayCard className="p-12 text-center max-w-lg w-full flex flex-col items-center">
          <motion.div
            animate={{ 
              y: [0, -15, 0],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          >
            <Ghost className="w-24 h-24 text-muted-foreground/30 mb-6" />
          </motion.div>
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Oops! Looks like this page wandered off to play. Let's get you back to learning.
          </p>
          <Link href="/">
            <ClayButton variant="primary" size="lg">
              Go Home
            </ClayButton>
          </Link>
        </ClayCard>
      </motion.div>
    </PageTransition>
  );
}
