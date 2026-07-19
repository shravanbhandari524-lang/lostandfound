import { motion } from 'framer-motion'
import { fadeInUp } from '../../constants/motion'

/*
  SpotlightCard — a vibrant gradient atmosphere tile injected into the item grid.
  Follows DESIGN.md's "gradient spotlight card" pattern: a single atmospheric
  panel that breaks the dark monochrome grid with a magenta-violet wash.
  Uses rounded-xxl (30px) corners as specified in DESIGN.md.
*/
function SpotlightCard() {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className="flex flex-col justify-between rounded-[30px] p-8"
      style={{
        background:
          'radial-gradient(ellipse at 30% 20%, #7c3aed 0%, #4f46e5 40%, #1e1b4b 100%)',
        boxShadow: '0 20px 60px rgba(109, 40, 217, 0.35)',
      }}
      aria-label="Did you lose something? Report it so others can help."
    >
      {/* Decorative glyph */}
      <div className="mb-6">
        <span
          className="text-4xl"
          role="img"
          aria-hidden="true"
        >
          🔍
        </span>
      </div>

      {/* Copy */}
      <div>
        <p
          className="text-xl font-semibold leading-snug text-white"
          style={{ letterSpacing: '-0.5px' }}
        >
          Can't find something?
        </p>
        <p className="mt-2 text-sm leading-relaxed text-white/70">
          Post a lost report and let the campus help you track it down.
        </p>
      </div>
    </motion.div>
  )
}

export default SpotlightCard
