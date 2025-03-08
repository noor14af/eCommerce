import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {

      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: state => {
      state.user = null;
      localStorage.removeItem("user"); // ✅ Remove user on logout
      localStorage.removeItem("token");
    },
  }
})

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;
export const selectUser = (state) => state.user?.user;
export default authSlice.reducer