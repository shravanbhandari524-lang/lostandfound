import { motion } from 'framer-motion'
import { fadeInUp } from '../../constants/motion'

/*
  Lost Item Page (/lost)
  Placeholder page — form and submission logic will be added in a future phase.
*/
function LostPage() {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="show"
      className="flex flex-col items-start gap-4"
    >
      <h1
        className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
        style={{ letterSpacing: '-1px' }}
      >
        Report a Lost Item
      </h1>
      <p className="text-sm text-ink-muted">
        This page will let you submit a report for a lost item.
      </p>
    </motion.div>
  )
}

export default LostPage
