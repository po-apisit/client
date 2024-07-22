import { Button, Dialog, DialogContent } from '@mui/material';
import React, { useEffect, useState } from 'react'
import RootHeroComponent from '@/component/CardHeroComponent/RootHeroComponent';
import { IHeroResponse } from '@/interface/hero/IHeroResponse';
import EditIcon from '@mui/icons-material/Edit';

type Props = {
    hero: IHeroResponse
}

export default function ButtonEditHero({hero}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [screen, setScreen] = React.useState(0);
  const [newHero, setNewHero] = useState<IHeroResponse>(hero)

  useEffect(() => {
    if(hero){
      setNewHero(hero)
    }
  },[hero])
  
  
  return (
    <React.Fragment>
      <Button variant="outlined" color="success" startIcon={<EditIcon />} onClick={() => setOpen(!open)} >
          แก้ไข
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogContent dividers sx={{bgcolor:"background.default", minHeight: 500}} >
          <RootHeroComponent design="private" hero={newHero} is_private="update" />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}