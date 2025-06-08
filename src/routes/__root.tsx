import {
  Outlet,
  createRootRouteWithContext,
  useRouterState,
} from '@tanstack/react-router'
// import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import type { AuthContext } from '@/hooks/useAuth'
import Navigation from '@/containers/Navigation'

type RouterContext = {
  authentication: AuthContext
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => {
    const { location } = useRouterState()
    const isLoginPage = location.pathname === '/login'

    const content = <Outlet />

    return isLoginPage ? (
      <>
        {content}
        {/* <TanStackRouterDevtools />*/}
      </>
    ) : (
      <Navigation>
        {content}
        {/* <TanStackRouterDevtools />*/}
      </Navigation>
    )
  },
})
