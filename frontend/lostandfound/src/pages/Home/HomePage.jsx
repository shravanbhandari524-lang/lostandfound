import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PillButton from '../../components/ui/PillButton'
import StatsBanner from '../../components/ui/StatsBanner'
import { ROUTES } from '../../constants/routes'
import { fadeInUp, staggerContainer } from '../../constants/motion'
import { useItems } from '../../context/ItemsContext'
import { formatDate } from '../../utils/formatDate'

/*
  Home Dashboard — two side-by-side panels: Lost | Found.
  Shows list of items from ItemsContext (persisted locally).
*/
function HomePage() {
  const navigate = useNavigate()
  const { items } = useItems()

  // Calculate statistics for StatsBanner
  const lostCount = items.filter(
    (item) => item.status === 'lost' || item.type === 'lost'
  ).length
  const foundCount = items.filter(
    (item) => item.status === 'found' || item.type === 'found'
  ).length
  const total = items.length

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
            style={{ letterSpacing: '-1.5px' }}
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

      {/* ── Stats Banner ────────────────────────────────────────────────── */}
      <StatsBanner lostCount={lostCount} foundCount={foundCount} total={total} />

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
function ItemPanel({ type, label, color, accent, emptyMessage, onAction, actionLabel }) {
  const { items } = useItems()

  // Filter items by type (supporting both legacy status and new type fields)
  const filteredItems = items.filter(
    (item) => item.status === type || item.type === type
  )

  return (
    <motion.section
      variants={fadeInUp}
      className="flex flex-col rounded-xl bg-surface-1 ring-1 ring-white/5 overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.25)]"
      style={{ minHeight: '480px' }}
    >
      {/* Panel header */}
      <div className="flex items-center justify-between border-b border-hairline-soft px-6 py-4 bg-surface-1/40 backdrop-blur-sm">
        <div className="flex items-center gap-2.5">
          <span
            className="h-2.5 w-2.5 rounded-full animate-pulse"
            style={{ backgroundColor: accent }}
            aria-hidden="true"
          />
          <h2 className={`text-sm font-semibold tracking-tight ${color}`}>
            {label}
          </h2>
        </div>
        <span className="rounded-md bg-surface-2 px-2 py-0.5 text-xs font-medium text-ink-muted border border-hairline-soft">
          {filteredItems.length}
        </span>
      </div>

      {/* Panel body */}
      <div className="flex flex-1 flex-col">
        {filteredItems.length === 0 ? (
          <PanelEmptyState
            message={emptyMessage}
            actionLabel={actionLabel}
            onAction={onAction}
            accent={accent}
          />
        ) : (
          <ul className="divide-y divide-hairline-soft overflow-y-auto max-h-[420px] custom-scrollbar">
            {filteredItems.map((item) => (
              <li
                key={item.id || item.createdAt}
                className="px-6 py-4.5 transition-colors hover:bg-surface-2/20 flex flex-col gap-2"
              >
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-sm font-semibold text-ink leading-tight">
                    {item.productName || item.title}
                  </h3>
                  <span className="text-[11px] font-medium text-ink-muted whitespace-nowrap bg-surface-2/65 px-2 py-0.5 rounded border border-hairline-soft">
                    {formatDate(item.date)}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-ink-muted line-clamp-2">
                  {item.description}
                </p>
                <div className="mt-1 flex items-center justify-between gap-4">
                  <span className="inline-flex items-center gap-1.5 text-xs text-ink-muted/80">
                    <LocationIcon />
                    {item.location}
                  </span>
                  {item.category && (
                    <span className="rounded-sm bg-surface-2/40 px-1.5 py-0.5 text-[10px] font-medium text-ink-muted border border-hairline-soft/40">
                      {item.category}
                    </span>
                  )}
                </div>
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

function LocationIcon() {
  return (
    <svg
      width="12"
      height="12"
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

export default HomePage
