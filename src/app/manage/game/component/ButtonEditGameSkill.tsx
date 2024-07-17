import { ISkillHero } from '@/interface/ISkillHero'
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Divider, IconButton, TextField, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
    skill: ISkillHero
}

export default function ButtonEditGameSkill({ skill }: Props) {
    const [edit, setEdit] = useState<boolean>(false);
    const [data, setData] = useState<ISkillHero>(skill)
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        setData(skill)
    }, [skill])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleUpload = () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        // Replace with your upload URL
        fetch('/upload', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                // Handle successful upload
                console.log('Upload successful:', data);
            })
            .catch(error => {
                // Handle errors
                console.error('Upload error:', error);
            });
    };

    return (
        <Card variant="outlined" sx={{ borderRadius:0 }} >
            <CardHeader
                avatar={
                    <Box sx={{ position: 'relative', display: 'inline-block' }}>
                        <Tooltip title="อัฟโหลดรูป">
                            {
                                file
                                    ? (
                                        <IconButton
                                            onClick={() => {
                                                setFile(null);
                                                setPreview(null);
                                            } }
                                            color='primary'
                                            size='small'
                                            component="label"
                                            sx={{
                                                position: 'absolute',
                                                top: -10,
                                                left: -10,
                                                zIndex: 1,
                                                backgroundColor: 'white',
                                                borderRadius: '50%'
                                            }}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    ) : (
                                        <IconButton
                                            color='primary'
                                            component="label"
                                            size='small'
                                            sx={{
                                                position: 'absolute',
                                                top: -10,
                                                left: -10,
                                                zIndex: 1,
                                                backgroundColor: 'white',
                                                borderRadius: '50%'
                                            }}
                                        >
                                            <AddPhotoAlternateIcon />
                                            <input type="file" hidden onChange={handleFileChange} />
                                        </IconButton>
                                    )
                            }

                        </Tooltip>
                        <Avatar
                            sx={{ width: 54, height: 54 }}
                            src={preview || "/mnt/data/image.png"}
                        />
                    </Box>}
                title={
                    edit
                        ? <TextField
                            value={data.name_skill}
                            onChange={e => setData({ ...data, name_skill: e.target.value })} />
                        : data.name_skill
                }
                subheader={"สกิลที่ : " + data._index}

            />
            <Divider />
            <CardContent sx={{ minHeight: 100 }}>
                {
                    edit
                        ? <TextField
                            value={data.description_skill}
                            multiline
                            fullWidth
                            minRows={5}
                            onChange={(e) => {
                                setData({ ...data, description_skill: e.target.value });
                            }} />
                        : <Typography variant="caption" >{data.description_skill}</Typography>
                }
            </CardContent>
            <Divider />
            <CardActions>
                <Button variant="outlined" color='primary' onClick={() => setEdit(!edit)} >
                    {edit ? "บันทึก" : "แก้ไข"}
                </Button>
            </CardActions>
        </Card>
    )
}
