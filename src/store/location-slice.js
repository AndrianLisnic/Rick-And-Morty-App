import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
	name: "location",
	initialState: {
		locationDetailsList: {},
		locationResidentsList: {},
	},
	reducers: {
		addLocationDetailsToList(state, action) {
			const newLocationDetails = action.payload;
			state.locationDetailsList[newLocationDetails.id] = newLocationDetails;
		},
		addLocationResidentsToList(state, action) {
			const newLocationResidents = action.payload;
			state.locationResidentsList[newLocationResidents.id] =
				newLocationResidents.list;
		},
	},
});

export default locationSlice;
export const locationActions = locationSlice.actions;
