import { IHeroResponse } from '@/interface/IHeroResponse';
import { Avatar, Box, CardHeader, IconButton, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

type Props = {
    hero: IHeroResponse;
}

export default function ButtonEditGameHeader({ hero }: Props) {
    const [file, setFile] = useState<File | null>(null);
    const [data, setData] = useState<IHeroResponse>(hero);
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        setData(hero);
    }, [hero]);

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
        <CardHeader
            avatar={
                <Box sx={{ position: 'relative', display: 'inline-block' }} >
                    <Tooltip title="อัฟโหลดรูป">
                        <IconButton
                            color='primary'
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
                            <AddPhotoAlternateIcon />
                            <input type="file" hidden onChange={handleFileChange} />
                        </IconButton>
                    </Tooltip>
                    <Avatar 
                        sx={{ width: 72, height: 72 }} 
                        src={preview || "/mnt/data/image.png"} 
                    />
                </Box>
            }
            title={hero.name}
            subheader={hero.aliases}
        />
    );
}
