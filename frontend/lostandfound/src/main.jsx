import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import RootLayout from './components/layout/RootLayout'
import HomePage from './pages/Home/HomePage'
import LostPage from './pages/Lost/LostPage'
import FoundPage from './pages/Found/FoundPage'
import { ROUTES } from './constants/routes'
import { ItemsProvider } from './context/ItemsContext'

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ROUTES.LOST, element: <LostPage /> },
      { path: ROUTES.FOUND, element: <FoundPage /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ItemsProvider>
      <RouterProvider router={router} />
    </ItemsProvider>
  </StrictMode>,
)
