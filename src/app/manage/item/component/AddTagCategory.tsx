import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ICategoryItemRequest } from '@/interface/hero/ICategoryItemRequest';
import { useAppDispatch } from '@/store';
import { AddCategoryItem } from '@/store/slice/categoryitem.slice';

type Props = {}

export default function AddTagCategory({}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [data, setData] = useState<ICategoryItemRequest>({
    name: "name",
    description: "description",
  })

  const handleSave = () => {
    dispatch(AddCategoryItem(data));
  }

  return (
    <React.Fragment>
        <IconButton color="success" size='small' onClick={() => setOpen(!open)} >
            <AddCircleOutlineIcon />
        </IconButton>

        <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
        >
            <DialogTitle>
                <Typography>เพิ่ม ประเภท Item</Typography>
            </DialogTitle>
            <DialogContent dividers >
                <Stack spacing={2} >
                    <TextField 
                        fullWidth
                        value={data.name}
                        label="name"
                        
                        onChange={e => setData({...data, name : e.target.value})}
                    />
                    <TextField 
                        fullWidth
                        value={data.description}
                        multiline
                        minRows={3}
                        label="description"
                        onChange={e => setData({...data, description : e.target.value})}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSave} variant="outlined" startIcon={<AddCircleOutlineIcon />} >
                    เพิ่ม
                </Button>
            </DialogActions>
        </Dialog>
    </React.Fragment>
  )
}