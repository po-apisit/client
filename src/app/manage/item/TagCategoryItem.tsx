import { ICategoryItemResponse } from '@/interface/hero/ICategoryItemResponse';
import { categoryItemSelector } from '@/store/slice/categoryitem.slice';
import { Card, Skeleton, Stack, Typography } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux'
import AddTagCategory from './component/AddTagCategory';
import { blue } from '@mui/material/colors';
import ButtonAddHero from '../game/component/ButtonAddHero';
import EditTagCategory from './component/EditTagCategory';

type Props = {
  setSelectTag: (state: string) => void;
  selectTag: string;
}

export default function TagCategoryItem({setSelectTag, selectTag}: Props) {
  const _categoryItemSelector = useSelector(categoryItemSelector);
  return (
    <Stack spacing={2} direction={"row"} justifyContent={"flex-start"}  alignItems={"center"} >
      {
        _categoryItemSelector.is_loading
        ? <Skeleton variant="rounded" width={200} height={50} />
        : <React.Fragment>
        <Stack 
        onClick={() => setSelectTag("all") }
        sx={{ px:3, py:1, bgcolor: selectTag === "all" ? blue[300] : "background.paper", borderRadius:1, cursor:"pointer" }} >
        <Typography variant="button">all</Typography>
        </Stack>
        {
          _categoryItemSelector.category.map((cat:ICategoryItemResponse) =>
          <Stack 
          onClick={() => {
            if(cat._id){
              setSelectTag(cat._id)
            }
          }}
          sx={{ px:3, py:1, bgcolor: selectTag === cat._id ? blue[300] : "background.paper", 
            borderRadius:1, cursor:"pointer", position: 'relative', display: 'inline-block' }} 
          key={cat._id} >
            <EditTagCategory category={cat} />
            <Typography variant="button">{cat.name}</Typography></Stack>)
        }
        <ButtonAddHero />
      </React.Fragment>
      }
      <AddTagCategory />
    </Stack>
  )
}