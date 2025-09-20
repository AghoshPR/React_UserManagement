import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

const API_URL = "http://127.0.0.1:8000/api/user/";


export const registerUser = createAsyncThunk(
    "auth/register",
    async({username,email,password,password2},{rejectWithValue})=>{
        try{
            const res=await axios.post(API_URL+"register/",{
                username,
                email,
                password,
                password2
            })
            return res.data
        }catch(err){
            return rejectWithValue(err.response.data)
        }
    }
)



export const loginUser = createAsyncThunk(

    "auth/login",
    async({uname,pass},{rejectWithValue})=>{

        try{

            const res=await axios.post(API_URL+"login/",{uname,pass})
            localStorage.setItem("token",res.data.access)
            return res.data

        }catch(err){    
            return rejectWithValue(err.response.data);

        }
    }
    
)


const authSlice = createSlice({

    name:"auth",
    initialState:{
        user:null,
        token:localStorage.getItem("token")||null,
        loading:false,
        error:null

    },

    reducers:{
        logout:(state)=>{
            state.user=null
            state.token=null,
            localStorage.removeItem("token")
        }
    },

    extraReducers:(builder)=>{
        builder
            .addCase(registerUser.pending,(state)=>{
                state.loading=true
                state.error=null
            })
            .addCase(registerUser.fulfilled,(state,action)=>{
                state.loading=false
            })
            .addCase(registerUser.rejected,(state,action)=>{
                state.loading=false
                state.error=action.payload
            })



            .addCase(loginUser.pending,(state)=>{
                state.loading=true
            })

            .addCase(loginUser.fulfilled, (state,action)=>{
                state.loading=false
                state.token=action.payload.access
                state.user = {username:action.payload.username, email:action.payload.email}
            })
            .addCase(loginUser.rejected,(state,action)=>{
                state.loading=false,
                state.error=action.payload
            })

    }

})

export const {logout}=authSlice.actions
export default authSlice.reducer