'use client'
import { List, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import React, { useEffect } from 'react'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import PeopleIcon from '@mui/icons-material/People';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { usePathname, useRouter } from 'next/navigation';

type Props = {}

export default function MenuEntertainment({}: Props) {
    const router = useRouter()
    const partname = usePathname()

    return (
      <List
      dense
      sx={{ width: '100%', maxWidth: 200, bgcolor: 'background.default' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader" sx={{ bgcolor: 'background.default' }}>
          บันเทิง
        </ListSubheader>
      }
    >

      <ListItemButton onClick={() => router.push("/community") } selected={partname === "/community"} >
          <ListItemIcon>
            <PeopleIcon color="primary" />
          </ListItemIcon>
          <ListItemText secondary="ชุมชน" />
      </ListItemButton>

      <ListItemButton onClick={() => router.push("/game")  } selected={partname === "/game"}>
          <ListItemIcon>
            <SportsEsportsIcon color="primary"  />
          </ListItemIcon>
          <ListItemText secondary="เกม" />
      </ListItemButton>

      <ListItemButton onClick={() => router.push("/shotclip")  } selected={partname === "shotclip"}>
          <ListItemIcon>
            <OndemandVideoIcon color="primary"  />
          </ListItemIcon>
          <ListItemText secondary="วีดีโอสั้น" />
      </ListItemButton>



       
    </List>
    )
}