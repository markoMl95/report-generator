import { createFileRoute, useNavigate } from '@tanstack/react-router'
import Box from '@mui/material/Box'
import { Button, MenuItem, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import useAuth from '@/hooks/useAuth.ts'
import { useReportContext } from '@/contexts/ReportContext.tsx'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

const roles = ['admin', 'user']

function RouteComponent() {
  const [role, setRole] = useState('')
  const { signIn } = useAuth()
  const { setIsAdmin } = useReportContext()
  const navigate = useNavigate()

  const handleLogin = () => {
    signIn(role)
    setIsAdmin(role === 'admin')
    navigate({ to: '/' })
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      gap={3}
    >
      <Typography variant="h5">Choose your role</Typography>

      <TextField
        select
        label="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        sx={{ minWidth: 200 }}
      >
        {roles.map((option) => (
          <MenuItem key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </MenuItem>
        ))}
      </TextField>

      <Button variant="contained" onClick={handleLogin} disabled={!role}>
        Login
      </Button>
    </Box>
  )
}
