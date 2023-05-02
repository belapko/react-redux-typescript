import {AppDispatch} from "../store";
import axios from "axios";
import {IUser} from "../../models/IUser";
import {userSlice} from "./UserSlice";
import {createAsyncThunk} from "@reduxjs/toolkit";

// export const fetchUsers = () => async (dispatch: AppDispatch) => {
//     try {
//         dispatch(userSlice.actions.usersFetching());
//
//         dispatch(userSlice.actions.usersFetchingSuccess(response.data));
//     } catch (err: unknown) {
//         if (err instanceof Error) {
//             dispatch(userSlice.actions.usersFetchingError(err.message))
//         }
//     }
// };

export const fetchUsers = createAsyncThunk(
    'user/fetchAll', // Название thunk'a
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users');
            return response.data;
        } catch (e) {
            if (e instanceof Error) {
                return thunkAPI.rejectWithValue(e.message);
            }
        }
    } // сам колбэк
);