import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useItems } from '../../context/ItemsContext'
import PillButton from '../../components/ui/PillButton'
import ItemGrid from '../../components/cards/ItemGrid'

function LostPage() {
  const { items, addLostItem } = useItems()

  // View state: dashboard list mode vs. add item form mode
  const [showForm, setShowForm] = useState(false)

  // Form states
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    location: '',
    date: new Date().toISOString().split('T')[0], // today's date YYYY-MM-DD
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Auto-redirect back to list view on success
  useEffect(() => {
    let timer
    if (isSuccess) {
      timer = setTimeout(() => {
        setIsSuccess(false)
        setShowForm(false)
        setFormData({
          productName: '',
          description: '',
          location: '',
          date: new Date().toISOString().split('T')[0],
        })
      }, 2500)
    }
    return () => clearTimeout(timer)
  }, [isSuccess])

  // Filter only lost items for the list
  const lostItems = items.filter(
    (item) => item.status === 'lost' || item.type === 'lost'
  )

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear validation error when typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.productName.trim()) {
      newErrors.productName = 'Product name is required'
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Location of loss is required'
    }
    if (!formData.date) {
      newErrors.date = 'Date is required'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)

    // Simulate premium visual submission transition delay
    setTimeout(() => {
      const submission = {
        type: 'lost',
        productName: formData.productName.trim(),
        description: formData.description.trim(),
        location: formData.location.trim(),
        date: formData.date,
        createdAt: new Date().toISOString(),
      }

      addLostItem(submission)
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 1000)
  }

  const handleCancel = () => {
    setShowForm(false)
    setErrors({})
    setFormData({
      productName: '',
      description: '',
      location: '',
      date: new Date().toISOString().split('T')[0],
    })
  }

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!showForm ? (
          /* ── DASHBOARD GRID MODE ─────────────────────────────────────────── */
          <motion.div
            key="list-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="space-y-8"
          >
            {/* Header section matching user reference screenshot */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1
                  className="text-3xl font-bold tracking-tight text-ink sm:text-4xl"
                  style={{ letterSpacing: '-1.5px' }}
                >
                  Lost Items
                </h1>
                <p className="mt-1 text-sm text-ink-muted">
                  {lostItems.length} {lostItems.length === 1 ? 'item' : 'items'} reported lost
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex items-center rounded-pill bg-lost/12 px-3 py-1 text-xs font-semibold tracking-wide text-lost ring-1 ring-lost/25">
                  {lostItems.length} lost
                </span>
                <PillButton
                  variant="primary"
                  onClick={() => setShowForm(true)}
                  aria-label="Add lost item"
                >
                  <PlusIcon />
                  Add Lost Item
                </PillButton>
              </div>
            </div>

            {/* Item listing */}
            {lostItems.length === 0 ? (
              <div className="rounded-xl border border-hairline-soft bg-surface-1/40 py-20 text-center flex flex-col items-center justify-center gap-4">
                <div className="h-10 w-10 rounded-full bg-lost/10 text-lost flex items-center justify-center">
                  <InboxIcon />
                </div>
                <div>
                  <p className="text-sm font-medium text-ink">No lost items reported yet</p>
                  <p className="mt-1 text-xs text-ink-muted">Be the first to post a lost item report.</p>
                </div>
                <PillButton variant="secondary" onClick={() => setShowForm(true)} className="mt-2 text-xs">
                  <PlusIcon /> Report Lost Item
                </PillButton>
              </div>
            ) : (
              <ItemGrid items={lostItems} type="lost" />
            )}
          </motion.div>
        ) : (
          /* ── FORM CREATION MODE ──────────────────────────────────────────── */
          <motion.div
            key="form-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="space-y-10 max-w-xl mx-auto"
          >
            {/* Header & Back Button */}
            <div className="flex flex-col items-start">
              <button
                type="button"
                onClick={handleCancel}
                className="group mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink-muted transition-colors hover:text-ink cursor-pointer"
              >
                <ArrowLeftIcon />
                Cancel &amp; Go Back
              </button>
              <h1
                className="text-3xl font-bold tracking-tight text-ink sm:text-4xl"
                style={{ letterSpacing: '-1.5px' }}
              >
                Report a Lost Item
              </h1>
              <p className="mt-2 text-sm text-ink-muted">
                Provide details about your lost item to publish a report on the campus board.
              </p>
            </div>

            {/* Form Card */}
            <div className="relative overflow-hidden rounded-xl bg-surface-1 border border-hairline shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
              <div className="h-1 w-full bg-lost" />

              <div className="p-6 sm:p-8">
                <AnimatePresence mode="wait">
                  {!isSuccess ? (
                    <motion.form
                      key="form-fields"
                      onSubmit={handleSubmit}
                      className="space-y-5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      noValidate
                    >
                      {/* Read-Only Report Type */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5">
                          Report Type
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value="Lost (automatically assigned)"
                            disabled
                            readOnly
                            className="w-full rounded-md border border-hairline-soft bg-surface-2/40 px-4 py-3 text-sm text-ink-muted cursor-not-allowed outline-none select-none"
                          />
                          <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            <span className="h-2 w-2 rounded-full bg-lost inline-block" />
                          </div>
                        </div>
                      </div>

                      {/* Product Name */}
                      <div>
                        <label
                          htmlFor="productName"
                          className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5"
                        >
                          Product Name
                        </label>
                        <input
                          id="productName"
                          name="productName"
                          type="text"
                          value={formData.productName}
                          onChange={handleChange}
                          placeholder="e.g., iPhone 15 Pro, Leather Wallet"
                          className={`w-full rounded-md border bg-surface-2 px-4 py-3 text-sm text-ink placeholder:text-ink-muted/40 outline-none transition-all focus:border-accent-blue focus:ring-1 focus:ring-accent-blue ${
                            errors.productName ? 'border-lost/60 focus:border-lost focus:ring-lost/40' : 'border-hairline'
                          }`}
                        />
                        {errors.productName && (
                          <p className="mt-1.5 text-xs text-lost font-medium flex items-center gap-1.5">
                            <AlertIcon />
                            {errors.productName}
                          </p>
                        )}
                      </div>

                      {/* Date & Location Grid */}
                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        {/* Location */}
                        <div>
                          <label
                            htmlFor="location"
                            className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5"
                          >
                            Location Lost
                          </label>
                          <input
                            id="location"
                            name="location"
                            type="text"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="e.g., Library, Block B"
                            className={`w-full rounded-md border bg-surface-2 px-4 py-3 text-sm text-ink placeholder:text-ink-muted/40 outline-none transition-all focus:border-accent-blue focus:ring-1 focus:ring-accent-blue ${
                              errors.location ? 'border-lost/60 focus:border-lost focus:ring-lost/40' : 'border-hairline'
                            }`}
                          />
                          {errors.location && (
                            <p className="mt-1.5 text-xs text-lost font-medium flex items-center gap-1.5">
                              <AlertIcon />
                              {errors.location}
                            </p>
                          )}
                        </div>

                        {/* Date */}
                        <div>
                          <label
                            htmlFor="date"
                            className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5"
                          >
                            Date Lost
                          </label>
                          <input
                            id="date"
                            name="date"
                            type="date"
                            value={formData.date}
                            onChange={handleChange}
                            style={{ colorScheme: 'dark' }}
                            className={`w-full rounded-md border bg-surface-2 px-4 py-3 text-sm text-ink outline-none transition-all focus:border-accent-blue focus:ring-1 focus:ring-accent-blue ${
                              errors.date ? 'border-lost/60 focus:border-lost focus:ring-lost/40' : 'border-hairline'
                            }`}
                          />
                          {errors.date && (
                            <p className="mt-1.5 text-xs text-lost font-medium flex items-center gap-1.5">
                              <AlertIcon />
                              {errors.date}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <label
                          htmlFor="description"
                          className="block text-xs font-semibold uppercase tracking-wider text-ink-muted mb-1.5"
                        >
                          Description
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          rows="4"
                          value={formData.description}
                          onChange={handleChange}
                          placeholder="Describe the item (color, unique marks, contents if a bag, etc.)"
                          className={`w-full rounded-md border bg-surface-2 px-4 py-3 text-sm text-ink placeholder:text-ink-muted/40 outline-none transition-all focus:border-accent-blue focus:ring-1 focus:ring-accent-blue resize-none ${
                            errors.description ? 'border-lost/60 focus:border-lost focus:ring-lost/40' : 'border-hairline'
                          }`}
                        />
                        {errors.description && (
                          <p className="mt-1.5 text-xs text-lost font-medium flex items-center gap-1.5">
                            <AlertIcon />
                            {errors.description}
                          </p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="pt-2 flex items-center justify-end gap-3">
                        <PillButton
                          variant="secondary"
                          onClick={handleCancel}
                          disabled={isSubmitting}
                        >
                          Cancel
                        </PillButton>
                        <PillButton
                          type="submit"
                          variant="primary"
                          disabled={isSubmitting}
                          className="min-w-[140px] justify-center"
                        >
                          {isSubmitting ? (
                            <span className="flex items-center gap-2">
                              <Spinner /> Submitting...
                            </span>
                          ) : (
                            'Submit Report'
                          )}
                        </PillButton>
                      </div>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success-message"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: 'spring', duration: 0.5 }}
                      className="flex flex-col items-center justify-center py-10 text-center"
                    >
                      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success">
                        <CheckIcon />
                      </div>
                      <h2
                        className="text-2xl font-bold tracking-tight text-ink"
                        style={{ letterSpacing: '-0.5px' }}
                      >
                        Lost Report Submitted
                      </h2>
                      <p className="mt-3 max-w-sm text-sm text-ink-muted">
                        Your report for{' '}
                        <strong className="text-ink font-medium">
                          {formData.productName}
                        </strong>{' '}
                        has been posted. Returning to dashboard...
                      </p>
                      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <PillButton
                          variant="primary"
                          onClick={() => {
                            setIsSuccess(false)
                            setShowForm(false)
                            setFormData({
                              productName: '',
                              description: '',
                              location: '',
                              date: new Date().toISOString().split('T')[0],
                            })
                          }}
                        >
                          Go to Dashboard Now
                        </PillButton>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Icons & Helpers ─────────────────────────────────────────────────────────

function ArrowLeftIcon() {
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
      className="transition-transform group-hover:-translate-x-0.5"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  )
}

function AlertIcon() {
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
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function Spinner() {
  return (
    <svg
      className="animate-spin"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  )
}

function InboxIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
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

export default LostPage
