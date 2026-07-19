import { motion } from 'framer-motion'
import Badge from '../ui/Badge'
import { fadeInUp } from '../../constants/motion'
import { formatDate } from '../../utils/formatDate'
import { useItems } from '../../context/ItemsContext'

/*
  A single Lost or Found item tile. Charcoal surface with a light top edge
  and a soft drop shadow (elevation level 2 from DESIGN.md).
  Includes location/category details and a trash can delete button on the right.
*/
function ItemCard({ item }) {
  const { deleteItem } = useItems()

  return (
    <motion.article
      variants={fadeInUp}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="group flex flex-col rounded-xl bg-surface-1 p-5
                 ring-1 ring-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <Badge status={item.status || item.type} />
        <span className="text-xs font-medium text-ink-muted">
          {formatDate(item.date)}
        </span>
      </div>

      <h3 className="text-lg font-medium tracking-tight text-ink">
        {item.productName || item.title}
      </h3>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
        {item.description}
      </p>

      <div className="mt-5 flex items-end justify-between border-t border-hairline-soft pt-4">
        <div className="flex flex-col gap-1.5">
          <span className="inline-flex items-center gap-1.5 text-xs text-ink-muted">
            <LocationIcon />
            {item.location}
          </span>
          <div className="flex">
            <span className="rounded-sm bg-surface-2 px-2 py-0.5 text-[11px] font-medium text-ink-muted border border-hairline-soft">
              {item.category}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => deleteItem(item.id || item.createdAt)}
          className="rounded-md p-1.5 text-ink-muted hover:bg-lost/10 hover:text-lost transition-all cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-lost/50"
          aria-label="Delete report"
        >
          <TrashIcon className="h-4.5 w-4.5" />
        </button>
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

function TrashIcon({ className }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  )
}

export default ItemCard
