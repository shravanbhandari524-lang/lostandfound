import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Badge from "../ui/Badge";
import { fadeInUp } from "../../constants/motion";
import { formatDate } from "../../utils/formatDate";

/*
  FoundItemCard — a charcoal elevation-2 card for a single found item.
  Renders location, category, date and a Remove button that:
    1. Shows a confirmation tooltip ("Sure?") on first click.
    2. Calls onRemove(id) on the second click.
  The card exits with a scale-out + fade so the grid closes the gap smoothly.
*/

function FoundItemCard({ item, onRemove }) {
  const [confirmPending, setConfirmPending] = useState(false);

  function handleRemoveClick() {
    if (confirmPending) {
      onRemove(item.id);
    } else {
      setConfirmPending(true);
    }
  }

  function handleBlur() {
    // Reset if the user clicks elsewhere without confirming
    setConfirmPending(false);
  }

  return (
    <motion.article
      layout
      variants={fadeInUp}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      exit={{
        opacity: 0,
        scale: 0.92,
        transition: { duration: 0.22, ease: [0.4, 0, 1, 1] },
      }}
      className="group relative flex flex-col rounded-xl bg-surface-1
                 ring-1 ring-white/5
                 shadow-[0_0_0_0.5px_rgba(255,255,255,0.05),_0_10px_30px_rgba(0,0,0,0.25)]"
      aria-label={`Found item: ${item.title}`}
    >
      {/* Card body */}
      <div className="flex flex-1 flex-col p-5">
        {/* Top row: badge + date */}
        <div className="mb-4 flex items-start justify-between gap-3">
          <Badge status={item.status} />
          <span className="text-xs font-medium text-ink-muted">
            {formatDate(item.date)}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-base font-semibold tracking-tight text-ink"
          style={{ letterSpacing: "-0.4px" }}
        >
          {item.title}
        </h3>

        {/* Description */}
        {item.description ? (
          <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
            {item.description}
          </p>
        ) : (
          <p className="mt-2 flex-1 text-sm italic text-ink-muted/40">
            No description provided.
          </p>
        )}
      </div>

      {/* Card footer */}
      <div className="flex items-center justify-between border-t border-hairline-soft px-5 py-3">
        {/* Location + category */}
        <div className="flex flex-col gap-0.5">
          <span className="inline-flex items-center gap-1.5 text-xs text-ink-muted">
            <LocationIcon />
            {item.location}
          </span>
          <span
            className="self-start rounded-xs bg-surface-2 px-2 py-0.5
                       text-[11px] font-medium text-ink-muted"
          >
            {item.category}
          </span>
        </div>

        {/* Remove button */}
        <AnimatePresence mode="wait">
          {confirmPending ? (
            <motion.button
              key="confirm"
              type="button"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.15 }}
              onClick={handleRemoveClick}
              onBlur={handleBlur}
              id={`found-remove-confirm-${item.id}`}
              aria-label={`Confirm remove ${item.title}`}
              className="rounded-pill bg-red-500/15 px-3 py-1.5 text-xs font-medium
                         text-red-400 ring-1 ring-red-500/25 transition-colors
                         hover:bg-red-500/25 cursor-pointer"
            >
              Sure?
            </motion.button>
          ) : (
            <motion.button
              key="remove"
              type="button"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.15 }}
              onClick={handleRemoveClick}
              id={`found-remove-${item.id}`}
              aria-label={`Remove ${item.title}`}
              className="grid h-7 w-7 place-items-center rounded-full text-ink-muted
                         transition-colors hover:bg-surface-2 hover:text-red-400
                         opacity-0 group-hover:opacity-100 cursor-pointer"
            >
              <TrashIcon />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

/* ── Inline icons ─────────────────────────────────────────────────────────── */

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
  );
}

function TrashIcon() {
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
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}

export default FoundItemCard;
