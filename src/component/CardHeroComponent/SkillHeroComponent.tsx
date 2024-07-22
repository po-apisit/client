import { ISkillHeroRequest } from '@/interface/hero/ISkillHeroRequest';
import { ISkillHeroResponse } from '@/interface/hero/ISkillHeroResponse';
import httpServerRov from '@/utils/http/httpServerRov';
import { API } from '@/utils/instants';
import { Avatar, Box, Button, Card, CardContent, CardHeader, Divider, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SaveIcon from '@mui/icons-material/Save';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

type Props = {
  heroId?: string;
  design: 'private' | 'public';
};

export default function SkillHeroComponent({ heroId, design }: Props) {
  const [skills, setSkills] = useState<ISkillHeroResponse[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      setSkills((prevSkills) =>
        prevSkills.map((skill, i) =>
          i === index ? { ...skill, image: URL.createObjectURL(file), file } : skill
        )
      );
    }
  };

  const fetching = async (heroId: string) => {
    try {
      const response = await httpServerRov.get(API.GetfindSkill + '/heroId/' + heroId);
      if (response.status === 200) {
        const newSkills: ISkillHeroResponse[] = response.data.map((_skill: ISkillHeroResponse) => {
          const newSkill: ISkillHeroResponse = {
            ..._skill,
          };
          return newSkill;
        });
        setSkills(newSkills);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  const updateSkill = async () => {
    try {
      for (const _skill of skills) {
        if (_skill.file) {
          const formData = new FormData();
          formData.append('file', _skill.file);
          const response = await httpServerRov.post(API.GetfindSkill + "/upload/"+_skill._id, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          if (response.status === 200) {
            const _newSkill : ISkillHeroResponse = {
              ..._skill,
              image: response.data
            }
            await httpServerRov.patch(API.GetfindSkill + '/' + _newSkill._id, _newSkill);
          }
        } else {
          await httpServerRov.patch(API.GetfindSkill + '/' + _skill._id, _skill);
        }

      }
    } catch (error) {
      console.log({ error });
    }
  };

  const addSkill = async () => {
    if (heroId) {
      const newSkill: ISkillHeroRequest = {
        name: 'name' + heroId + skills.length + 1,
        description: 'description',
        _index: skills.length + 1,
        image: 'image',
        heroId: heroId,
      };

      const response = await httpServerRov.post(API.GetfindSkill, newSkill);
      if (response.status === 201) {
        const _newSkill: ISkillHeroResponse = {
          ...response.data,
        };
        setSkills([...skills, _newSkill]);
      }
    }
  };

  const handleNameChange = (index: number, value: string) => {
    setSkills((prevSkills) =>
      prevSkills.map((skill, i) => (i === index ? { ...skill, name: value } : skill))
    );
  };

  useEffect(() => {
    if (heroId) {
      fetching(heroId);
    }
  }, [heroId]);

  return (
    <Stack sx={{ width: '100%' }} spacing={1}>
      {skills.map((_skill: ISkillHeroResponse, index: number) => (
        <Stack key={_skill._id} sx={{ width: '100%' }}>
          <Card>
            <CardHeader
              avatar={
                <Box sx={{ position: 'relative', display: 'inline-block', justifyContent: 'center', alignItems: 'center' }}>
                  {design === 'private' && (
                    <Tooltip title="อัฟโหลดรูป">
                      <IconButton
                        color='primary'
                        component="label"
                        sx={{
                          position: 'absolute',
                          top: -15,
                          left: -15,
                          zIndex: 1,
                          backgroundColor: 'white',
                          borderRadius: '50%',
                        }}
                      >
                        <AddPhotoAlternateIcon />
                        <input type="file" hidden onChange={(e) => handleFileChange(e, index)} />
                      </IconButton>
                    </Tooltip>
                  )}
                  {
                    !_skill.file 
                    ? (
                    <Avatar alt='image' 
                    sx={{ width:45, height:45}}  
                      src={ process.env.NODE_ENV === "development" 
                        ? "http://localhost:399"+ _skill.image
                        : "http://localhost:399"+ _skill.image
                      } />
                    ) : (
                      <Avatar alt='image' sx={{ width:45, height:45}}  
                        src={ _skill.image} />
                    )
                  }
                  
                </Box>
              }
              title={
                design === 'private' ? (
                  <TextField
                    value={_skill.name}
                    label='Name'
                    fullWidth
                    onChange={(e) => handleNameChange(index, e.target.value)}
                  />
                ) : (
                  "สกิล "+_skill._index +" | "+ _skill.name
                )
              }
              
            />
            <Divider />
            <CardContent >
            {
                design === 'private' ? (
                  <TextField
                    value={_skill.description}
                    sx={{ mt: 2 }}
                    fullWidth
                    multiline
                    minRows={3}
                    label='Description'
                    onChange={(e) =>
                      setSkills((prevSkills) =>
                        prevSkills.map((skill, i) =>
                          i === index ? { ...skill, description: e.target.value } : skill
                        )
                      )
                    }
                  />
                ) : (
                  <Typography variant='caption'>{_skill.description}</Typography> 
                )
              }
            </CardContent>
          </Card>
        </Stack>
      ))}
      <Stack direction={'row'} spacing={2}>
        {design === 'private' && skills.length < 4 && (
          <Button onClick={addSkill} variant='outlined' startIcon={<AddCircleOutlineIcon />}>
            เพิ่ม
          </Button>
        )}
        {design === 'private' && skills.length > 0 && (
          <Button onClick={updateSkill} color='success' variant='outlined' startIcon={<SaveIcon />}>
            อัฟเดท
          </Button>
        )}
      </Stack>
    </Stack>
  );
}
