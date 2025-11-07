import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import { toast } from "react-toastify"
import axios from "axios"

const api = axios.create({
    baseURL: `${import.meta.env.VITE_ROOT_URL}/api/auth`,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
})

//async thunk for login
export const loginUser = createAsyncThunk(
    "auth/loginUser", async (userData, { rejectWithValue }) => {
        try {
            const res = await api.post("/login-user", userData);
            return res.data;
        } catch (error) {
            return rejectWithValue(extractErrorMessage(error))
        }
    }
)

//async thunk for signup
export const signupUser = createAsyncThunk(
    "auth/signupUser", async (userData, { rejectWithValue }) => {
        try {
            const res = await api.post("/signup-user", userData);
            return res.data;
        } catch (error) {
            return rejectWithValue(extractErrorMessage(error))
        }
    }
)

//async thunk for logout
export const logoutUser = createAsyncThunk(
    "auth/logoutUser", async (_, { rejectWithValue }) => {
        try {
            const res = await api.delete("/logout-user", {});
            return res.data.message;
        } catch (error) {
            return rejectWithValue(extractErrorMessage(error))
        }
    }
)

//async thunk for get user
export const getUser = createAsyncThunk(
    "auth/getUser", async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/get-user");
            return res.data.data;
        } catch (error) {
            return rejectWithValue(extractErrorMessage(error))
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState: {
        authUser: null,
        message: null,
        pending: false,
        error: null
    },
    reducers: {
        clearMessage: (state) => {
            state.message = null
        },
        clearError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
        //login user
        .addCase(loginUser.pending, (state, action) => {
            state.pending = true,
            state.error = null
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.pending = false,
            state.authUser = action.payload.data,
            state.message = action.payload.message
            toast.success(action.payload.message)
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.pending = false,
            state.error = action.payload
        })
        //signup user
        .addCase(signupUser.pending, (state, action) => {
            state.pending = true,
            state.error = null
        })
        .addCase(signupUser.fulfilled, (state, action) => {
            state.pending = false,
            state.authUser = action.payload.data,
            state.message = action.payload.message
            toast.success(action.payload.message)
        })
        .addCase(signupUser.rejected, (state, action) => {
            state.pending = false,
            state.error = action.payload
        })
        //logout user
        .addCase(logoutUser.pending, (state, action) => {
            state.pending = true,
            state.error = null
        })
        .addCase(logoutUser.fulfilled, (state, action) => {
            state.pending = false,
            state.authUser = null,
            state.message = action.payload
        })
        .addCase(logoutUser.rejected, (state, action) => {
            state.pending = false,
            state.error = action.payload
        })
        //fetch user
        .addCase(getUser.pending, (state, action) => {
            state.pending = true,
            state.error = null
        })
        .addCase(getUser.fulfilled, (state, action) => {
            state.pending = false,
            state.authUser = action.payload
        })
        .addCase(getUser.rejected, (state, action) => {
            state.pending = false,
            state.error = action.payload
        })
    }
})

export const { clearError, clearMessage } = authSlice.actions;
export default authSlice.reducer