import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
	name: "filters",
	initialState: {
		inputNameValue: "",
		inputTypeValue: "",
		inputSpeciesValue: "All",
		inputGenderValue: "All",
		inputStatusValue: "All",
	},
	reducers: {
		handleNameChange(state, action) {
			state.inputNameValue = action.payload;
		},

		handleTypeChange(state, action) {
			state.inputTypeValue = action.payload;
		},

		handleSpeciesChange(state, action) {
			state.inputSpeciesValue = action.payload;
		},

		handleGenderChange(state, action) {
			state.inputGenderValue = action.payload;
		},

		handleStatusChange(state, action) {
			state.inputStatusValue = action.payload;
		},
		resetFilters(state, action) {
			state.inputNameValue = "";
			state.inputTypeValue = "";
			state.inputSpeciesValue = "All";
			state.inputGenderValue = "All";
			state.inputStatusValue = "All";
		},
	},
});

export default filtersSlice;
export const filtersActions = filtersSlice.actions;
