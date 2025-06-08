import { useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import LogoutIcon from '@mui/icons-material/Logout'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import { Tooltip } from '@mui/material'
import { AppBar, Drawer, DrawerHeader, styles } from './styles.ts'
import type { ReactNode } from 'react'
import useAuth from '@/hooks/useAuth.ts'
import { useReportContext } from '@/contexts/ReportContext.tsx'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Reports', to: '/reports' },
]

export const Navigation = ({ children }: { children: ReactNode }) => {
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const { signOut } = useAuth()
  const { isAdmin, setIsAdmin } = useReportContext()
  const navigate = useNavigate()
  const { link } = styles

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[{ marginRight: 5 }, open && { display: 'none' }]}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {navItems.map(({ label, to }, index) => (
            <Link to={to} key={label} style={link}>
              <ListItem key={label} disablePadding sx={{ display: 'block' }}>
                <Tooltip title={label} placement="right">
                  <ListItemButton
                    sx={[
                      { minHeight: 48, px: 2.5 },
                      open
                        ? { justifyContent: 'initial' }
                        : { justifyContent: 'center' },
                    ]}
                  >
                    <ListItemIcon
                      sx={[
                        { minWidth: 0, justifyContent: 'center' },
                        open ? { mr: 3 } : { mr: 'auto' },
                      ]}
                    >
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText
                      primary={label}
                      sx={[
                        open
                          ? {
                              opacity: 1,
                            }
                          : {
                              opacity: 0,
                            },
                      ]}
                    />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <Link to={'/admin'} key="Admin" style={link}>
            {isAdmin ? (
              <ListItem
                key="Admin"
                disablePadding
                sx={{
                  display: 'block',
                }}
              >
                <Tooltip title="Admin" placement="right">
                  <ListItemButton
                    sx={[
                      { minHeight: 48, px: 2.5 },
                      open
                        ? { justifyContent: 'initial' }
                        : { justifyContent: 'center' },
                    ]}
                  >
                    <ListItemIcon
                      sx={[
                        { minWidth: 0, justifyContent: 'center' },
                        open ? { mr: 3 } : { mr: 'auto' },
                      ]}
                    >
                      <AdminPanelSettingsIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Admin"
                      sx={[open ? { opacity: 1 } : { opacity: 0 }]}
                    />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            ) : (
              <div />
            )}
          </Link>
          <ListItem key="logout" disablePadding sx={{ display: 'block' }}>
            <Tooltip title="Logout" placement="right">
              <ListItemButton
                onClick={() => {
                  setIsAdmin(false)
                  signOut()
                  navigate({ to: '/login' })
                }}
                sx={[
                  { minHeight: 48, px: 2.5 },
                  open
                    ? { justifyContent: 'initial' }
                    : { justifyContent: 'center' },
                ]}
              >
                <ListItemIcon
                  sx={[
                    { minWidth: 0, justifyContent: 'center' },
                    open ? { mr: 3 } : { mr: 'auto' },
                  ]}
                >
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Logout"
                  sx={[open ? { opacity: 1 } : { opacity: 0 }]}
                />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, mt: 8, p: 3 }}>
        {children}
      </Box>
    </Box>
  )
}

export default Navigation
