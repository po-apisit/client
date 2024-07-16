'use client'
import { Grid, List, ListItemButton, ListItemText, ListSubheader } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

type Props = {
  children: React.ReactNode
}

export default function layout({children}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  return (

    <Grid container spacing={2} sx={{mt:1}} >
      <Grid item md={2} sx={{ minHeight:300, bgcolor:"background.paper", borderRadius:1, }} >
          <List
          dense
          sx={{ width: '100%', maxWidth: 150, }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader" >
              Administrator
            </ListSubheader>
          }
          >
            <ListItemButton onClick={() => router.push("/manage/game")} selected={pathname.includes("game")} >
              <ListItemText secondary="game" />
            </ListItemButton>
            <ListItemButton onClick={() => router.push("/manage/report")} selected={pathname.includes("report")}>
              <ListItemText secondary="report" />
            </ListItemButton>
          </List>
      </Grid>
      <Grid item md={10} >
      {children}
      </Grid>
    </Grid>

  )
}