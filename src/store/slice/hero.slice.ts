import { IHero } from "@/interface/IHero";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import httpServerRov from "@/utils/http/httpServerRov";
import { API } from "@/utils/instants";
import { error, log } from "console";

export const findallHero = createAsyncThunk("find-all-hero", async (_, thunk) => {
    try {
        const reponse = await httpServerRov.get(API.GetfindHero);
        if(reponse.status === 200){
            const newHeros:IHero[] = reponse.data.map((_hero:IHero) => {
                const newHero : IHero = {
                    _id: _hero._id,
                    name: _hero.name,
                    aliases: _hero.aliases,
                    image: _hero.image,
                    description: _hero.description,
                    story: _hero.story,
                    categoryId: _hero.categoryId,
                    itemsId: _hero.itemsId,
                    createdAt: _hero.createdAt,
                    updatedAt: _hero.updatedAt,
                    skills: _hero.skills,
                }
                return newHero;
            })
            return newHeros;
        }
        return thunk.rejectWithValue({error:"error"})
        
    } catch (error) {
        return thunk.rejectWithValue({error})
    }
})

export const UpdateHero = createAsyncThunk("update-hero", async (data:IHero, thunk) => {
try {
    const response = await httpServerRov.patch(API.GetfindHero+"/"+data._id, data);
    if(response.status === 200){
        const newHero : IHero = {
            _id: response.data._id,
            name: response.data.name,
            aliases: response.data.aliases,
            image: response.data.image,
            description: response.data.description,
            story: response.data.story,
            categoryId: response.data.categoryId,
            itemsId: response.data.itemsId,
            createdAt: response.data.createdAt,
            updatedAt: response.data.updatedAt,
            skills: response.data.skills,
        }
        return newHero
    }

    return thunk.rejectWithValue({error:"error"})
   
    
} catch (error) {
    return thunk.rejectWithValue({error})
}
})

interface Hero {
    heros: IHero[],
    selectId: string | null;
    is_loading: boolean,
    is_error: boolean,
    message_error: string | null
}

const initialState : Hero = {
    heros: [],
    selectId: null,
    is_loading: false,
    is_error: false,
    message_error: null
}

const heroSlice = createSlice({
    name: "hero-slice",
    initialState,
    reducers: {
        onSelectId: (state:Hero, action:PayloadAction<string>) => {
            if(action.payload){
                state.selectId = action.payload;
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(findallHero.pending, (state: Hero) => {
            state.is_loading = true;
            state.is_error = false;
            state.message_error = null;
            state.heros = [];
        })
        .addCase(findallHero.fulfilled, (state: Hero, action:PayloadAction<IHero[]>) => {
            if(action.payload){
                state.heros = action.payload;
            }
            state.is_error = false;
            state.message_error = null;
            state.is_loading = false;
        })
        .addCase(UpdateHero.fulfilled, (state: Hero, action:PayloadAction<IHero>) => {
            if(action.payload){
                state.heros = state.heros.map((_hero:IHero) => {
                    if(_hero._id === action.payload._id){
                        return action.payload;
                    }
                    return _hero;
                })
            }
        })
    }
})

export const { onSelectId } = heroSlice.actions;
export default heroSlice.reducer;
export const heroSelector = (state: RootState) => state.heroSlice;