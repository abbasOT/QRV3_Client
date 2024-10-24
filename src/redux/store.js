import { configureStore } from '@reduxjs/toolkit'
import searchEventsByDateReducer from './slices/searchEventsByDate'


export const store = configureStore({
    reducer: {
        searchEventsByDate: searchEventsByDateReducer,
    },
})