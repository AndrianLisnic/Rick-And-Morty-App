import { configureStore } from "@reduxjs/toolkit";
import charactersSlice from "./characters-slice";
import filtersSlice from "./filters-slice";
import locationSlice from "./location-slice";

const store = configureStore({
	reducer: {
		characters: charactersSlice.reducer,
		location: locationSlice.reducer,
		filters: filtersSlice.reducer,
	},
});

export default store;
