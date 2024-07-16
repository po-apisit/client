import { Button } from '@mui/material';
import React, { useState } from 'react'

type Props = {}

export default function ButtonRegister({}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <React.Fragment>
        <Button variant="outlined" color="success" >
            ลงทะเบียน
        </Button>
    </React.Fragment>
  )
}