import HeroRovGame from '@/component/GameComponent/ListHeroGame/HeroRovGame'
import ListHeroRovGame from '@/component/GameComponent/ListHeroGame/ListHeroRovGame'
import { Grid } from '@mui/material'
import React from 'react'

type Props = {}

export default function page({ }: Props) {
  return (
    <Grid container spacing={2}>
      <Grid item md={9} >
        <HeroRovGame />
      </Grid>
      <Grid item md={3} >
        <ListHeroRovGame />
      </Grid>
    </Grid>
  )
}