import { IHeroResponse } from '@/interface/hero/IHeroResponse';
import { Box, CardMedia, IconButton, Tooltip } from '@mui/material';
import React from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

type Props = {
  newHero: IHeroResponse;
  setNewHero: (state: IHeroResponse) => void;
  design: "private" | "public";
}

export default function CoverHeaderRootHeroComponent({ newHero, setNewHero, design }: Props) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setNewHero({ ...newHero, fileImageCover: file, image_cover: URL.createObjectURL(file) });
    }
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', height: 350, overflow: 'hidden' }}>
      {design === "private" && (
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
      )}
      <CardMedia 
        component="img"
        src={ 
          newHero.fileImageCover
          ? newHero.image_cover
          : process.env.NODE_ENV === "development" 
          ? "http://localhost:399" + newHero.image_cover
          : "http://localhost:399" + newHero.image_cover              
        }
        alt="image cover"
        sx={{ 
          width: "100%", 
          height: "100%", 
          objectFit: "cover"
        }} 
      />
    </Box>
  );
}
