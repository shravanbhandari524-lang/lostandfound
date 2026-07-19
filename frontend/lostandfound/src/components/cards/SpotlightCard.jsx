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
        title: (
          <>
            Every lost item
            <br />
            has a path
            <br />
            back home.
          </>
        ),
        description: 'Keep reporting. Keep reuniting.',
      }
    : {
        background:
          'radial-gradient(ellipse at 30% 30%, #2aff96 0%, #00c97a 35%, #006644 70%, #001a10 100%)',
        boxShadow: '0 20px 60px rgba(52, 209, 125, 0.15)',
        title: (
          <>
            Every found item
            <br />
            is someone's
            <br />
            relief.
          </>
        ),
        description: 'Keep reporting. Keep reuniting.',
      }

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className="flex flex-col justify-between rounded-[30px] p-8"
      style={{
        background: styles.background,
        boxShadow: styles.boxShadow,
        minHeight: '220px',
      }}
      aria-label={isLost ? 'Every lost item has a path back home.' : "Every found item is someone's relief."}
    >
      <div>
        <p
          className="text-2xl font-semibold text-white/95 leading-tight"
          style={{ letterSpacing: '-1.5px' }}
        >
          {styles.title}
        </p>
      </div>
      <p className="text-xs text-white/60 font-medium tracking-wide">
        {styles.description}
      </p>
    </motion.div>
  )
}

export default SpotlightCard
