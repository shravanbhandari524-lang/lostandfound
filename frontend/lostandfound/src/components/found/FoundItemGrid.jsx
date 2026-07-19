import { motion, AnimatePresence } from 'framer-motion'
import FoundItemCard from './FoundItemCard'
import { staggerContainer, fadeInUp } from '../../constants/motion'

/*
  FoundItemGrid — responsive 3-column grid with:
    - Staggered card entrance (staggerContainer)
    - AnimatePresence so removed cards animate out before the grid reflows
    - A gradient "spotlight" accent card injected at slot 2 (DESIGN.md pattern)
    - Empty-state when the list is cleared
*/

const ACCENT = '#34d17d' // --color-found
const SPOTLIGHT_INJECT_AT = 2

function FoundItemGrid({ items, onRemove }) {
  if (items.length === 0) {
    return <GridEmptyState />
  }

  // Build display slots: splice in spotlight card at index 2
  const slots = []
  items.forEach((item, idx) => {
    if (idx === SPOTLIGHT_INJECT_AT) {
      slots.push({ type: 'spotlight', id: 'spotlight-accent' })
    }
    slots.push({ type: 'item', id: item.id || item.createdAt, item })
  })

  // If there are fewer than 3 items, append the spotlight card to the end so it is always visible
  if (items.length <= SPOTLIGHT_INJECT_AT) {
    slots.push({ type: 'spotlight', id: 'spotlight-accent' })
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      layout
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      <AnimatePresence mode="popLayout">
        {slots.map((slot) =>
          slot.type === 'spotlight' ? (
            <FoundSpotlightCard key="spotlight-accent" />
          ) : (
            <FoundItemCard
              key={slot.id}
              item={slot.item}
              onRemove={onRemove}
            />
          )
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* Gradient atmosphere card — the DESIGN.md signature "spotlight" tile */
function FoundSpotlightCard() {
  return (
    <motion.div
      variants={fadeInUp}
      className="flex flex-col justify-between rounded-xxl p-8"
      style={{
        background:
          'radial-gradient(ellipse at 30% 30%, #2aff96 0%, #00c97a 35%, #006644 70%, #001a10 100%)',
        boxShadow: '0 20px 60px rgba(52, 209, 125, 0.15)',
        minHeight: '220px',
      }}
      aria-hidden="true"
    >
      <div>
        <p
          className="text-2xl font-semibold text-canvas/90 leading-tight"
          style={{ letterSpacing: '-1.5px' }}
        >
          Every found item
          <br />
          is someone's
          <br />
          relief.
        </p>
      </div>
      <p className="text-xs text-canvas/60 font-medium tracking-wide">
        Keep reporting. Keep reuniting.
      </p>
    </motion.div>
  )
}

/* Empty state when no found items exist */
function GridEmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center justify-center gap-5 rounded-xl
                 bg-surface-1 ring-1 ring-white/5 py-24 text-center border border-hairline-soft"
    >
      <span
        className="flex h-14 w-14 items-center justify-center rounded-full"
        style={{ backgroundColor: `${ACCENT}15` }}
      >
        <EmptyIcon />
      </span>
      <div>
        <p className="text-sm font-medium text-ink">No found items yet.</p>
        <p className="mt-1 text-xs text-ink-muted">
          Hit "Add Found Item" to log something you found.
        </p>
      </div>
    </motion.div>
  )
}

function EmptyIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={ACCENT}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="11" />
      <line x1="11" y1="14" x2="11.01" y2="14" />
    </svg>
  )
}

export default FoundItemGrid
