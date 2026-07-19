// Formats an ISO date string (e.g. "2026-07-16") into a readable label.
export function formatDate(isoDate) {
  const date = new Date(isoDate)
  if (Number.isNaN(date.getTime())) return isoDate

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}
