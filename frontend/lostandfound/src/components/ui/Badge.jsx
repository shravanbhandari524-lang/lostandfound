import { ITEM_STATUS } from '../../constants/itemStatus'
import { cn } from '../../utils/cn'

/*
  LOST / FOUND status badge. Uses a tinted chip rather than a solid fill so
  it reads clearly against the charcoal card surface.
*/
const STATUS_STYLES = {
  [ITEM_STATUS.LOST]: 'bg-lost/12 text-lost ring-lost/25',
  [ITEM_STATUS.FOUND]: 'bg-found/12 text-found ring-found/25',
}

function Badge({ status }) {
  const label = status === ITEM_STATUS.LOST ? 'LOST' : 'FOUND'

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-sm px-2.5 py-1',
        'text-[11px] font-semibold uppercase tracking-[0.12em]',
        'ring-1 ring-inset',
        STATUS_STYLES[status],
      )}
    >
      {label}
    </span>
  )
}

export default Badge
