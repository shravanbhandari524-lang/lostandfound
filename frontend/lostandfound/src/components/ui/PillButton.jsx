import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

/*
  Pill-shaped CTA — the only primary button shape in the design system.
  variant="primary"   -> white pill on dark canvas
  variant="secondary" -> charcoal pill
*/
const VARIANTS = {
  primary: 'bg-inverse-canvas text-canvas hover:bg-white/90',
  secondary: 'bg-surface-1 text-ink hover:bg-surface-2',
}

function PillButton({ children, variant = 'primary', className, ...props }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-pill px-4 py-2.5',
        'text-sm font-medium tracking-tight',
        'cursor-pointer select-none outline-none',
        'focus-visible:ring-2 focus-visible:ring-accent-blue/60',
        VARIANTS[variant],
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export default PillButton
