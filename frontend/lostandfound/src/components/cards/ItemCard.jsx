import { motion } from 'framer-motion'
import Badge from '../ui/Badge'
import { fadeInUp } from '../../constants/motion'
import { formatDate } from '../../utils/formatDate'

/*
  A single Lost or Found item tile. Charcoal surface with a light top edge
  and a soft drop shadow (elevation level 2 from DESIGN.md).
*/
function ItemCard({ item }) {
  return (
    <motion.article
      variants={fadeInUp}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="group flex flex-col rounded-xl bg-surface-1 p-5
                 ring-1 ring-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <Badge status={item.status} />
        <span className="text-xs font-medium text-ink-muted">
          {formatDate(item.date)}
        </span>
      </div>

      <h3 className="text-lg font-medium tracking-tight text-ink">
        {item.title}
      </h3>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
        {item.description}
      </p>

      <div className="mt-5 flex items-center justify-between border-t border-hairline-soft pt-4">
        <span className="inline-flex items-center gap-1.5 text-xs text-ink-muted">
          <LocationIcon />
          {item.location}
        </span>
        <span className="rounded-sm bg-surface-2 px-2 py-1 text-[11px] font-medium text-ink-muted">
          {item.category}
        </span>
      </div>
    </motion.article>
  )
}

function LocationIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

export default ItemCard
