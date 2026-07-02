import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api';

// Define TS Interfaces
interface User {
    id: number;
    name: string;
    email: string;
    role: { name: string };
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: true, // Start true so ProtectedRoute waits on refresh
    error: null,
};

// Async Thunks
export const loginUser = createAsyncThunk('auth/login', async (credentials: any, { rejectWithValue }) => {
    try {
        await api.get('/sanctum/csrf-cookie'); // CSRF Handshake
        const response = await api.post('/api/login', credentials);
        return response.data.user;
    } catch (error: any) {
        console.error("LOGIN ERROR FULL DETAILS:", error);
        return rejectWithValue(
            error.response?.data?.message || 
            error.message || 
            'Login failed'
        );
    }
});

export const fetchCurrentUser = createAsyncThunk('auth/me', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get('/api/me');
        return response.data.user;
    } catch (error) {
        return rejectWithValue('Not authenticated');
    }
});

export const logoutUser = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
    try {
        await api.post('/api/logout');
        return null;
    } catch (error) {
        return rejectWithValue('Logout failed');
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            // Fetch User (on page load)
            .addCase(fetchCurrentUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(fetchCurrentUser.rejected, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
            })
            // Logout
            .addCase(logoutUser.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.user = null;
            });
    },
});

export default authSlice.reducer;