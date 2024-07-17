import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useAppDispatch } from '@/store';
import { DeleteCategory, UpdateCategory } from '@/store/slice/category.slice';
import EditIcon from '@mui/icons-material/Edit';
import { ICategoryResponse } from '@/interface/ICategoryResponse';

type Props = {
    category:ICategoryResponse
}

export default function ButtonEditCategory({category}: Props) {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<ICategoryResponse>({...category})

  const handleEditCategory = () => {
    if(data.name.trim() === ""){
        alert("name ห้ามเป็นค่าว่าง");
        return;
    }
    dispatch(UpdateCategory(data));
    setOpen(false)
  }

  const handleRemoveCategory = () => {
    dispatch(DeleteCategory(data));
    setOpen(false)
  }

  useEffect(() => {
    if(category){
        setData({...category})
    }
  },[category])

  return (
    <React.Fragment>
        <Tooltip title="เพิ่ม category">
            <IconButton 
            color='primary'
            size='small'
                            component="label"
                            sx={{ 
                                position: 'absolute', 
                                top: -13, 
                                left: -13, 
                                zIndex: 1,
                                backgroundColor: 'white',
                                borderRadius: '50%'
                            }}
            onClick={() => setOpen(!open) } >
                <EditIcon />
            </IconButton>
        </Tooltip>
        <Dialog
        open={open}
        onClose={() => setOpen(false) }
        maxWidth="xs"
        >
            <DialogTitle>
                <Typography>เพิ่ม Category</Typography>
            </DialogTitle>
            <DialogContent dividers>
                <Stack spacing={2} p={1} >
                    <TextField 
                        label="name"
                        value={data.name}
                        fullWidth
                        focused
                        onChange={e => setData({ ...data, name: e.target.value }) }
                    />
                    <TextField 
                        label="description"
                        value={data.description}
                        fullWidth
                        focused
                        multiline
                        minRows={4}
                        onChange={e => setData({ ...data, description: e.target.value }) }
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleEditCategory} startIcon={<EditIcon />} color="success" variant="outlined" >
                    แก้ไข
                </Button>
                <Button onClick={handleRemoveCategory} startIcon={<EditIcon />} color="error" variant="outlined" >
                    ลบ
                </Button>
            </DialogActions>
        </Dialog>
    </React.Fragment>
  )
}