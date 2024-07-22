import { ICategoryItemResponse } from "@/interface/hero/ICategoryItemResponse";
import httpServerRov from "@/utils/http/httpServerRov";
import { API } from "@/utils/instants";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ICategoryItemRequest } from "@/interface/hero/ICategoryItemRequest";

export const FindallCategoryItem = createAsyncThunk( "findall-category-item",async (_, thunk) => {

    try {
        const response = await httpServerRov.get(API.CategoryItem);
        
        if(response.status === 200){
            const newCategorys : ICategoryItemResponse[] = response.data.map((cat:ICategoryItemResponse) => {
                const newCategory: ICategoryItemResponse = {
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

export const AddCategoryItem = createAsyncThunk("add-category-item", async (data:ICategoryItemRequest, thunk) => {
    try {
        const response =  await httpServerRov.post(API.CategoryItem, data)
           
        if(response.status === 201){
            const newCat : ICategoryItemResponse = {
                ...response.data
            }

            return newCat;
        }
        
        return thunk.rejectWithValue({error:"error"})

    } catch (error) {
        return thunk.rejectWithValue({error})
    }
})


interface CategoryItem {
    category: ICategoryItemResponse[];
    is_loading: boolean;
    is_error: boolean;
    message_error: string | null;
}

const initialState : CategoryItem = {
    category: [],
    is_loading: false,
    is_error: false,
    message_error: null
}

const categoryItemSlice = createSlice({
    name: "category-item-slice",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(FindallCategoryItem.pending, (state: CategoryItem) => {
                state.is_loading = true;
                state.is_error = false;
                state.message_error = null;
            })
            .addCase(FindallCategoryItem.fulfilled, (state: CategoryItem, action:PayloadAction<ICategoryItemResponse[]>) => {
                if(action.payload){
                    state.category = action.payload;
                }
                state.is_error = false;
                state.message_error = null;
                state.is_loading = false;
            })
            .addCase(AddCategoryItem.pending, (state: CategoryItem) => {
                state.is_loading = true;
                state.is_error = false;
                state.message_error = null;
            })
            .addCase(AddCategoryItem.fulfilled, (state: CategoryItem, action:PayloadAction<ICategoryItemResponse>) => {
                if(action.payload){
                    state.category = [...state.category, action.payload];
                }
                state.is_error = false;
                state.message_error = null;
                state.is_loading = false;
            })
    }
});

export default categoryItemSlice.reducer;
export const categoryItemSelector = ( state: RootState ) => state.categoryItemSlice;
