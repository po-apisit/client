import { Divider, Stack } from '@mui/material'
import React from 'react'
import MenuProfile from './component/AsidebarLayout/MenuProfile'
import MenuEntertainment from './component/AsidebarLayout/MenuEntertainment'

type Props = {}

export default function AsidebarLayout({}: Props) {

  return (
    <Stack px={2} >
        <MenuProfile />
        <Divider />
        <MenuEntertainment />
        <Divider />
    </Stack>
  )
}