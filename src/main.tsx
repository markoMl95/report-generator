import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { routeTree } from './routeTree.gen'

import reportWebVitals from './reportWebVitals.ts'
import { ReportProvider } from '@/contexts/ReportContext'
import theme from '@/styles/theme'
import useAuth from '@/hooks/useAuth'

const router = createRouter({
  routeTree,
  context: { authentication: useAuth() },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const queryClient = new QueryClient()

const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  const authentication = useAuth()
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ReportProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <RouterProvider router={router} context={{ authentication }} />
            <ReactQueryDevtools initialIsOpen={false} />
          </ThemeProvider>
        </ReportProvider>
      </QueryClientProvider>
    </StrictMode>,
  )
}

reportWebVitals()
