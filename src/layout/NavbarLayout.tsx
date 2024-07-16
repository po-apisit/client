'use client'
import { AppBar, Stack, Toolbar, Typography } from '@mui/material'
import React from 'react'

type Props = {}

export default function NavbarLayout({}: Props) {
  return (
    <Toolbar sx={{ bgcolor:"background.paper", width:"100%" }}>
      <Stack direction={"row"} >
      <Typography variant='button' >rov-pro.com</Typography>
      </Stack>

    </Toolbar>
  )
}