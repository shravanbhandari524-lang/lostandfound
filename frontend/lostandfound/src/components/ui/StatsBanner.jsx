import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '../../constants/motion'

/*
  StatsBanner — three pill chips showing total / lost / found counts.
  Sits between the page header and the item grid on the Home dashboard.
*/
function StatsBanner({ lostCount, foundCount, total }) {
  const stats = [
    { label: 'Total Reports', value: total, color: 'text-ink' },
    { label: 'Lost', value: lostCount, color: 'text-lost' },
    { label: 'Found', value: foundCount, color: 'text-found' },
  ]

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="grid grid-cols-3 gap-3 sm:gap-4"
    >
      {stats.map(({ label, value, color }) => (
        <motion.div
          key={label}
          variants={fadeInUp}
          className="flex flex-col items-center justify-center gap-1 rounded-xl
                     bg-surface-1 px-4 py-5 ring-1 ring-white/5
                     shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
        >
          <span className={`text-2xl font-semibold tracking-tight sm:text-3xl ${color}`}>
            {value}
          </span>
          <span className="text-xs font-medium text-ink-muted">{label}</span>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default StatsBanner
