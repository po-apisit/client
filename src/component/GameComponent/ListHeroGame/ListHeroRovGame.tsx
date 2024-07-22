'use client'
import { ICategoryResponse } from '@/interface/hero/ICategoryResponse';
import { IHeroResponse } from '@/interface/hero/IHeroResponse';
import { useAppDispatch } from '@/store';
import { categorySelector, FindallCategory } from '@/store/slice/category.slice';
import { findallHero, heroSelector, onSelectId } from '@/store/slice/hero.slice';
import { Autocomplete, Box, List, ListItemButton, ListItemText, Select, Skeleton, Stack, TextField, Typography } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

type Props = {}

export default function ListHeroRovGame({}: Props) {
  const dispatch = useAppDispatch()
  const _categorySelector = useSelector(categorySelector);
  const _heroSelector = useSelector(heroSelector);
  const [selectCategoryId, setSelectCategoryId] = useState<ICategoryResponse | null>(null);
  const pathname = usePathname();
  const router = useRouter();


  useEffect(() => {
    dispatch(FindallCategory());
    dispatch(findallHero());
  },[])

  return (
    <Stack sx={{ bgcolor:"background.paper", borderRadius:2, p:1, minHeight:200 }} spacing={1} >
      {
        _categorySelector.is_loading 
        ? <Skeleton variant="rounded" sx={{ width:"100%" }} />
        : _categorySelector.is_error 
        ? <Typography variant="caption" >{_categorySelector.message_error}</Typography>
        : <Autocomplete
          disablePortal
          id="combo-box-demo"
          onChange={(event: React.SyntheticEvent, value: ICategoryResponse | null) => {
            setSelectCategoryId(value);
          }}
          options={_categorySelector.categorys}
          sx={{ width: 230 }}
          getOptionLabel={(option) => option.name}
          renderOption={(props, option) => {
            const { key, ...optionProps } = props;
            return (
              <Box
              key={key}
              component="li"
              sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
              {...optionProps}
            >
                <Typography variant='caption' >
                  {option.name}
                  </Typography>
              </Box>
              
            )
          }}
          renderInput={(params) => 
          <TextField {...params} sx={{ fontSize:15 }} label={<Typography variant="caption">ประเภท</Typography>} variant="standard" />}
         />
      }
        
        {
          _heroSelector.is_loading
          ? <Skeleton variant="rounded" sx={{ width:"100%" }} />
          : _heroSelector.is_error
          ? <Typography>{_heroSelector.message_error}</Typography>
          : (
            <React.Fragment>
              <List>
              {
                _heroSelector.heros.filter((_hero:IHeroResponse) => {
                  if(_hero.public === "public"){
                    if(selectCategoryId === null){
                      return _hero;
                    } else if( selectCategoryId._id === _hero.categoryId ){
                      return _hero;
                    }
                  }

                } ).map(( _hero:IHeroResponse) => (
                  
                  <ListItemButton 
                  
                  key={_hero._id} 
                  onClick={() => {
                    router.push("/game/"+_hero.name)
                  }} 
                  selected={ pathname === "/game/" + _hero.name } >
                    <ListItemText secondary={_hero.name} />
                  </ListItemButton>
                
                ))
              }
              </List>
            </React.Fragment>
    
          )
        }
    </Stack>
  )
}