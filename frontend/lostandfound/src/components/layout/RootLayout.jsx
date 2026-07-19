import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

// App shell: persistent navbar + routed page content.
function RootLayout() {
  return (
    <div className="min-h-svh bg-canvas text-ink">
      <Navbar />
      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout
