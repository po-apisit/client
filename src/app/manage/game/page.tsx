'use client'
import { ICategoryResponse } from '@/interface/ICategoryResponse'
import { IHeroResponse } from '@/interface/IHeroResponse'
import { useAppDispatch } from '@/store'
import { categorySelector, FindallCategory } from '@/store/slice/category.slice'
import { findallHero, heroSelector } from '@/store/slice/hero.slice'
import { Button, Divider, Skeleton, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ButtonEditGame from './component/ButtonEditGame'
import ButtonAddCategory from './component/ButtonAddCategory'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ButtonEditCategory from './component/ButtonEditCategory'

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
            <Typography variant="button">all</Typography></Stack>
            {
              _categorySelector.categorys.map((cat:ICategoryResponse) =>
              <Stack 
              onClick={() => setSelectCat(cat._id) }
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
              <TableCell>วันที่สร้าง</TableCell>
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
                  <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{hero._id}</TableCell>
                  <TableCell>{hero.name}</TableCell>
                  <TableCell>{hero.createdAt.toString()}</TableCell>
                  <TableCell><ButtonEditGame hero={hero} /></TableCell>
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
                  <TableCell></TableCell>
                  <TableCell><Button startIcon={<AddCircleIcon />} variant="outlined" color="success" >เพิ่ม</Button></TableCell>
                </TableRow>
              )
            }
                
          </TableBody>
        </Table>
      </Stack>
    </Stack>
  )
}