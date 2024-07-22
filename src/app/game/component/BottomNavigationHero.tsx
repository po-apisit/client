import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import React from 'react'
import AddReactionIcon from '@mui/icons-material/AddReaction';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import AnalyticsIcon from '@mui/icons-material/Analytics';

type Props = {
    screen: number;
    setScreen: (state: number) => void;
}

export default function BottomNavigationHero({screen, setScreen}: Props) {
  return (
    <BottomNavigation
  showLabels
  value={screen}
  onChange={(event, newValue) => {
    setScreen(newValue);
  }}
>
  <BottomNavigationAction value={0} label="ฮีโร่" icon={<AddReactionIcon />} />
  <BottomNavigationAction value={1} label="ไอเทม" icon={<AutoFixHighIcon />} />
  <BottomNavigationAction value={2} label="กรอบแรงค์" icon={<AspectRatioIcon />} />
  <BottomNavigationAction value={3} label="ข่าวสารอัฟเดท" icon={<AnalyticsIcon />} />
</BottomNavigation>
  )
}