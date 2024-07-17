'use client'
import { IHero } from '@/interface/IHero';
import { ISkillHero } from '@/interface/ISkillHero';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Grid, Card, Divider, CardContent, Box, BottomNavigation, BottomNavigationAction, CardMedia, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '@/store';
import { UpdateHero } from '@/store/slice/hero.slice';
import ButtonEditGameSkill from './ButtonEditGameSkill';
import ButtonEditGameHeader from './ButtonEditGameHeader';
import AssistantIcon from '@mui/icons-material/Assistant';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ButtonEditGameMedai from './ButtonEditGameMedai';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

type Props = {
  hero: IHero;
};

export default function ButtonEditGame({ hero }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<IHero>(hero);
  const dispatch = useAppDispatch();
  const [screen, setScreen] = React.useState(0);

  const handleSave = () => {
    dispatch(UpdateHero(data))
  }



  useEffect(() => {
    if (hero) {
      setData(hero);
    }
  }, [hero]);

  return (
    <React.Fragment>
      <Button variant="outlined" color="warning" onClick={() => setOpen(!open)}>
        แก้ไข
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent dividers sx={{bgcolor:"background.default", minHeight: 500}} >
          <Card >
     
            <ButtonEditGameMedai hero={hero} />
            <Divider />
            <ButtonEditGameHeader hero={hero} />
            <Divider />
            <Box sx={{ width: 500 }}>
            <BottomNavigation
              showLabels
              value={screen}
              onChange={(event, newValue) => {
                setScreen(newValue);
              }}
            >
              <BottomNavigationAction value={0} label="Skill" icon={<AssistantIcon />} />
              <BottomNavigationAction value={1} label="Item" icon={<AutoFixHighIcon />} />
              <BottomNavigationAction value={2} label="Spell" icon={<AddToDriveIcon />} />
              <BottomNavigationAction value={3} label="Description" icon={<AssignmentIcon />} />
              <BottomNavigationAction value={4} label="Compare" icon={<AppRegistrationIcon />} />
              <BottomNavigationAction value={5} label="ลำดับ" icon={<EmojiEventsIcon />} />
            </BottomNavigation>
          </Box>
            <CardContent sx={{ bgcolor:"background.default", px:0 }} >

              {
                screen === 0 && (
                <Stack spacing={1}>
                    {data.skills.map((_skill: ISkillHero, index: number) => 
                     <ButtonEditGameSkill skill={_skill} key={_skill._index} />
                    )}
              </Stack>
                )
              }
              
          </CardContent>
          </Card>
            


        </DialogContent>

        <DialogActions>
          <Button variant="outlined" color="success" onClick={handleSave}>
            บันทึก
          </Button>
          <Button variant="outlined" color="error">
            ลบ
          </Button>
        </DialogActions>

      </Dialog>
    </React.Fragment>
  );
}
