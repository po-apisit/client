'use client'
import { userSelector } from '@/store/slice/user.slice'
import { List, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListItemButtonLogin from '@/component/LoginComponent/ListItemButtonLogin'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { usePathname, useRouter } from 'next/navigation'

type Props = {}

export default function MenuProfile({}: Props) {
  const _userSelector = useSelector(userSelector);
  const router = useRouter();
  const pathname = usePathname();


  return (
    <List
    dense
    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.default' }}
    component="nav"
    aria-labelledby="nested-list-subheader"
    subheader={
      <ListSubheader component="div" id="nested-list-subheader" sx={{ bgcolor: 'background.default' }}>
        บัญชีของฉัน
      </ListSubheader>
    }
  >
    {
        _userSelector.is_login
        ? (
          <React.Fragment>

          </React.Fragment>
        )
        : <ListItemButtonLogin />
    }

    <ListItemButton onClick={() => router.push("/manage/game")} selected={pathname.includes("manage")} >
      <ListItemIcon>
        <AdminPanelSettingsIcon />
      </ListItemIcon>
      <ListItemText secondary="Administrator" />
    </ListItemButton>

  </List>
  )
}