import { Grid, Divider, alpha } from '@mui/material'
import { ReactNode } from 'react'

export interface LayoutProps {
  sidebar?: ReactNode
  children?: JSX.Element | JSX.Element[]
}

export const Layout: React.FC<LayoutProps> = ({ children, sidebar }) => (
  <Grid container sx={{ flexGrow: 1, overflowY: 'hidden' }}>
    {sidebar && (
      <>
        <Grid
          item
          sx={{ pt: '1vh', minWidth: 240, height: '100%', overflowY: 'auto' }}
        >
          {sidebar}
        </Grid>
        <Divider orientation="vertical" sx={{ boxShadow: 3 }} />
      </>
    )}
    <Grid
      xs
      item
      sx={{
        height: '95%',
        overflowY: 'auto',
        backgroundColor: alpha('#1a1b2d', 0.05),
        opacity: '50',
        m: '2vh',
        borderRadius: '1vh'
      }}
      padding="2vh"
    >
      {children}
    </Grid>
  </Grid>
)
