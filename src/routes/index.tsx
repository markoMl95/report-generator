import { createFileRoute, redirect } from '@tanstack/react-router'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'

export const Route = createFileRoute('/')({
  component: App,
  beforeLoad: async ({ context }) => {
    const { isLogged } = context.authentication
    if (!isLogged()) {
      throw redirect({ to: '/login' })
    }
  },
})

function App() {
  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 5 }}>
        Welcome to Report analytic tool!
      </Typography>
      <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
        {
          'This is a simple report analytic tool where you can add new reports,edit or delete existing ones.\n For admin privileges, check out the Admin page.'
        }
      </Typography>
    </Box>
  )
}
