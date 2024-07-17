import { ISkillHero } from '@/interface/ISkillHero';
import { Box, CardMedia, IconButton, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { IHero } from '@/interface/IHero';

type Props = {
    hero:IHero
}

export default function ButtonEditGameMedai({hero}: Props) {
    const [data, setData] = useState<IHero>(hero)
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        setData(hero)
    }, [hero])

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
    <Box sx={{ position: 'relative', display: 'inline-block', justifyContent:"center", alignItems:"center" }}>
                            <Tooltip title="อัฟโหลดรูป">
                        <IconButton
                            color='primary'
                            component="label"
                            sx={{ 
                                position: 'absolute', 
                                top: 15, 
                                left: 15, 
                                zIndex: 1,
                                backgroundColor: 'white',
                                borderRadius: '50%'
                            }}
                        >
                            <AddPhotoAlternateIcon />
                            <input type="file" hidden onChange={handleFileChange} />
                        </IconButton>
                    </Tooltip>
        <CardMedia 
            component="img"
            src={preview || "/mnt/data/image.png"} 
            alt="image cover"
            sx={{ width:"100%", height: 330, objectFit: "fill", p:1, borderRadius:4}} />
    </Box>
  )
}