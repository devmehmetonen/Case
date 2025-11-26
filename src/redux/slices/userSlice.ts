import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {  getUsers } from '../../services/users'
import { User } from '../../types/userTypes'
import { RootState } from '../store'

export interface AppState {
  userList: User[],
  status: string,
}

const initialState: AppState = {
  userList: [],
  status: "idle"
}

export const getUsersAsync = createAsyncThunk(
  'app/getPost',
  async () => {
    const response = await getUsers();
    return response.data
  }
)



export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUserList: (state, action) => {
      state.userList = action.payload
    },
    adduser: (state, action) =>{
      state.userList = [...state.userList, action.payload]
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.userList = action.payload
      })
  }
})



export const selectUserList = (state: RootState) => state.app.userList;
export const { adduser } = appSlice.actions;

export default appSlice.reducer