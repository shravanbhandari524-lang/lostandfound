import { ITEM_STATUS } from '../constants/itemStatus'
import { items as allItems } from './items'

/*
  Found-page seed data.
  Filtered from the shared dummy dataset so the Found page
  starts with real-looking entries rather than a blank slate.
*/
export const initialFoundItems = allItems.filter(
  (item) => item.status === ITEM_STATUS.FOUND,
)
