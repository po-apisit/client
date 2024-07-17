import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { ICategoryRequest } from '@/interface/ICategoryRequest';
import { useAppDispatch } from '@/store';
import { CreateCategory } from '@/store/slice/category.slice';

type Props = {}

export default function ButtonAddCategory({}: Props) {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<ICategoryRequest>({
    name: "",
    description: ""
  })

  const handleAddCategory = () => {
    if(data.name.trim() === ""){
        alert("name ห้ามเป็นค่าว่าง");
        return;
    }
    dispatch(CreateCategory(data));
    setOpen(false)
  }

  return (
    <React.Fragment>
        <Tooltip title="เพิ่ม category">
            <IconButton color="success" onClick={() => setOpen(!open) } >
                <AddCircleIcon />
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
                <Button onClick={handleAddCategory} startIcon={<AddCircleIcon />} color="success" variant="outlined" >
                    เพิ่ม
                </Button>
            </DialogActions>
        </Dialog>
    </React.Fragment>
  )
}