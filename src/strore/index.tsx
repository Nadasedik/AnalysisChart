import { configureStore } from "@reduxjs/toolkit";
import CountriesSlice from "./CountriesSlice";

export type AppDispatch = typeof store.dispatch

const store = configureStore({
    reducer:{
        Countries: CountriesSlice.reducer
    },
    
})
export type RootState = ReturnType<typeof store.getState>
export default store