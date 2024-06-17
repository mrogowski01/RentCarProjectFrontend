import { Grid, Box } from '@mui/material'
import { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

export type sidebarItem = {
  to: string
  label: ReactNode
  icon?: ReactNode
}

export type sidebarItems = {
  elements: sidebarItem[]
}

export const Sidebar = ({ elements }: sidebarItems) => {
  return (
    <Grid container direction="column">
      {elements?.map(({ to, label, icon }) => (
        <NavLink key={to} to={to}>
          {({ isActive }) => (
            <Box sx={{ p: '8px' }}>
              <Box
                display="flex"
                alignItems="center"
                key={to}
                bgcolor={isActive ? '#2b2929' : '#697f66'}
                color={isActive ? 'white' : '#1a1b2d'}
                px="16px"
                py="12px"
                sx={{
                  borderRadius: '6px',
                  fontWeight: '500',
                  '&:hover': {
                    background: 'secondary.light'
                  }
                }}
              >
                <Box pr="10px" display="flex" alignItems="center">
                  {icon}
                </Box>
                <Box sx={{ textAlign: 'center' }}>{label}</Box>
              </Box>
            </Box>
          )}
        </NavLink>
      ))}
    </Grid>
  )
}
