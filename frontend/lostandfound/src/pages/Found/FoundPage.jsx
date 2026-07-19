import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import PillButton from '../../components/ui/PillButton'
import AddFoundItemModal from '../../components/found/AddFoundItemModal'
import FoundItemGrid from '../../components/found/FoundItemGrid'
import { initialFoundItems } from '../../data/foundItems'
import { fadeInUp } from '../../constants/motion'

/*
  Found Item Page (/found)

  Responsibilities:
    - Owns the found-items list state (add / remove).
    - Renders the page header with item count and an "Add Found Item" CTA.
    - Shows a responsive card grid via FoundItemGrid.
    - Opens AddFoundItemModal for the add flow.
*/

function FoundPage() {
  const [items, setItems] = useState(initialFoundItems)
  const [modalOpen, setModalOpen] = useState(false)

  // Add a new found item to the top of the list
  const handleAdd = useCallback((item) => {
    setItems((prev) => [item, ...prev])
  }, [])

  // Remove a found item by id
  const handleRemove = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }, [])

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
              Found Items
            </h1>
            <p className="mt-2 text-sm text-ink-muted">
              {items.length === 0
                ? 'Nothing logged yet — be the first to report.'
                : `${items.length} item${items.length === 1 ? '' : 's'} reported found`}
            </p>
          </div>

          {/* Stats chip + add button */}
          <div className="flex shrink-0 items-center gap-3">
            {items.length > 0 && (
              <span
                className="rounded-pill bg-found/10 px-3 py-1.5
                           text-xs font-semibold text-found ring-1 ring-found/20"
              >
                {items.length} found
              </span>
            )}
            <PillButton
              id="found-add-item-btn"
              variant="primary"
              onClick={() => setModalOpen(true)}
              aria-label="Add a found item"
            >
              <PlusIcon />
              Add Found Item
            </PillButton>
          </div>
        </motion.div>

        {/* ── Item grid ─────────────────────────────────────────────────── */}
        <FoundItemGrid items={items} onRemove={handleRemove} />
      </div>

      {/* ── Modal ─────────────────────────────────────────────────────────── */}
      <AddFoundItemModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAdd}
      />
    </>
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

export default FoundPage
