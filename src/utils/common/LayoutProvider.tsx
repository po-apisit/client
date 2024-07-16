import AsidebarLayout from '@/layout/AsidebarLayout'
import NavbarLayout from '@/layout/NavbarLayout'
import { Grid } from '@mui/material'
import React, { useEffect } from 'react'

type Props = {
    children: React.ReactNode
}

export default function LayoutProvider({children}: Props) {


  return (
    <Grid container spacing={2}>
        
        <Grid item md={12} lg={12}>
            <NavbarLayout />
        </Grid>

        <Grid item md={12} lg={2}  >
        <AsidebarLayout />
        </Grid>

        <Grid item md={12} lg={10} px={2} >
        {children}
        </Grid>
  

    </Grid>
  )
}