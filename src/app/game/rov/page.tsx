'use client'
import ListHeroRovGame from '@/component/GameComponent/ListHeroGame/ListHeroRovGame'
import { Grid } from '@mui/material'
import React, { useState } from 'react'
import BottomNavigationHero from '../component/BottomNavigationHero'


type Props = {
}

export default function page({ }: Props) {
  const [screen, setScreen] = useState<number>(0);
  return (
    <Grid container spacing={2}>
      <Grid item md={9} >
      </Grid>
      <Grid item md={3} >
        <ListHeroRovGame />
      </Grid>
    </Grid>
  )
}
