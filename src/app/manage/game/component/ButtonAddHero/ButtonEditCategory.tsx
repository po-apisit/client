import { ICategoryResponse } from '@/interface/hero/ICategoryResponse'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import React, { useEffect, useState } from 'react'
import { useAppDispatch } from '@/store';
import { UpdateCategory } from '@/store/slice/category.slice';

type Props = {
    category: ICategoryResponse;
}

export default function ButtonEditCategory({category}: Props) {
  const [newCategory, setNewCategory] = useState<ICategoryResponse>(category);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);

  const handleAddCategory = () => {
    if(newCategory.name.trim() === ""){
        alert("name ห้ามเป็นค่าว่าง");
        return;
    }
    dispatch(UpdateCategory(newCategory));
    setOpen(false)
  }

  useEffect(() => {
    if(category){
        setNewCategory(category);
    }
  },[category])

  return (
    <Box sx={{ position: 'relative', display: 'inline-block' }} >
        <Tooltip title="อัฟโหลดรูป">
          <IconButton
            color='primary'
            component="label"
            onClick={() => setOpen(!open)}
            size="small"
            sx={{
              position: 'absolute',
              top: -40,
              left: -40,
              zIndex: 1,
              backgroundColor: 'white',
              borderRadius: '50%'
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Dialog
        open={open}
        onClose={() => setOpen(false) }
        maxWidth="xs"
        >
            <DialogTitle>
                <Typography>แก้ไข Category</Typography>
            </DialogTitle>
            <DialogContent dividers>
                <Stack spacing={2} p={1} >
                    <TextField 
                        label="name"
                        value={newCategory.name}
                        fullWidth
                        focused
                        onChange={e => setNewCategory({ ...newCategory, name: e.target.value }) }
                    />
                    <TextField 
                        label="description"
                        value={newCategory.description}
                        fullWidth
                        focused
                        multiline
                        minRows={4}
                        onChange={e => setNewCategory({ ...newCategory, description: e.target.value }) }
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleAddCategory} startIcon={<EditIcon />} color="success" variant="outlined" >
                    อัฟเดท
                </Button>
            </DialogActions>
        </Dialog>
    </Box>
  )
}