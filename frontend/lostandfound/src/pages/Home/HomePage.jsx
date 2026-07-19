import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PillButton from '../../components/ui/PillButton'
import { ROUTES } from '../../constants/routes'
import { fadeInUp, staggerContainer } from '../../constants/motion'

/*
  Home Dashboard — two side-by-side panels: Lost | Found.
  Each panel shows an empty state until the backend is connected.
*/
function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="space-y-8">
      {/* ── Page header ─────────────────────────────────────────────────── */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between"
      >
        <div>
          <h1
            className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
            style={{ letterSpacing: '-1px' }}
          >
            Dashboard
          </h1>
          <p className="mt-2 text-sm text-ink-muted">
            Report a lost item or help someone find theirs
          </p>
        </div>

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

      {/* ── Two-panel grid ──────────────────────────────────────────────── */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-5 lg:grid-cols-2"
      >
        <ItemPanel
          type="lost"
          label="Lost Items"
          color="text-lost"
          accent="#ff5a7a"
          emptyMessage="No lost items reported yet."
          onAction={() => navigate(ROUTES.LOST)}
          actionLabel="Report Lost"
        />
        <ItemPanel
          type="found"
          label="Found Items"
          color="text-found"
          accent="#34d17d"
          emptyMessage="No found items reported yet."
          onAction={() => navigate(ROUTES.FOUND)}
          actionLabel="Report Found"
        />
      </motion.div>
    </div>
  )
}

/* ── Single panel (Lost or Found) ─────────────────────────────────────────── */
function ItemPanel({ label, color, accent, emptyMessage, onAction, actionLabel }) {
  // items = [] until wired to backend
  const items = []

  return (
    <motion.section
      variants={fadeInUp}
      className="flex flex-col rounded-xl bg-surface-1 ring-1 ring-white/5 overflow-hidden"
      style={{ minHeight: '480px' }}
    >
      {/* Panel header */}
      <div className="flex items-center justify-between border-b border-hairline-soft px-6 py-4">
        <div className="flex items-center gap-2.5">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: accent }}
            aria-hidden="true"
          />
          <h2 className={`text-sm font-semibold tracking-tight ${color}`}>
            {label}
          </h2>
        </div>
        <span className="rounded-md bg-surface-2 px-2 py-0.5 text-xs font-medium text-ink-muted">
          {items.length}
        </span>
      </div>

      {/* Panel body */}
      <div className="flex flex-1 flex-col">
        {items.length === 0 ? (
          <PanelEmptyState
            message={emptyMessage}
            actionLabel={actionLabel}
            onAction={onAction}
            accent={accent}
          />
        ) : (
          <ul className="divide-y divide-hairline-soft">
            {items.map((item) => (
              <li key={item.id} className="px-6 py-4 text-sm text-ink">
                {item.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.section>
  )
}

/* Empty state inside a panel */
function PanelEmptyState({ message, actionLabel, onAction, accent }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 py-16 text-center">
      <div
        className="grid h-12 w-12 place-items-center rounded-full"
        style={{ backgroundColor: `${accent}18` }}
        aria-hidden="true"
      >
        <InboxIcon accent={accent} />
      </div>
      <div>
        <p className="text-sm font-medium text-ink">{message}</p>
        <p className="mt-1 text-xs text-ink-muted">
          Items will appear here once reports are submitted.
        </p>
      </div>
      <button
        type="button"
        onClick={onAction}
        className="mt-1 rounded-pill px-4 py-2 text-xs font-medium transition-opacity hover:opacity-80 cursor-pointer"
        style={{ backgroundColor: `${accent}18`, color: accent }}
      >
        {actionLabel}
      </button>
    </div>
  )
}

function InboxIcon({ accent }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={accent}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
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

export default HomePage
