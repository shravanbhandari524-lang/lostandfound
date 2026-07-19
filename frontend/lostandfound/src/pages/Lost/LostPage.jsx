import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import PillButton from '../../components/ui/PillButton'
import AddLostItemModal from '../../components/lost/AddLostItemModal'
import ItemGrid from '../../components/cards/ItemGrid'
import { useItems } from '../../context/ItemsContext'
import { fadeInUp } from '../../constants/motion'

/*
  Lost Item Page (/lost)

  Responsibilities:
    - Owns the items connection (add / remove).
    - Renders the page header with item count and an "Add Lost Item" CTA.
    - Shows a responsive card grid via ItemGrid.
    - Opens AddLostItemModal for the add flow.
*/

const EMPTY_ACCENT = '#ff5a7a' // --color-lost

function LostPage() {
  const { items, addLostItem, deleteItem } = useItems()
  const [modalOpen, setModalOpen] = useState(false)

  // Filter only lost items
  const lostItems = items.filter(
    (item) => item.status === 'lost' || item.type === 'lost'
  )

  const handleAdd = useCallback(
    (item) => {
      addLostItem(item)
    },
    [addLostItem]
  )

  const handleRemove = useCallback(
    (id) => {
      deleteItem(id)
    },
    [deleteItem]
  )

  return (
    <>
      <div className="space-y-8">
        {/* ── Page header ───────────────────────────────────────────────── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between"
        >
          <div>
            <h1
              className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
              style={{ letterSpacing: '-1.2px' }}
            >
              Lost Items
            </h1>
            <p className="mt-2 text-sm text-ink-muted">
              {lostItems.length === 0
                ? 'Nothing logged yet — be the first to report.'
                : `${lostItems.length} item${lostItems.length === 1 ? '' : 's'} reported lost`}
            </p>
          </div>

          {/* Stats chip + add button */}
          <div className="flex shrink-0 items-center gap-3">
            {lostItems.length > 0 && (
              <span
                className="rounded-pill bg-lost/10 px-3 py-1.5
                           text-xs font-semibold text-lost ring-1 ring-lost/20"
              >
                {lostItems.length} lost
              </span>
            )}
            <PillButton
              id="lost-add-item-btn"
              variant="primary"
              onClick={() => setModalOpen(true)}
              aria-label="Add a lost item"
            >
              <PlusIcon />
              Add Lost Item
            </PillButton>
          </div>
        </motion.div>

        {/* ── Item grid ─────────────────────────────────────────────────── */}
        {lostItems.length === 0 ? (
          <GridEmptyState onAdd={() => setModalOpen(true)} />
        ) : (
          <ItemGrid items={lostItems} type="lost" onRemove={handleRemove} />
        )}
      </div>

      {/* ── Modal ─────────────────────────────────────────────────────────── */}
      <AddLostItemModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAdd}
      />
    </>
  )
}

/* Empty state when no lost items exist */
function GridEmptyState({ onAdd }) {
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
        style={{ backgroundColor: `${EMPTY_ACCENT}15` }}
      >
        <EmptyIcon />
      </span>
      <div>
        <p className="text-sm font-medium text-ink">No lost items yet.</p>
        <p className="mt-1 text-xs text-ink-muted">
          Hit "Add Lost Item" to log something you lost.
        </p>
      </div>
      <PillButton variant="secondary" onClick={onAdd} className="text-xs">
        <PlusIcon /> Report Lost Item
      </PillButton>
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
      stroke={EMPTY_ACCENT}
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

function PlusIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

export default LostPage
