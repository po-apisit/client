import { IHeroResponse } from '@/interface/hero/IHeroResponse';
import { Stack, TextField, Typography } from '@mui/material';
import React from 'react'

type Props = {
    hero: IHeroResponse;
    setHero: (state: IHeroResponse) => void;
    design: "private" | "public";
}

export default function DescriptonHeroComponent({hero, design, setHero}: Props) {
  return (
    <Stack spacing={2}>
        <Stack>
            <Typography>Story</Typography>
            {
            design === "private" ? (
                <TextField 
                value={hero.story}
                label="Story"
                multiline
                minRows={3}
                onChange={e => setHero({...hero, story: e.target.value})}
                 />
            )
            : <Typography variant='caption'>{hero.story}</Typography>
        }
        </Stack>
        <Stack>
            <Typography>Description</Typography>
            {
            design === "private" ? (
                <TextField 
                value={hero.description}
                label="Description"
                multiline
                minRows={3}
                onChange={e => setHero({...hero, description: e.target.value})}
                 />
            )
            : <Typography variant='caption'>{hero.description}</Typography>
        }
        </Stack>

    </Stack>
  )
}