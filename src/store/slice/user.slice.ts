import { IUser } from "@/interface/IUser";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

interface User {
    user:IUser | null,
    is_loading: boolean,
    is_error: boolean,
    is_login: boolean,
    message_error: string | null
}

const initialState : User = {
    user: null,
    is_loading: false,
    is_error: false,
    is_login: false,
    message_error: null
}

const userSlice = createSlice({
    name: 'user-slice',
    initialState,
    reducers: {},

})

export default userSlice.reducer;
export const userSelector = (state: RootState) => state.userSlice;