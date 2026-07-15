import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { ReactNode, useRef } from 'react';
import { cn } from '@/lib/utils';

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  /** RGB colour of the spotlight glow, e.g. "107, 94, 136" for primary. */
  color?: string;
  radius?: number;
};

/**
 * React Bits "SpotlightCard" equivalent: a clay surface with a soft glow that
 * follows the cursor. Implemented with framer-motion (no external dependency)
 * so it works offline.
 */
export function SpotlightCard({
  children,
  className,
  color = '107, 94, 136',
  radius = 320,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-radius);
  const mouseY = useMotionValue(-radius);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, rgba(${color}, 0.16), transparent 70%)`;

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn('relative overflow-hidden', className)}
    >
      <div className="relative z-10">{children}</div>
      <motion.div
        className="pointer-events-none absolute inset-0 z-20"
        style={{ background }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      />
    </div>
  );
}
