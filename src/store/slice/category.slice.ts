import { ICategory } from "@/interface/ICategory";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import httpServerRov from "@/utils/http/httpServerRov";
import { API } from "@/utils/instants";
import { IHero } from "@/interface/IHero";

export const FindallCategory = createAsyncThunk( "findall-category",async (_, thunk) => {

try {
    const response = await httpServerRov.get(API.GetfindCategory);
    
    if(response.status === 200){
        const newCategorys : ICategory[] = response.data.map((cat:ICategory) => {
            const newCategory: ICategory = {
                _id: cat._id,
                name: cat.name,
                label: cat.name,
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
    console.log({error});
    
    return thunk.rejectWithValue({error})
}
})

export const UpdateCategory = createAsyncThunk("update-category", async (data:ICategory, thunk) => {

})

interface Category {
    categorys:ICategory[],
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
            .addCase(FindallCategory.fulfilled, (state: Category, action:PayloadAction<ICategory[]>) => {
                if(action.payload){
                    state.categorys = action.payload;
                    state.is_error = false;
                    state.is_loading = false;
                }
            })
    }
});

export const { onSelectId } = categorySlice.actions;
export default categorySlice.reducer;
export const categorySelector = (state: RootState) => state.categorySlice;

