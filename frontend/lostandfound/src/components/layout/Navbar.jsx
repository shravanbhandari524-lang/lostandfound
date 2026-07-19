import { Link, useLocation } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import { cn } from '../../utils/cn'

/*
  Sticky top navigation bar.
  Left  — wordmark
  Right — nav links
*/
function Navbar() {
  const location = useLocation()

  return (
    <header className="sticky top-0 z-50 border-b border-hairline-soft bg-canvas/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        {/* Wordmark */}
        <Link to={ROUTES.HOME} className="flex shrink-0 items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-inverse-canvas text-[10px] font-bold text-canvas leading-none">
            L&amp;F
          </span>
          <span className="text-sm font-semibold tracking-tight text-ink">
            Lost &amp; Found
          </span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-6 text-sm">
          <NavLink to={ROUTES.HOME} active={location.pathname === ROUTES.HOME}>
            Dashboard
          </NavLink>
          <NavLink to={ROUTES.LOST} active={location.pathname === ROUTES.LOST}>
            Lost
          </NavLink>
          <NavLink to={ROUTES.FOUND} active={location.pathname === ROUTES.FOUND}>
            Found
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

/* Active-aware nav link */
function NavLink({ to, active, children }) {
  return (
    <Link
      to={to}
      className={cn(
        'transition-colors hover:text-ink',
        active ? 'font-medium text-ink' : 'text-ink-muted',
      )}
    >
      {children}
    </Link>
  )
}

export default Navbar
