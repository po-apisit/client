import { IHeroResponse } from '@/interface/hero/IHeroResponse';
import { Avatar, Box, CardHeader, IconButton, TextField, Tooltip } from '@mui/material';
import React, { useState } from 'react'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import PublicIcon from '@mui/icons-material/Public';
import SecurityIcon from '@mui/icons-material/Security';

type Props = {
  design: "private" | "public";
  newHero: IHeroResponse;
  setNewHero: (state: IHeroResponse) => void;
}

export default function HeaderRootHeroComponent({ design, newHero, setNewHero, }: Props) {

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setNewHero({...newHero, fileImage: file, image: URL.createObjectURL(file)} );
    }
  };


  return (
    <CardHeader
      avatar={
        <Box sx={{ position: 'relative', display: 'inline-block' }} >
          {
            design === "private" && (
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
            )
          }

          <Avatar
            sx={{ width: 72, height: 72 }}
            src={ 
               newHero.fileImage
              ? newHero.image
              : process.env.NODE_ENV === "development" 
              ? "http://localhost:399"+ newHero.image
              : "http://localhost:399"+ newHero.image }
          />
        </Box>
      }
      title={
        design === "private" ?
          <TextField
            value={newHero.name}
            label="name"
            onChange={e => setNewHero({ ...newHero, name: e.target.value })}
          />
          : newHero.name}
      subheader={
        design === "private" ? <TextField
          sx={{ mt: 1 }}
          value={newHero.aliases}
          label="aliases"
          fullWidth
          onChange={e => setNewHero({ ...newHero, aliases: e.target.value })}
        />
          : newHero.aliases
      }
      action={
        <React.Fragment>
        {
          design === "private" && (
            <Tooltip title={newHero.public} onClick={() => setNewHero({ ...newHero, public : newHero.public === "private" ? "public" : "private" }) } >
            <IconButton  size="small" >
              {
                newHero.public === "public" 
                ? <PublicIcon color='primary' />
                :  <SecurityIcon color="warning" />
              }
              
            </IconButton>
            </Tooltip>

          )
        }
        </React.Fragment>

      }
    />
  )
}