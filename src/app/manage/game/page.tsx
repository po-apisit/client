'use client'
import { ICategoryResponse } from '@/interface/hero/ICategoryResponse'
import { IHeroResponse } from '@/interface/hero/IHeroResponse'
import { useAppDispatch } from '@/store'
import { categorySelector, FindallCategory } from '@/store/slice/category.slice'
import { findallHero, heroSelector } from '@/store/slice/hero.slice'
import { Avatar, Button, Chip, Divider, Skeleton, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ButtonAddHero from './component/ButtonAddHero'
import ButtonAddCategory from './component/ButtonAddCategory'
import ButtonEditCategory from './component/ButtonAddHero/ButtonEditCategory'
import ButtonEditHero from './component/ButtonEditHero'


type Props = {}

export default function page({}: Props) {
  const _heroSelector = useSelector(heroSelector);
  const _categorySelector = useSelector(categorySelector);
  const dispatch = useAppDispatch()
  const [selectCat, setSelectCat] = useState<string>("all");

  useEffect(() => {
    if(_categorySelector.categorys.length === 0){
      dispatch(FindallCategory());
    }
    if(_heroSelector.heros.length === 0){
      dispatch(findallHero())
    }
  },[]);

  return (
    <Stack direction={"column"} spacing={2} >
      <Stack spacing={2} direction={"row"} justifyContent={"space-between"} alignContent={"center"} >
        {
          _categorySelector.is_loading
          ? <Skeleton variant="rounded" width={100} height={40} />
          : <React.Fragment>
            <Stack 
            onClick={() => setSelectCat("all") }
            sx={{ px:3, py:1, bgcolor: selectCat === "all" ? blue[300] : "background.paper", borderRadius:1, cursor:"pointer" }} >
            <Typography variant="button">all</Typography>
            </Stack>
            {
              _categorySelector.categorys.map((cat:ICategoryResponse) =>
              <Stack 
              onClick={() => {
                if(cat._id){
                  setSelectCat(cat._id)
                }
              }}
              sx={{ px:3, py:1, bgcolor: selectCat === cat._id ? blue[300] : "background.paper", 
                borderRadius:1, cursor:"pointer", position: 'relative', display: 'inline-block' }} 
              key={cat._id} >
                <ButtonEditCategory category={cat} />
                <Typography variant="button">{cat.name}</Typography></Stack>)
            }
            <ButtonAddCategory />
          </React.Fragment>
        }
      </Stack>
      <Divider />
      <Stack>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ลำดับ</TableCell>
              <TableCell>รูป</TableCell>
              <TableCell>ชื่อ</TableCell>
              <TableCell>สถานะ</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              _heroSelector.is_loading
              ? <Typography>Loading...</Typography>
              : (
                _heroSelector.heros.filter((hero:IHeroResponse) => {
                  if(selectCat === "all"){
                    return hero;
                  }
                  if(selectCat === hero.categoryId){
                    return hero;
                  }
                }).map((hero:IHeroResponse, index:number) => (
                  <TableRow key={hero.name} >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell> <Avatar alt='a' src={ 
                    process.env.NODE_ENV === "development" 
              ? "http://localhost:399"+ hero.image
              : "http://localhost:399"+ hero.image} /> </TableCell>
                  <TableCell>{hero.name}</TableCell>
                  <TableCell>{<Chip size="small" color={hero.public === "private" ? "warning" : "success"} label={hero.public} />}</TableCell>
                  <TableCell><ButtonEditHero hero={hero}  /></TableCell>
                </TableRow>
                ))
                
              )
            }
            {
              selectCat !== "all" && (
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell><ButtonAddHero categoryId={selectCat}  /></TableCell>
                </TableRow>
              )
            }
                
          </TableBody>
        </Table>
      </Stack>
    </Stack>
  )
}