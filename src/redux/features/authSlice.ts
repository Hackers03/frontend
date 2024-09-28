import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
}

// Définir l'état initial en utilisant le type défini ci-dessus
const initialState: AuthState = {
    isAuthenticated: false,
    isLoading: true,
    //error: undefined,
};


// Créer le slice auth
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state) => {
            state.isAuthenticated = true;
            state.isLoading = false;
        },
        setLogout: (state) => {
            state.isAuthenticated = false;
            state.isLoading = false;
        },
        finishInitialLoad: (state) => {
            state.isLoading = false
        }
    },
});

// Exporter les actions et le reducer
export const { setAuth, setLogout, finishInitialLoad } = authSlice.actions;
export default authSlice.reducer;