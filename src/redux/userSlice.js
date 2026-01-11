import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    // id:"",
    // firstName: "",
    // lastName: "",
    email: "",
    role: "",
}

export const userSlice = createSlice({
    name: 'user',
    initialState,

    reducers: {
        loginData: (state, action) => {
            const { email, role } = action.payload
            state.email = email,
            state.role = role
        },
        logoutData: (state) => {
            state.email = ""
            state.role = ""
        }
    }

})



export const { loginData, logoutData } = userSlice.actions
export default userSlice.reducer