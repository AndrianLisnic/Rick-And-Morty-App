import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Button } from "@mui/material";
import theme from "../theme/theme";
import { useDispatch, useSelector } from "react-redux";
import { charactersActions } from "../store/characters-slice";

export default function Details() {
	const { id } = useParams();
	const [details, setDetails] = useState({});
	const dispatch = useDispatch();
	const characterDetailsList = useSelector(
		(state) => state.characters.charactersDetailsList
	);

	async function fetchCharacterDetails() {
		try {
			const res = await fetch(
				`https://rickandmortyapi.com/api/character/${id}`
			);
			const data = await res.json();
			setDetails(data);
			dispatch(charactersActions.addCurrentCharacter(data));
			dispatch(charactersActions.addCharacterDetailsToList(data));
		} catch (error) {
			console.log(error);
		}
	}

	function convertCreatedDateFormat() {
		const date = new Date(details.created);

		const dayOfWeek = date.toLocaleString("en-US", { weekday: "short" });
		const day = String(date.getDate()).padStart(2, "0");
		const month = date.toLocaleString("en-US", { month: "short" });
		const year = date.getFullYear();
		const hours = String(date.getUTCHours()).padStart(2, "0");
		const minutes = String(date.getUTCMinutes()).padStart(2, "0");
		const seconds = String(date.getUTCSeconds()).padStart(2, "0");

		const formattedDate = `${dayOfWeek}, ${day} ${month} ${year} ${hours}:${minutes}:${seconds} GMT`;

		return formattedDate;
	}

	useEffect(() => {
		if (characterDetailsList[id]) {
			setDetails(characterDetailsList[id]);
		} else {
			fetchCharacterDetails();
		}
	}, []);

	return (
		<Box sx={{ p: 2 }}>
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<Box sx={{ width: "650px" }}>
					<Box
						sx={{
							display: "flex",
							flexWrap: "wrap",
							justifyContent: "center",
							gap: "24px",
							mx: "12px",
						}}
					>
						<Box sx={{ display: "flex" }}>
							<img
								src={details.image}
								alt={details.name}
								style={{
									width: "300px",
									height: "300px",
									objectFit: "cover",
									borderRadius: "4px",
								}}
							/>
						</Box>
						<Box
							sx={{ display: "flex", flexDirection: "column", width: "300px" }}
						>
							<Box
								sx={{ fontSize: "2rem", lineHeight: "1.3", textAlign: "start" }}
							>
								{details.name}
							</Box>
							<Box
								sx={{
									fontSize: "1.5rem",
									lineHeight: "1.3",
									color: theme.palette.customGrey.dark,
									textAlign: "start",
								}}
							>
								{details.type}
							</Box>
							<Box sx={{ mt: "12px" }}>
								<Box sx={{ display: "flex", alignItems: "center" }}>
									<Box
										sx={{
											width: "80px",
											fontSize: "1rem",
											lineHeight: "2rem",
											display: "flex",
											color: theme.palette.customGrey.main,
										}}
									>
										species:
									</Box>
									<Box>{details.species}</Box>
								</Box>
								<Box sx={{ display: "flex", alignItems: "center", mt: "8px" }}>
									<Box
										sx={{
											width: "80px",
											fontSize: "1rem",
											lineHeight: "2rem",
											display: "flex",
											color: theme.palette.customGrey.main,
										}}
									>
										gender:
									</Box>
									<Box>{details.gender}</Box>
								</Box>
								<Box sx={{ display: "flex", alignItems: "center", mt: "8px" }}>
									<Box
										sx={{
											width: "80px",
											fontSize: "1rem",
											lineHeight: "2rem",
											display: "flex",
											color: theme.palette.customGrey.main,
										}}
									>
										status:
									</Box>
									<Box
										sx={{
											color:
												details.status === "Alive"
													? "green"
													: details.status === "Dead"
													? "red"
													: theme.palette.customGrey.main,
										}}
									>
										{details.status}
									</Box>
								</Box>
								<Box
									sx={{
										display: "flex",
										flexWrap: "wrap",
										alignItems: "center",
										mt: "8px",
									}}
								>
									<Box
										sx={{
											width: "80px",
											fontSize: "1rem",
											lineHeight: "2rem",
											display: "flex",
											color: theme.palette.customGrey.main,
										}}
									>
										origin:
									</Box>
									<Box
										sx={{
											color:
												details?.origin?.name === "unknown"
													? theme.palette.customGrey.main
													: "black",
											textAlign: "start",
										}}
									>
										{details?.origin?.name === "unknown" ? (
											"unknown"
										) : (
											<Link
												to={`/location/${
													details?.origin?.url?.match(/\/([^\/]+)$/)[1]
												}`}
												style={{ color: "black" }}
											>
												{details?.origin?.name}
											</Link>
										)}
									</Box>
								</Box>
								<Box
									sx={{
										display: "flex",
										flexWrap: "wrap",
										alignItems: "center",
										mt: "8px",
									}}
								>
									<Box
										sx={{
											width: "80px",
											fontSize: "1rem",
											lineHeight: "2rem",
											display: "flex",
											color: theme.palette.customGrey.main,
										}}
									>
										location:
									</Box>
									<Box
										sx={{
											color:
												details?.location?.name === "unknown"
													? theme.palette.customGrey.main
													: "black",
											textAlign: "start",
										}}
									>
										{details?.location?.name === "unknown" ? (
											"unknown"
										) : (
											<Link
												to={`/location/${
													details?.location?.url?.match(/\/([^\/]+)$/)[1]
												}`}
												style={{ color: "black" }}
											>
												{details?.location?.name}
											</Link>
										)}
									</Box>
								</Box>
								<Box
									sx={{
										display: "flex",
										flexWrap: "wrap",
										alignItems: "center",
										mt: "8px",
									}}
								>
									<Box
										sx={{
											width: "80px",
											fontSize: "1rem",
											lineHeight: "2rem",
											display: "flex",
											color: theme.palette.customGrey.main,
										}}
									>
										created:
									</Box>
									<Box sx={{ textAlign: "start" }}>
										{convertCreatedDateFormat()}
									</Box>
								</Box>
							</Box>
							<Box sx={{ mt: 3, mr: 4 }}>
								<Link to={`/`} style={{ textDecoration: "none" }}>
									<Box
										sx={{
											display: "flex",
											justifyContent: "flex-end",
											mb: "12px",
										}}
									>
										<Button size="medium" sx={{ fontWeight: "bolder" }}>
											Go Back
										</Button>
									</Box>
								</Link>
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}
