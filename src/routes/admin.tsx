import { createFileRoute, redirect } from '@tanstack/react-router'
import { Typography } from '@mui/material'

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const { isLogged } = context.authentication
    if (!isLogged()) {
      throw redirect({ to: '/login' })
    }
  },
})

function RouteComponent() {
  return (
    <>
      <Typography variant="h3" sx={{ mb: 5 }}>
        Admin page
      </Typography>
      <Typography variant="body1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris.
      </Typography>
    </>
  )
}
