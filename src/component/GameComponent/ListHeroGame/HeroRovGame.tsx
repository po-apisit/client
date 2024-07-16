'use client'
import { IHero } from '@/interface/IHero';
import { heroSelector } from '@/store/slice/hero.slice';
import { Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

type Props = {}

export default function HeroRovGame({}: Props) {
  const _heroSelecotor = useSelector(heroSelector);
  const [data, setData] = useState<IHero | null>(null);

  useEffect(() => {
    if(_heroSelecotor.selectId){
      const newHero = _heroSelecotor.heros.filter((_hero:IHero) => _hero._id === _heroSelecotor.selectId );
      console.log(newHero);
      
      if(newHero.length > 0) {
        setData(newHero[0])
      } else {
        setData(null);
      }
    }else {
      setData(null);
    }
  },[_heroSelecotor.selectId])

  return (
    <Stack sx={{ bgcolor:"background.paper", borderRadius:2, p:2, minHeight:300, width:"100%" }} spacing={2}>
      {
        data == null
        ? <Typography>กรุณาเลือก Hero</Typography>
        : (
          <React.Fragment>
            {
              data && (
                <React.Fragment>
                   <Typography>{data.name}</Typography>
                </React.Fragment>
              )
            }
                 
          </React.Fragment>
        )
      }
    </Stack>
  )
}