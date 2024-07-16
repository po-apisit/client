'use client'
import { ICategory } from '@/interface/ICategory';
import { IHero } from '@/interface/IHero';
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
  const [selectCategoryId, setSelectCategoryId] = useState<ICategory | null>(null);
  const pathname = usePathname();

  const goto = (_id:string) => {
    dispatch(onSelectId(_id));
  }

  useEffect(() => {
    dispatch(FindallCategory());
    dispatch(findallHero());
  },[])

  return (
    <Stack sx={{ bgcolor:"background.paper", borderRadius:2, p:2, minHeight:200 }} spacing={2} >
      {
        _categorySelector.is_loading 
        ? <Skeleton variant="rounded" sx={{ width:"100%" }} />
        : _categorySelector.is_error 
        ? <Typography variant="caption" >{_categorySelector.message_error}</Typography>
        : <Autocomplete
          disablePortal
          id="combo-box-demo"
          onChange={(event: React.SyntheticEvent, value: ICategory | null) => {
            setSelectCategoryId(value);
          }}
          options={_categorySelector.categorys}
          sx={{ width: 230 }}
          getOptionLabel={(option) => option.label}
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
                  {option.label}
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
              {
                _heroSelector.heros.filter((_hero:IHero) => {
                  if(selectCategoryId === null){
                    return _hero;
                  } else if( selectCategoryId._id === _hero.categoryId ){
                    return _hero;
                  }
                } ).map(( _hero:IHero) => (
                  <List key={_hero._id}>
                  <ListItemButton onClick={() => goto(_hero._id)} selected={ _heroSelector.selectId === _hero._id } >
                    <ListItemText secondary={_hero.name} />
                  </ListItemButton>
                </List>
                ))
              }
            </React.Fragment>
    
          )
        }
    </Stack>
  )
}