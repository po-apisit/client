'use client'
import HeroRovGame from '@/component/GameComponent/ListHeroGame/HeroRovGame'
import ListHeroRovGame from '@/component/GameComponent/ListHeroGame/ListHeroRovGame'
import { Grid } from '@mui/material'
import React, { useState } from 'react'
import BottomNavigationHero from '../component/BottomNavigationHero'

type Props = {
  params:{
    namehero:string
  }
}

export default function page({ params }: Props) {
  const [screen, setScreen] = useState<number>(0);
  return (
    <Grid container spacing={2}>
      <Grid item md={12}>
        <BottomNavigationHero screen={screen} setScreen={setScreen} />
      </Grid>
      <Grid item md={9} >
        <HeroRovGame />
      </Grid>
      <Grid item md={3} >
        <ListHeroRovGame />
      </Grid>
    </Grid>
  )
}