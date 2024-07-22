import { ICategoryResponse } from "@/interface/hero/ICategoryResponse";
import { IHeroResponse } from "@/interface/hero/IHeroResponse";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import httpServerRov from "@/utils/http/httpServerRov";
import { API } from "@/utils/instants";
import { error, log } from "console";
import { IHeroRequest } from "@/interface/hero/IHeroRequest";

export const findallHero = createAsyncThunk("find-all-hero", async (_, thunk) => {
    try {
        const reponse = await httpServerRov.get(API.GetfindHero+"/admin");
        if(reponse.status === 200){
            const newHeros:IHeroResponse[] = reponse.data.map((_hero:IHeroResponse) => {
                const newHero : IHeroResponse = {
                    ..._hero,
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

export const UpdateHero = createAsyncThunk("update-hero", async (data:IHeroResponse, thunk) => {
    try {
        const response = await httpServerRov.patch(API.GetfindHero+"/"+data._id, data);
        console.log(response);
        
        if(response.status === 200){
            const newHero : IHeroResponse = {
                ...response.data
            }
            return newHero
        }

        return thunk.rejectWithValue({error:"error"})
    
        
    } catch (error) {
        return thunk.rejectWithValue({error})
    }
});

export const AddHero = createAsyncThunk("add-hero", async (data:IHeroRequest, thunk) => {
    try {
   
        const response = await httpServerRov.post(API.GetfindHero, data);
         
        if(response.status === 201){
            const newHero : IHeroResponse = {
                ...response.data
            }
            return newHero
        }

        return thunk.rejectWithValue({error:"error"})
    
        
    } catch (error) {
        return thunk.rejectWithValue({error})
    }
})

interface Hero {
    heros: IHeroResponse[],
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
        .addCase(findallHero.fulfilled, (state: Hero, action:PayloadAction<IHeroResponse[]>) => {
            if(action.payload){
                state.heros = action.payload;
            }
            state.is_error = false;
            state.message_error = null;
            state.is_loading = false;
        })
        .addCase(UpdateHero.pending, (state: Hero) => {
            state.is_loading = true;
        })
        .addCase(UpdateHero.fulfilled, (state: Hero, action:PayloadAction<IHeroResponse>) => {
            if(action.payload){
                state.heros = state.heros.map((_hero:IHeroResponse) => {
                    if(_hero._id === action.payload._id){
                        return action.payload;
                    }
                    return _hero;
                })
                state.is_loading = false;
            }
        })
        .addCase(AddHero.pending, (state: Hero) => {
            state.is_loading = true;
        })
        .addCase(AddHero.fulfilled, (state: Hero, action:PayloadAction<IHeroResponse>) => {
            if(action.payload){
                state.heros = state.heros.map((_hero:IHeroResponse) => {
                    if(_hero._id === action.payload._id){
                        return action.payload;
                    }
                    return _hero;
                })
                state.is_loading = false;
            }
        })
    }
})

export const { onSelectId } = heroSlice.actions;
export default heroSlice.reducer;
export const heroSelector = (state: RootState) => state.heroSlice;