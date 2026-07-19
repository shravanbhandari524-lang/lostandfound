import { useState, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PillButton from '../ui/PillButton'
import { cn } from '../../utils/cn'

/*
  AddFoundItemModal — slide-up modal for reporting a found item.
  Accepts onAdd(item) callback; generates a unique id internally.
  Design tokens: DESIGN.md surfaces, pill button, blue focus ring,
  level-2 card shadow, Framer Motion AnimatePresence.
*/

const CATEGORIES = [
  'Electronics',
  'Accessories',
  'Bags',
  'Keys',
  'Bottles',
  'Clothing',
  'Documents',
  'Other',
]

const EMPTY_FORM = {
  title: '',
  description: '',
  location: '',
  category: CATEGORIES[0],
}

const backdropVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.22 } },
  exit: { opacity: 0, transition: { duration: 0.18 } },
}

const panelVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: 24,
    scale: 0.97,
    transition: { duration: 0.2, ease: [0.4, 0, 1, 1] },
  },
}

function Field({ label, id, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs font-medium uppercase tracking-[0.1em] text-ink-muted"
      >
        {label}
      </label>
      {children}
      {error && (
        <span className="text-xs text-red-400">{error}</span>
      )}
    </div>
  )
}

const inputCls =
  'w-full rounded-md bg-surface-2 px-3.5 py-2.5 text-sm text-ink ' +
  'placeholder:text-ink-muted/50 ' +
  'ring-1 ring-hairline transition-shadow duration-150 ' +
  'focus:outline-none focus:ring-1 focus:ring-accent-blue/60 ' +
  'focus:shadow-[0_0_0_1px_rgba(0,153,255,0.15)]'

function AddFoundItemModal({ isOpen, onClose, onAdd }) {
  const uid = useId()
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})

  function change(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }))
  }

  function validate() {
    const errs = {}
    if (!form.title.trim()) errs.title = 'Item name is required.'
    if (!form.location.trim()) errs.location = 'Location is required.'
    return errs
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    onAdd({
      id: crypto.randomUUID(),
      status: 'found',
      title: form.title.trim(),
      description: form.description.trim(),
      location: form.location.trim(),
      category: form.category,
      date: new Date().toISOString().slice(0, 10),
    })
    setForm(EMPTY_FORM)
    setErrors({})
    onClose()
  }

  function handleClose() {
    setForm(EMPTY_FORM)
    setErrors({})
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="show"
          exit="exit"
          className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.72)' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose()
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${uid}-title`}
        >
          <motion.div
            key="modal-panel"
            variants={panelVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className={cn(
              'w-full max-w-lg rounded-xxl bg-surface-1',
              'ring-1 ring-white/10',
              'shadow-[0_0_0_0.5px_rgba(255,255,255,0.1),_0_20px_60px_rgba(0,0,0,0.6)]',
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-hairline-soft px-6 py-5">
              <div className="flex items-center gap-3">
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full"
                  style={{ backgroundColor: 'rgba(52,209,125,0.12)' }}
                  aria-hidden="true"
                >
                  <SearchIcon />
                </span>
                <h2
                  id={`${uid}-title`}
                  className="text-base font-semibold tracking-tight text-ink"
                  style={{ letterSpacing: '-0.5px' }}
                >
                  Report a Found Item
                </h2>
              </div>
              <button
                type="button"
                id={`${uid}-close`}
                onClick={handleClose}
                aria-label="Close modal"
                className="grid h-8 w-8 place-items-center rounded-full text-ink-muted
                           transition-colors hover:bg-surface-2 hover:text-ink cursor-pointer"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Form body */}
            <form onSubmit={handleSubmit} noValidate>
              <div className="flex flex-col gap-5 px-6 py-6">
                {/* Item name */}
                <Field
                  label="Item name"
                  id={`${uid}-title`}
                  error={errors.title}
                >
                  <input
                    id={`${uid}-title`}
                    type="text"
                    value={form.title}
                    onChange={(e) => change('title', e.target.value)}
                    placeholder="e.g. Blue Hydro Flask Bottle"
                    className={inputCls}
                    autoFocus
                  />
                </Field>

                {/* Description */}
                <Field
                  label="Description"
                  id={`${uid}-description`}
                  error={errors.description}
                >
                  <textarea
                    id={`${uid}-description`}
                    value={form.description}
                    onChange={(e) => change('description', e.target.value)}
                    placeholder="Distinctive marks, color, condition…"
                    rows={3}
                    className={cn(inputCls, 'resize-none leading-relaxed')}
                  />
                </Field>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Location */}
                  <Field
                    label="Where found"
                    id={`${uid}-location`}
                    error={errors.location}
                  >
                    <input
                      id={`${uid}-location`}
                      type="text"
                      value={form.location}
                      onChange={(e) => change('location', e.target.value)}
                      placeholder="e.g. Block C Courtyard"
                      className={inputCls}
                    />
                  </Field>

                  {/* Category */}
                  <Field
                    label="Category"
                    id={`${uid}-category`}
                    error={errors.category}
                  >
                    <select
                      id={`${uid}-category`}
                      value={form.category}
                      onChange={(e) => change('category', e.target.value)}
                      className={cn(inputCls, 'cursor-pointer')}
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 border-t border-hairline-soft px-6 py-4">
                <PillButton
                  type="button"
                  variant="secondary"
                  id={`${uid}-cancel`}
                  onClick={handleClose}
                >
                  Cancel
                </PillButton>
                <PillButton
                  type="submit"
                  variant="primary"
                  id={`${uid}-submit`}
                >
                  <PlusIcon />
                  Add Found Item
                </PillButton>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ── Inline icons ─────────────────────────────────────────────────────────── */

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#34d17d"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
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

export default AddFoundItemModal
