import { BottomNavigation, BottomNavigationAction, Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, Divider, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IHeroRequest } from '@/interface/hero/IHeroRequest';
import RootHeroComponent from '@/component/CardHeroComponent/RootHeroComponent';

type Props = {
    categoryId: string;
}

export default function ButtonAddHero({categoryId}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [screen, setScreen] = React.useState(0);
  const [newHero, setNewHero] = useState<IHeroRequest>({
    name: "hero",
    aliases: "aliases",
    description: "description",
    image: "image",
    image_cover: "image_conver",
    story: "story",
    categoryId: categoryId,
    skills:[],
    itemsId: [],
    public: "private"
  })

  useEffect(() => {
    if(categoryId){
      setNewHero({...newHero, categoryId: categoryId})
    }
  },[categoryId])
  
  
  return (
    <React.Fragment>
      <Button variant="outlined" color="success" startIcon={<AddCircleIcon />} onClick={() => setOpen(!open)} >
          เพิ่ม
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogContent dividers sx={{bgcolor:"background.default", minHeight: 500}} >
          <RootHeroComponent design="private" hero={newHero} is_private="add" />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}