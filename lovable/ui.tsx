import { motion, type HTMLMotionProps } from "motion/react";
import { forwardRef, type ReactNode } from "react";

type DivProps = HTMLMotionProps<"div">;

export const ClayCard = forwardRef<HTMLDivElement, DivProps & { as?: "div" }>(
  ({ className = "", style, children, ...rest }, ref) => (
    <motion.div
      ref={ref}
      className={`clay-card rounded-3xl ${className}`}
      style={{ backgroundColor: "var(--bg-card)", ...style }}
      {...rest}
    >
      {children}
    </motion.div>
  ),
);
ClayCard.displayName = "ClayCard";

export function PrimaryButton({
  children,
  className = "",
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return (
    <motion.button
      whileHover={{ scale: 1.04, y: -1 }}
      whileTap={{ scale: 0.96, y: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`clay-btn-primary rounded-full px-7 py-3.5 text-[15px] font-semibold text-white ${className}`}
      style={{ backgroundColor: "var(--primary)", fontFamily: "var(--font-sans)" }}
      {...(rest as any)}
    >
      {children}
    </motion.button>
  );
}

export function SecondaryButton({
  children,
  className = "",
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return (
    <motion.button
      whileHover={{ scale: 1.04, y: -1 }}
      whileTap={{ scale: 0.96, y: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`clay-btn-secondary rounded-full px-7 py-3.5 text-[15px] font-semibold text-ink ${className}`}
      style={{ backgroundColor: "#F3F1EC" }}
      {...(rest as any)}
    >
      {children}
    </motion.button>
  );
}

export function ClayPill({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`clay-pill inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold ${className}`}
      style={{ backgroundColor: "var(--bg-card)" }}
    >
      {children}
    </span>
  );
}

export function ClayInner({
  children,
  className = "",
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`clay-inner rounded-2xl ${className}`}
      style={{ backgroundColor: "var(--bg-page)" }}
    >
      {children}
    </div>
  );
}
