import { motion } from 'framer-motion'
import { fadeInUp } from '../../constants/motion'

/*
  SpotlightCard — a vibrant gradient atmosphere tile injected into the item grid.
  Follows DESIGN.md's "gradient spotlight card" pattern: a single atmospheric
  panel that breaks the dark monochrome grid with a magenta-violet or green wash.
  Uses rounded-xxl (30px) corners as specified in DESIGN.md.
*/
function SpotlightCard({ type = 'lost' }) {
  const isLost = type === 'lost'

  const styles = isLost
    ? {
        background: 'radial-gradient(ellipse at 30% 20%, #ff5a7a 0%, #7c3aed 45%, #111827 100%)',
        boxShadow: '0 20px 60px rgba(255, 90, 122, 0.15)',
        title: 'Every lost item has a path back home.',
        description: 'Keep reporting. Keep reuniting.',
        emoji: '🔍',
      }
    : {
        background: 'radial-gradient(ellipse at 30% 20%, #34d17d 0%, #0d9488 45%, #111827 100%)',
        boxShadow: '0 20px 60px rgba(52, 209, 125, 0.15)',
        title: "Every found item is someone's relief.",
        description: 'Keep reporting. Keep reuniting.',
        emoji: '🤝',
      }

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className="flex flex-col justify-between rounded-[30px] p-8 min-h-[250px]"
      style={{
        background: styles.background,
        boxShadow: styles.boxShadow,
      }}
      aria-label={styles.title}
    >
      {/* Decorative glyph */}
      <div className="mb-6">
        <span
          className="text-4xl"
          role="img"
          aria-hidden="true"
        >
          {styles.emoji}
        </span>
      </div>

      {/* Copy */}
      <div>
        <p
          className="text-xl font-semibold leading-snug text-white"
          style={{ letterSpacing: '-0.5px' }}
        >
          {styles.title}
        </p>
        <p className="mt-3 text-xs leading-relaxed text-white/70 uppercase font-semibold tracking-wider">
          {styles.description}
        </p>
      </div>
    </motion.div>
  )
}

export default SpotlightCard
