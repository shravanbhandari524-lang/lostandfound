import { createContext, useContext, useState, useEffect } from 'react'

const ItemsContext = createContext()

export function ItemsProvider({ children }) {
  // Use v2 key and default to empty array [] to remove fake data from the main dashboard
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('lost_and_found_items_v2')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('lost_and_found_items_v2', JSON.stringify(items))
  }, [items])

  const addLostItem = (item) => {
    const newItem = {
      id: `lost-${Date.now()}`,
      status: 'lost', // Compatibility status field
      title: item.productName, // Compatibility title field
      category: 'Lost', // Default category
      ...item, // Includes type: 'lost', productName, description, location, date, createdAt
    }
    setItems((prev) => [newItem, ...prev])
  }

  const deleteItem = (id) => {
    setItems((prev) => prev.filter((item) => (item.id || item.createdAt) !== id))
  }

  return (
    <ItemsContext.Provider value={{ items, addLostItem, deleteItem }}>
      {children}
    </ItemsContext.Provider>
  )
}

/* eslint-disable-next-line react-refresh/only-export-components */
export function useItems() {
  const context = useContext(ItemsContext)
  if (context === undefined) {
    throw new Error('useItems must be used within an ItemsProvider')
  }
  return context
}
