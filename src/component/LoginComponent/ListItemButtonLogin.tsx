'use client'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import React, { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ButtonRegister from '../RegisterComponent/ButtonRegister';

type Props = {}

export default function ListItemButtonLogin({}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <React.Fragment>
        <ListItemButton onClick={() => setOpen(!open) } >
        <ListItemIcon>
            <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="ลงชื่อเข้าใช้งาน" />
    </ListItemButton>
    <Dialog open={open} onClose={() => setOpen(false) } maxWidth="sm" fullWidth >
      <DialogTitle>
        <Typography>ลงชื่อเข้าใช้งาน</Typography>
      </DialogTitle>
      <DialogContent dividers >
        
      </DialogContent>
      <DialogActions>
        <Button size="small" variant="outlined" >
          เข้าสู่ระบบ
        </Button>
        <ButtonRegister />
      </DialogActions>
    </Dialog>
    </React.Fragment>
  )
}