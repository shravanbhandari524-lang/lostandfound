import { motion, AnimatePresence } from 'framer-motion'
import ItemCard from './ItemCard'
import SpotlightCard from './SpotlightCard'
import { staggerContainer } from '../../constants/motion'

/*
  ItemGrid — responsive 3-column grid with staggered card reveal.
  A gradient spotlight card is injected at index 2 (third slot) to
  break the monochrome cadence, following the DESIGN.md "atmosphere card"
  pattern: one atmospheric tile in an otherwise charcoal grid.
*/
const SPOTLIGHT_INJECT_AT = 2

function ItemGrid({ items, type = 'lost' }) {
  // Build display slots: splice in the spotlight card at the defined index
  const slots = []
  items.forEach((item, idx) => {
    if (idx === SPOTLIGHT_INJECT_AT) {
      slots.push({ type: 'spotlight', id: 'spotlight' })
    }
    slots.push({ type: 'item', id: item.id || item.createdAt, item })
  })

  // If there are fewer than 3 items, we should still inject the spotlight card at the end so it's always shown
  if (items.length <= SPOTLIGHT_INJECT_AT) {
    slots.push({ type: 'spotlight', id: 'spotlight' })
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      layout
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      <AnimatePresence mode="popLayout">
        {slots.map((slot) =>
          slot.type === 'spotlight' ? (
            <SpotlightCard key="spotlight" type={type} />
          ) : (
            <ItemCard key={slot.id} item={slot.item} />
          ),
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default ItemGrid
