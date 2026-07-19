import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PillButton from '../../components/ui/PillButton'
import { ROUTES } from '../../constants/routes'
import { fadeInUp } from '../../constants/motion'

/*
  Home Dashboard — primary landing page.
  Shows an empty state until real data is connected from the backend.
*/
function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="space-y-10">
      {/* ── Page header ─────────────────────────────────────────────────── */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between"
      >
        {/* Left: title + subtitle */}
        <div>
          <h1
            className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
            style={{ letterSpacing: '-1px' }}
          >
            Lost &amp; Found
          </h1>
          <p className="mt-2 text-sm text-ink-muted">
            Report a lost item or help someone find theirs
          </p>
        </div>

        {/* Right: action pill buttons */}
        <div className="flex shrink-0 items-center gap-3">
          <PillButton
            id="btn-report-lost"
            variant="secondary"
            onClick={() => navigate(ROUTES.LOST)}
            aria-label="Report a lost item"
          >
            <PlusIcon />
            Lost Item
          </PillButton>
          <PillButton
            id="btn-report-found"
            variant="primary"
            onClick={() => navigate(ROUTES.FOUND)}
            aria-label="Report a found item"
          >
            <PlusIcon />
            Found Item
          </PillButton>
        </div>
      </motion.div>

      {/* ── Empty state ─────────────────────────────────────────────────── */}
      <EmptyState onLost={() => navigate(ROUTES.LOST)} onFound={() => navigate(ROUTES.FOUND)} />
    </div>
  )
}

/* Empty state — shown when no items exist yet */
function EmptyState({ onLost, onFound }) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="show"
      className="flex flex-col items-center justify-center rounded-[30px] px-8 py-24 text-center"
      style={{
        background:
          'radial-gradient(ellipse at 50% 0%, #1e1b4b 0%, #0a0a0b 70%)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Icon */}
      <div
        className="mb-6 grid h-16 w-16 place-items-center rounded-full bg-surface-2"
        aria-hidden="true"
      >
        <SearchIcon />
      </div>

      <h2
        className="text-xl font-semibold tracking-tight text-ink"
        style={{ letterSpacing: '-0.5px' }}
      >
        No items yet
      </h2>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-muted">
        Be the first to post a report. It only takes a moment and could make someone's day.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <PillButton id="empty-btn-lost" variant="secondary" onClick={onLost}>
          <PlusIcon />
          Report Lost
        </PillButton>
        <PillButton id="empty-btn-found" variant="primary" onClick={onFound}>
          <PlusIcon />
          Report Found
        </PillButton>
      </div>
    </motion.div>
  )
}

function PlusIcon() {
  return (
    <svg
      width="14"
      height="14"
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

function SearchIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-ink-muted"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

export default HomePage
