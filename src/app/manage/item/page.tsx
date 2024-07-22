'use client'
import { Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
import TagCategoryItem from './TagCategoryItem';
import { useAppDispatch } from '@/store';
import { FindallCategoryItem } from '@/store/slice/categoryitem.slice';


type Props = {}

export default function page({}: Props) {
  const dispatch = useAppDispatch();
  const [selectTag, setSelectTag] = useState<string>("all");

  useEffect(() => {
    dispatch(FindallCategoryItem())
  },[])

  return (
    <Stack spacing={1} >
      <TagCategoryItem setSelectTag={setSelectTag} selectTag={selectTag} />
    </Stack>
  )
}