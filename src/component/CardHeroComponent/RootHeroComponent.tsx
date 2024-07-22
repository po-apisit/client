import { IHeroRequest } from '@/interface/hero/IHeroRequest'
import { IHeroResponse } from '@/interface/hero/IHeroResponse'
import { Button, Card, CardActions, CardContent, Divider } from '@mui/material';
import React, { use, useEffect, useState } from 'react'
import HeaderRootHeroComponent from './HeaderRootHeroComponent';
import CoverHeaderRootHeroComponent from './CoverHeaderRootHeroComponent';
import MenuBottomNavigation from './MenuBottomNavigation';
import { ISkillHeroRequest } from '@/interface/hero/ISkillHeroRequest';
import { ISkillHeroResponse } from '@/interface/hero/ISkillHeroResponse';
import httpServerRov from '@/utils/http/httpServerRov';
import { API } from '@/utils/instants';
import DescriptonHeroComponent from './DescriptonHeroComponent';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useAppDispatch } from '@/store';
import { AddHero, UpdateHero } from '@/store/slice/hero.slice';
import SkillHeroComponent from './SkillHeroComponent';


type Props = {
  hero: IHeroResponse;
  design: "private" | "public";
  is_private?: "add" | "update"
}

export default function RootHeroComponent({ hero, design, is_private }: Props) {
  const [screen, setScreen] = useState<number>(0);
  const [newHero, setNewHero] = useState<IHeroResponse>(hero);
  const [skills, setSkills] = useState<ISkillHeroResponse[]>([]);
  const dispatch = useAppDispatch();



  const fetching = async (id: string) => {
    try {
      const skills = await httpServerRov.get(API.GetfindSkill + "/heroId/" + id);
      if (skills.status === 200) {
        const newSkill: ISkillHeroRequest[] = skills.data.map((_skill: ISkillHeroResponse) => {
          const _newSkill: ISkillHeroResponse = {
            ..._skill
          }
          return _newSkill;
        })
        setSkills(newSkill);
      }
    } catch (error) {
      console.log({ error });

    }
  }

  const handleSave = async () => {

    if(is_private === "add"){
      dispatch(AddHero(newHero));
    } 


    if(is_private === "update"){

      const _newHero : IHeroResponse = {
        ...newHero
        
     }

      if(newHero.fileImage){
        const formData = new FormData();
        formData.append('file', newHero.fileImage);
        await httpServerRov.post(API.GetfindHero + "/upload_image/"+newHero._id, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then(response => {
          if(response.status === 201){
            _newHero.image = response.data;
          }
        })

      }  
      
      
      if(newHero.fileImageCover){        
        const formData = new FormData();
        formData.append('file', newHero.fileImageCover);
        await httpServerRov.post(API.GetfindHero + "/upload_image_cover/"+newHero._id, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then(response => {
          if(response.status === 201){
            _newHero.image_cover = response.data;
          }
        })
      

      }

    
      
      dispatch(UpdateHero(_newHero));

    }
  }

  useEffect(() => {
    if (newHero._id) {
      fetching(newHero._id);
    }
  }, [newHero])

  useEffect(() => {
    if (hero) {
      setNewHero(hero);
    }
  }, [hero])

  return (
    <Card>
      <CoverHeaderRootHeroComponent design={design} newHero={newHero} setNewHero={setNewHero} />
      <Divider />
      <HeaderRootHeroComponent design={design} newHero={newHero} setNewHero={setNewHero} />
      <Divider />
      <MenuBottomNavigation screen={screen} setScreen={setScreen} />
      <CardContent sx={{ bgcolor: "background.default" }} >
        {
          screen === 0 && (
            <React.Fragment>
              <SkillHeroComponent heroId={newHero._id} design={design} />
            </React.Fragment>
          )
        }
        {
          screen === 3 && <DescriptonHeroComponent design={design} hero={newHero} setHero={setNewHero} />
        }
      </CardContent >
      {
        design === "private" && (
          <CardActions>
            {
              is_private === "update" && (
                <Button variant="outlined" size="small" color="success" onClick={handleSave} startIcon={<SaveIcon />} >
                  อัฟเดท
                </Button>
              )
            }

            {
              is_private === "add" && (
                <Button variant="outlined" size="small" color="success" onClick={handleSave} startIcon={<AddIcon />} >
                  เพิ่ม
                </Button>
              )
            }


            <Button variant="outlined" size="small" color="error" startIcon={<DeleteForeverIcon />} >
              ลบ
            </Button>
          </CardActions>
        )

      }
    </Card>
  )
}