import { createSlice } from "@reduxjs/toolkit";

const charactersSlice = createSlice({
	name: "characters",
	initialState: {
		charactersList: [],
		currentCharacter: {},
		charactersDetailsList: {},
		count: 0,
		pages: 0,
		page: 1,
		nextPage: "",
		prevPage: "",
	},
	reducers: {
		refreshData(state, action) {
			const newData = action.payload;

			state.charactersList = newData.results;
			state.count = newData?.info?.count;
			state.pages = newData?.info?.pages;
			state.nextPage = newData?.info?.next;
			state.prevPage = newData?.info?.prev;
		},
		addCurrentCharacter(state, action) {
			const currentChar = action.payload;
			state.currentCharacter = currentChar;
		},
		addCharacterDetailsToList(state, action) {
			const newCharacterDetails = action.payload;
			state.charactersDetailsList[newCharacterDetails.id] = newCharacterDetails;
		},
		changePage(state, action) {
			state.page = action.payload;
		},
	},
});

export default charactersSlice;
export const charactersActions = charactersSlice.actions;
