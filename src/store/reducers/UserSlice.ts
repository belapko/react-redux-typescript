import {IUser} from "../../models/IUser";
import {createSlice, isFulfilled, isPending, PayloadAction} from "@reduxjs/toolkit";
import {fetchUsers} from "./ActionCreators";

interface UserState {
    users: IUser[];
    isLoading: boolean;
    error: string;
}

const initialState: UserState = {
    users: [],
    isLoading: false,
    error: '',
}

export const userSlice = createSlice({ // Reducer но для redux-toolkit
    name: 'user',
    initialState,
    reducers: { // Это поле является аналогом switch case В обычно reducer
        // usersFetching(state) {
        //     state.isLoading = true;
        // },
        // usersFetchingSuccess(state, action: PayloadAction<IUser[]>) {
        //     state.isLoading = false;
        //     state.error = '';
        //     state.users = action.payload;
        // },
        // usersFetchingError(state, action: PayloadAction<string>) {
        //     state.isLoading = false;
        //     state.error = action.payload;
        // },
    },
    extraReducers: (builder) => { // Спецаильное поле делает чтобы Thunk работал. Типа замена dispatch'у и штукам выше
        builder.addCase(fetchUsers.pending.type, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchUsers.fulfilled.type, (state, action: PayloadAction<IUser[]>) => {
            state.isLoading = false;
            state.error = '';
            state.users = action.payload;
        });
        builder.addCase(fetchUsers.rejected.type, (state, action:PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        })
        // [fetchUsers.pending.type]: (state) => {
        //     state.isLoading = true;
        // },
        // [fetchUsers.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
        //     state.isLoading = false;
        //     state.error = '';
        //     state.users = action.payload;
        // },
        // [fetchUsers.rejected.type]: (state, action: PayloadAction<string>) => {
        //     state.isLoading = false;
        //     state.error = action.payload;
        // },
    },
});

export default userSlice.reducer;