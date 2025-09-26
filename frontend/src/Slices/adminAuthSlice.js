import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ADMIN_API_URL  = "http://127.0.0.1:8000/api/myadmin/"

export const adminLogin = createAsyncThunk(

    "adminAuth/login",
    async ({adminName,adminPass},{rejectWithValue})=>{
        try{
            const res = await axios.post(ADMIN_API_URL+"adminLogin/",{
                adminName,
                adminPass
            })

            localStorage.setItem("adminToken",res.data.access)
            return res.data
        }catch(err){
            return rejectWithValue(err.response.data)
        }
    }
    
)

const adminAuthSlice = createSlice({
    name:"adminAuth",
    initialState:{
        admin:null,
        token:localStorage.getItem("adminToken")||null,
        loading:false,
        error:null,
    },
    reducers:{
        logoutAdmin:(state)=>{
            state.admin=null,
            state.token=null,
            localStorage.removeItem("adminToken")
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(adminLogin.pending,(state)=>{
            state.loading=true,
            state.error=null
        })
        .addCase(adminLogin.fulfilled,(state,action)=>{
            state.loading=false,
            state.token=action.payload.access
            state.admin={username:action.payload.username}
        })
        .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        });
    }
})

export const {logoutAdmin}=adminAuthSlice.actions
export default adminAuthSlice.reducer