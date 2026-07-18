import { motion } from 'framer-motion';

/**
 * Lightweight shimmer placeholder shown by the <Suspense> boundary in App.tsx
 * while a route chunk loads (ISSUE-003). Mirrors a generic page's hero +
 * card rhythm so the swap reads as a continuous layout rather than a blank
 * flash. Decorative only — marked aria-hidden.
 */
export function PageSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      aria-hidden="true"
      className="w-full px-4 md:px-8 pt-20 pb-12"
      style={{ backgroundColor: 'var(--bg-page)' }}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="skeleton h-44 w-full rounded-3xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="skeleton h-52 rounded-3xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="skeleton h-40 rounded-3xl" />
          <div className="skeleton h-40 rounded-3xl" />
        </div>
      </div>
    </motion.div>
  );
}
