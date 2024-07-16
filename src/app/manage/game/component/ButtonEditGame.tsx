import { IHero } from '@/interface/IHero';
import { ISkillHero } from '@/interface/ISkillHero';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography, Avatar, IconButton, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useAppDispatch } from '@/store';
import { UpdateHero } from '@/store/slice/hero.slice';

type Props = {
  hero: IHero;
};

export default function ButtonEditGame({ hero }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<IHero>(hero);
  const dispatch = useAppDispatch();

  const handleSave = () => {
    dispatch(UpdateHero(data))
  }

  const handleSkillChange = (index, field, value) => {
    const updatedSkills = data.skills.map((skill, i) =>
      i === index ? { ...skill, [field]: value } : skill
    );
    setData({ ...data, skills: updatedSkills });
  };

  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const updatedSkills = data.skills.map((skill, i) =>
        i === index ? { ...skill, image_skill: reader.result } : skill
      );
      setData({ ...data, skills: updatedSkills });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (hero) {
      setData(hero);
    }
  }, [hero]);

  return (
    <React.Fragment>
      <Button variant="outlined" color="warning" onClick={() => setOpen(!open)}>
        แก้ไข
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          <Typography>แก้ไข {hero.name}</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={data.name}
                label="Name | ชื่อ"
                fullWidth
                onChange={e => setData({ ...data, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={data.aliases}
                label="Aliases"
                fullWidth
                onChange={e => setData({ ...data, aliases: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={data.story}
                label="Story"
                fullWidth
                multiline
                minRows={2}
                onChange={e => setData({ ...data, story: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={data.description}
                label="Description"
                fullWidth
                multiline
                minRows={2}
                onChange={e => setData({ ...data, description: e.target.value })}
              />
            </Grid>
            {data.skills.length > 0 && (
              <Grid item xs={12} >
                <Typography variant="h6">Skills</Typography>
                {data.skills.map((_skill: ISkillHero, index: number) => (
                  <Grid container spacing={2} alignItems="center" key={_skill._index}>
                    <Grid item xs={12} sm={1}>
                      <Typography variant='caption'>Skill {_skill._index}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        value={_skill.name_skill}
                        label="Name Skill"
                        fullWidth
                        onChange={(e) => handleSkillChange(index, 'name_skill', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        value={_skill.description_skill}
                        label="Description Skill"
                        fullWidth
                        onChange={(e) => handleSkillChange(index, 'description_skill', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <input
                        accept="image/*"
                        id={`icon-button-file-${index}`}
                        type="file"
                        style={{ display: 'none' }}
                        onChange={(e) => handleImageChange(index, e)}
                      />
                      <label htmlFor={`icon-button-file-${index}`}>
                        <IconButton color="primary" aria-label="upload picture" component="span">
                          <PhotoCamera />
                        </IconButton>
                      </label>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      {_skill.image_skill && <Avatar src={_skill.image_skill} />}
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="success" onClick={handleSave}>
            บันทึก
          </Button>
          <Button variant="outlined" color="error">
            ลบ
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
