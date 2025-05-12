import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/card";
import { locationActions } from "../store/location-slice";

export default function Location() {
	const theme = useTheme();
	const { id } = useParams();
	const [locationDetails, setLocationDetails] = useState({});
	const [residentsList, setResidentsList] = useState([]);
	const [loading, setLoading] = useState(false);

	const currentCharacter = useSelector(
		(state) => state.characters.currentCharacter
	);
	const locationDetailsList = useSelector(
		(state) => state.location.locationDetailsList
	);
	const locationResidentsList = useSelector(
		(state) => state.location.locationResidentsList
	);

	const dispatch = useDispatch();

	const fetchLocationDetails = async () => {
		setLoading(true);
		try {
			const locationResponse = await fetch(
				`https://rickandmortyapi.com/api/location/${id}`
			);
			const locationData = await locationResponse.json();
			setLocationDetails(locationData);
			dispatch(locationActions.addLocationDetailsToList(locationData));

			const charactersIdsArray = locationData.residents.map(
				(item) => item.match(/\/([^\/]+)$/)[1]
			);

			const residentsResponse = await fetch(
				`https://rickandmortyapi.com/api/character/${charactersIdsArray}`
			);
			const residentsData = await residentsResponse.json();
			setResidentsList(residentsData);
			dispatch(
				locationActions.addLocationResidentsToList({
					id: id,
					list: residentsData,
				})
			);

		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (locationDetailsList[id]) {
			setLocationDetails(locationDetailsList[id]);
			setResidentsList(locationResidentsList[id]);
		} else {
			fetchLocationDetails();
		}
	}, []);

	return (
		<Box sx={{ pt: 2, px: 2, pb: 3 }}>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					flexDirection: "column",
				}}
			>
				<Box sx={{ fontSize: "1.5rem", lineHeight: "1.5" }}>
					{locationDetails.name}
				</Box>
				<Box sx={{ fontSize: "1.25rem", lineHeight: "1.6", fontWeight: "600" }}>
					{locationDetails.type}
				</Box>
				<Box
					sx={{ fontSize: "1 rem", lineHeight: "1.5" }}
				>{`dimension: ${locationDetails.dimension}`}</Box>
				<Box
					sx={{ fontSize: "1 rem", lineHeight: "1.5" }}
				>{`created: ${locationDetails.created}`}</Box>
			</Box>
			<Box sx={{ display: "flex", justifyContent: "center", mt: "32px" }}>
				<CartItem cardDetails={currentCharacter} />
			</Box>
			<Typography
				variant="body1"
				sx={{
					fontStyle: "italic",
					color: theme.palette.customGrey.main,
					mt: "32px",
				}}
			>
				{residentsList.length > 0
					? `and ${residentsList?.length - 1} more residents of this location:`
					: "no more residents in this location"}
			</Typography>

			{loading ? (
				<>"Loading..."</>
			) : (
				<Box
					sx={{
						display: "flex",
						flexWrap: "wrap",
						justifyContent: "center",
						gap: "32px",
						mt: "32px",
					}}
				>
					{residentsList.length > 0 &&
						residentsList.map((characterCard, index) =>
							characterCard.id !== currentCharacter.id ? (
								<CartItem key={index} cardDetails={characterCard} />
							) : null
						)}
				</Box>
			)}
		</Box>
	);
}
