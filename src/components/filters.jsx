import { Box } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import {
	characterGender,
	characterSpecies,
	characterStatus,
} from "../const/filteringConsts";
import { charactersActions } from "../store/characters-slice";
import { filtersActions } from "../store/filters-slice";

const Filters = () => {
	const dispatch = useDispatch();
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

	const handleNameChange = (event) => {
		dispatch(filtersActions.handleNameChange(event.target.value));
		dispatch(charactersActions.changePage(1));
	};

	const handleTypeChange = (event) => {
		dispatch(filtersActions.handleTypeChange(event.target.value));
		dispatch(charactersActions.changePage(1));
	};

	const handleSpeciesChange = (event) => {
		dispatch(filtersActions.handleSpeciesChange(event.target.value));
		dispatch(charactersActions.changePage(1));
	};

	const handleGenderChange = (event) => {
		dispatch(filtersActions.handleGenderChange(event.target.value));
		dispatch(charactersActions.changePage(1));
	};

	const handleStatusChange = (event) => {
		dispatch(filtersActions.handleStatusChange(event.target.value));
		dispatch(charactersActions.changePage(1));
	};

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				gap: "20px",
				alignItems: "center",
				flexWrap: "wrap",
			}}
		>
			<Box component="form" sx={{ width: "225px" }}>
				<FormControl variant="standard" sx={{ width: "100%" }}>
					<InputLabel htmlFor="character-name" shrink>
						Character name
					</InputLabel>
					<Input
						id="character-name"
						type="text"
						value={inputNameValue}
						onChange={handleNameChange}
					/>
				</FormControl>
			</Box>
			<Box component="form" sx={{ width: "225px" }}>
				<FormControl variant="standard" sx={{ width: "100%" }}>
					<InputLabel htmlFor="character-type" shrink>
						Character type
					</InputLabel>
					<Input
						id="character-type"
						type="text"
						value={inputTypeValue}
						onChange={handleTypeChange}
					/>
				</FormControl>
			</Box>
			<Box component="form" sx={{ width: "225px" }}>
				<FormControl variant="standard" sx={{ width: "100%" }}>
					<InputLabel id="character-species" shrink>
						Character species
					</InputLabel>
					<Select
						labelId="character-species"
						sx={{ textAlign: "left" }}
						value={inputSpeciesValue}
						onChange={handleSpeciesChange}
					>
						{characterSpecies.map((item) => (
							<MenuItem value={item}>{item}</MenuItem>
						))}
					</Select>
				</FormControl>
			</Box>
			<Box component="form" sx={{ width: "225px" }}>
				<FormControl variant="standard" sx={{ width: "100%" }}>
					<InputLabel id="character-gender" shrink>
						Character gender
					</InputLabel>
					<Select
						labelId="character-gender"
						sx={{ textAlign: "left" }}
						value={inputGenderValue}
						onChange={handleGenderChange}
					>
						{characterGender.map((item) => (
							<MenuItem value={item}>{item}</MenuItem>
						))}
					</Select>
				</FormControl>
			</Box>
			<Box component="form" sx={{ width: "225px" }}>
				<FormControl variant="standard" sx={{ width: "100%" }}>
					<InputLabel id="character-status" shrink>
						Character status
					</InputLabel>
					<Select
						labelId="character-status"
						sx={{ textAlign: "left" }}
						value={inputStatusValue}
						onChange={handleStatusChange}
					>
						{characterStatus.map((item) => (
							<MenuItem value={item}>{item}</MenuItem>
						))}
					</Select>
				</FormControl>
			</Box>
		</Box>
	);
};

export default Filters;
