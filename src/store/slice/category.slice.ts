import { ICategoryResponse } from "@/interface/hero/ICategoryResponse";
import { createAsyncThunk, createSlice, GetThunkAPI, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import httpServerRov from "@/utils/http/httpServerRov";
import { API } from "@/utils/instants";
import { ICategoryRequest } from "@/interface/hero/ICategoryRequest";

export const FindallCategory = createAsyncThunk( "findall-category",async (_, thunk) => {

try {
    const response = await httpServerRov.get(API.GetfindCategory);
    
    if(response.status === 200){
        const newCategorys : ICategoryResponse[] = response.data.map((cat:ICategoryResponse) => {
            const newCategory: ICategoryResponse = {
                _id: cat._id,
                name: cat.name,
                description: cat.description,
                createdAt: cat.createdAt,
                updatedAt: cat.updatedAt,
            }
            return newCategory;
        })

        return newCategorys;
    } else {
        return thunk.rejectWithValue({error:"error"})
    }
} catch (error) {    
    return thunk.rejectWithValue({error})
}
})

export const UpdateCategory = createAsyncThunk("update-category", async (data:ICategoryResponse, thunk) => {
    try {
        const request:ICategoryRequest = {...data};
        await httpServerRov.patch(API.GetfindCategory + "/" + data._id, request);
            return data;
        
    } catch (error) {
        return thunk.rejectWithValue({error})
    }
})

export const DeleteCategory = createAsyncThunk("delete-category", async (data:ICategoryResponse, thunk) => {
    try {
        await httpServerRov.delete(API.GetfindCategory + "/" + data._id);
        return data;
        
    } catch (error) {
        return thunk.rejectWithValue({error})
    }
})

export const CreateCategory = createAsyncThunk("create-category", async (data:ICategoryRequest, thunk) => {
    try {
        const response = await httpServerRov.post(API.GetfindCategory, data);
            const newCategory:ICategoryResponse = {
                ...response.data
            }
            return newCategory;
        
    } catch (error) {
        return thunk.rejectWithValue({error})
    }
})

interface Category {
    categorys:ICategoryResponse[],
    selectId: string | null,
    is_loading:boolean,
    is_error:boolean,
    message_error: string | null
}

const initialState : Category = {
    categorys: [],
    selectId: null,
    is_loading: false,
    is_error: false,
    message_error: null
}

const categorySlice = createSlice({
    name: "category-slice",
    initialState,
    reducers: {
        onSelectId: (state:Category, action:PayloadAction<string>) => {
            if(action.payload){
                state.selectId = action.payload
            }
        }
    },
    extraReducers: builder => {
        builder
            .addCase(FindallCategory.pending, (state: Category) => {
                state.is_loading = true;
                state.categorys = [];
                state.is_error = false;
                state.message_error = null;
            })
            .addCase(FindallCategory.fulfilled, (state: Category, action:PayloadAction<ICategoryResponse[]>) => {
                if(action.payload){
                    state.categorys = action.payload;
                    state.message_error = null;
                    state.is_error = false;
                    state.is_loading = false;
                }
            })
            .addCase(CreateCategory.pending, (state: Category) => {
                state.message_error = null;
                state.is_error = false;
                state.is_loading = true;
            })
            .addCase(CreateCategory.fulfilled, (state: Category, action:PayloadAction<ICategoryResponse>) => {
                if(action.payload){
                    state.categorys = [...state.categorys, action.payload];
                    state.message_error = null;
                    state.is_error = false;
                    state.is_loading = false;
                }
            })
            .addCase(UpdateCategory.pending, (state: Category) => {
                state.message_error = null;
                state.is_error = false;
                state.is_loading = true;
            })
            .addCase(UpdateCategory.fulfilled, (state: Category, action:PayloadAction<ICategoryResponse>) => {
                if(action.payload){
                    state.categorys = state.categorys.map((cat:ICategoryResponse) => {
                        if(cat._id === action.payload._id){
                            return action.payload;
                        }
                        return cat;
                    })
                    state.message_error = null;
                    state.is_error = false;
                    state.is_loading = false;
                }
            })
            .addCase(DeleteCategory.pending, (state: Category) => {
                state.message_error = null;
                state.is_error = false;
                state.is_loading = true;
            })
            .addCase(DeleteCategory.fulfilled, (state: Category, action:PayloadAction<ICategoryResponse>) => {
                if(action.payload){
                    state.categorys = state.categorys.filter((cat:ICategoryResponse) => cat._id !== action.payload._id);
                    state.message_error = null;
                    state.is_error = false;
                    state.is_loading = false;
                }
            })
    }
});

export const { onSelectId } = categorySlice.actions;
export default categorySlice.reducer;
export const categorySelector = (state: RootState) => state.categorySlice;

