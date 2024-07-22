import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IItemResponse } from "@/interface/hero/IItemResponse";
import httpServerRov from "@/utils/http/httpServerRov";
import { API } from "@/utils/instants";
import { IItemRequest } from "@/interface/hero/IItemRequest";


export const FindallItem = createAsyncThunk( "findall-item",async (_, thunk) => {

    try {
        const response = await httpServerRov.get(API.Item);
        
        if(response.status === 200){
            const newItems : IItemResponse[] = response.data.map((item:IItemResponse) => {
                const newItem: IItemResponse = {
                    ...item
                }
                return newItem;
            })
    
            return newItems;
        } else {
            return thunk.rejectWithValue({error:"error"})
        }
    } catch (error) {    
        return thunk.rejectWithValue({error})
    }
})

export const UpdateItem = createAsyncThunk("update-item", async (data:IItemResponse, thunk) => {
    try {
        const response =  await httpServerRov.patch(API.CategoryItem +data._id, data)
           
        if(response.status === 200){
            const newItem : IItemResponse = {
                ...response.data
            }

            return newItem;
        }
        
        return thunk.rejectWithValue({error:"error"})

    } catch (error) {
        return thunk.rejectWithValue({error})
    }
})

export const AddItem = createAsyncThunk("add-item", async (data:IItemRequest, thunk) => {
    try {
        const response =  await httpServerRov.post(API.CategoryItem, data)
           
        if(response.status === 201){
            const newItem : IItemResponse = {
                ...response.data
            }

            return newItem;
        }
        
        return thunk.rejectWithValue({error:"error"})

    } catch (error) {
        return thunk.rejectWithValue({error})
    }
})



interface Item {
    item: IItemResponse[];
    is_loading: boolean;
    is_error: boolean;
    message_error: string | null;
}


const initialState: Item = {
    item: [],
    is_loading: false,
    is_error: false,
    message_error: null
}

const itemSlice = createSlice({
    name: "item-slice",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(FindallItem.pending, (state:Item) => {
                state.is_loading = true;
                state.is_error = false;
                state.message_error = null;
            })
            .addCase(FindallItem.fulfilled, (state: Item, action:PayloadAction<IItemResponse[]>) => {
                if(action.payload){
                    state.item = action.payload;
                }
                state.is_error = false;
                state.is_loading = false;
            })
            .addCase(AddItem.pending, (state:Item) => {
                state.is_loading = true;
                state.is_error = false;
                state.message_error = null;
            })
            .addCase(AddItem.fulfilled, (state: Item, action:PayloadAction<IItemResponse>) => {
                if(action.payload){
                    state.item = [...state.item, action.payload];
                }
                state.is_error = false;
                state.is_loading = false;
            })
            .addCase(UpdateItem.pending, (state:Item) => {
                state.is_loading = true;
                state.is_error = false;
                state.message_error = null;
            })
            .addCase(UpdateItem.fulfilled, (state: Item, action:PayloadAction<IItemResponse>) => {
                if(action.payload){
                    state.item = state.item.map((item:IItemResponse) => {
                        if(item._id === action.payload._id){
                            return action.payload;
                        }
                        return item;
                    })
                }
                state.is_error = false;
                state.is_loading = false;
            })
    }

});

export default itemSlice.reducer;
export const itemSelector = (state:RootState) => state.itemSlice;