import { Box, Button, Typography, useTheme, Pagination } from "@mui/material";
import CartItem from "../components/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { charactersActions } from "../store/characters-slice";
import Filters from "../components/filters";
import { filtersActions } from "../store/filters-slice";

export default function Home() {
	const theme = useTheme();
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const charactersList = useSelector(
		(state) => state.characters.charactersList
	);
	const count = useSelector((state) => state.characters.count);
	const pages = useSelector((state) => state.characters.pages);
	const page = useSelector((state) => state.characters.page);
	const inputNameValue = useSelector((state) => state.filters.inputNameValue);
	const inputTypeValue = useSelector((state) => state.filters.inputTypeValue);
	const inputSpeciesValue = useSelector(
		(state) => state.filters.inputSpeciesValue
	);
	const inputGenderValue = useSelector(
		(state) => state.filters.inputGenderValue
	);
	const inputStatusValue = useSelector(
		(state) => state.filters.inputStatusValue
	);

	function handlePageChange(event, value) {
		dispatch(charactersActions.changePage(value));
	}

	async function fetchCharacters() {
		setLoading(true);

		try {
			const res = await fetch(
				`https://rickandmortyapi.com/api/character/?name=${inputNameValue}&type=${inputTypeValue}&species=${
					inputSpeciesValue === "All" ? "" : inputSpeciesValue
				}&gender=${inputGenderValue === "All" ? "" : inputGenderValue}&status=${
					inputStatusValue === "All" ? "" : inputStatusValue
				}&page=${page}`
			);

			if (res.status === 200) {
				const data = await res.json();
				dispatch(charactersActions.refreshData(data));
			} else if (res.status === 404) {
				setError("No characters found with the selected filters.");
				dispatch(charactersActions.refreshData({}));
			} else {
				setError(`Unexpected error: ${res.status}`);
				dispatch(charactersActions.refreshData({}));
				console.log(`Error: ${res.status}`);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchCharacters();
	}, [
		inputNameValue,
		inputTypeValue,
		inputSpeciesValue,
		inputGenderValue,
		inputStatusValue,
		page,
	]);

	return (
		<Box sx={{ pt: 2, px: 2, pb: 3 }}>
			<Filters />
			<Box sx={{ mt: "32px" }}>
				<Button
					variant="outlined"
					sx={{
						color: theme.palette.customGrey.main,
						borderColor: theme.palette.customGrey.main,
						"&:hover": {
							borderColor: theme.palette.customGrey.dark,
							backgroundColor: theme.palette.customGrey.light,
						},
					}}
					onClick={() => dispatch(filtersActions.resetFilters())}
				>
					Reset filters
				</Button>
			</Box>
			<Box
				sx={{
					height: "80px",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Typography
					variant="body1"
					sx={{ fontStyle: "italic", color: theme.palette.customGrey.main }}
				>
					{loading
						? "Searching..."
						: count > 0
						? `Found ${count} characters`
						: `${error}`}
				</Typography>
			</Box>

			<Box
				sx={{
					display: "flex",
					flexWrap: "wrap",
					justifyContent: "center",
					gap: "32px",
				}}
			>
				{charactersList?.map((characterCard, index) => (
					<CartItem key={index} cardDetails={characterCard} />
				))}
			</Box>

			<Box sx={{ display: "flex", justifyContent: "center", mt: "36px" }}>
				{count > 0 && <Pagination count={pages} onChange={handlePageChange} />}
			</Box>
		</Box>
	);
}
