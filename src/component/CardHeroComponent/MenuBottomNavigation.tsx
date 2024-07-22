import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import React from 'react'
import AssistantIcon from '@mui/icons-material/Assistant';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CoPresentIcon from '@mui/icons-material/CoPresent';

type Props = {
    screen: number;
    setScreen: (state: number) => void;
}

export default function MenuBottomNavigation({screen, setScreen}: Props) {
  return (
    <BottomNavigation
    showLabels
    value={screen}
    onChange={(event, newValue) => {
      setScreen(newValue);
    }}
  >
    <BottomNavigationAction value={0} label="Skill" icon={<AssistantIcon />} />
    {/* <BottomNavigationAction value={1} label="Assetserry" icon={<AutoFixHighIcon />} /> */}
    <BottomNavigationAction value={1} label="Description" icon={<AssignmentIcon />} />
    <BottomNavigationAction value={2} label="เปรียบเที่ยบ" icon={<AppRegistrationIcon />} />
    <BottomNavigationAction value={3} label="สกิน" icon={<CoPresentIcon />} />
    <BottomNavigationAction value={4} label="ลำดับ" icon={<EmojiEventsIcon />} />
  </BottomNavigation>
  )
}