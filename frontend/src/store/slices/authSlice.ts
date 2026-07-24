import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api';

export interface Role {
    id?: number;
    name: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role?: Role | string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

const initialToken = localStorage.getItem('token');

const initialState: AuthState = {
    user: null,
    isAuthenticated: !!initialToken,
    isLoading: !!initialToken,
    error: null,
};

// Async Thunks
export const loginUser = createAsyncThunk('auth/login', async (credentials: any, { rejectWithValue }) => {
    try {
        const response = await api.post('/api/login', credentials);
        const token = response.data.token || response.data.access_token;
        if (token) {
            localStorage.setItem('token', token);
        }
        return response.data.user;
    } catch (error: any) {
        return rejectWithValue(
            error.response?.data?.message ||
            error.message ||
            'Login failed'
        );
    }
});

export const registerUser = createAsyncThunk('auth/register', async (credentials: any, { rejectWithValue }) => {
    try {
        const response = await api.post('/api/register', credentials);
        const token = response.data.token || response.data.access_token;
        if (token) {
            localStorage.setItem('token', token);
        }
        return response.data.user;
    } catch (error: any) {
        return rejectWithValue(
            error.response?.data?.message ||
            error.message ||
            'Registration failed'
        );
    }
});

export const fetchCurrentUser = createAsyncThunk('auth/me', async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return rejectWithValue('No token found');
    }
    try {
        const response = await api.get('/api/me');
        return response.data.user;
    } catch (error: any) {
        localStorage.removeItem('token');
        return rejectWithValue('Not authenticated');
    }
});

export const logoutUser = createAsyncThunk('auth/logout', async () => {
    try {
        await api.post('/api/logout');
    } catch (error) {
        // Ignore API logout errors and proceed with clearing local token
    } finally {
        localStorage.removeItem('token');
    }
    return null;
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearAuth: (state) => {
            localStorage.removeItem('token');
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
            state.error = null;
        }
    },
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
                state.isAuthenticated = false;
                state.error = action.payload as string;
            })
            // Register
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.error = action.payload as string;
            })
            // Fetch User
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
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
            });
    },
});

export const { clearAuth } = authSlice.actions;
export default authSlice.reducer;
