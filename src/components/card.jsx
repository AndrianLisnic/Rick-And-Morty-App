import { Paper, Box, Button } from "@mui/material";
import theme from "../theme/theme";
import { Link } from "react-router-dom";

export default function CartItem({ cardDetails }) {
	return (
		<Paper
			elevation={4}
			sx={{
				borderRadius: "8px",
			}}
		>
			<Box sx={{ display: "flex", p: "12px", height: "100%" }}>
				<Box>
					<img
						src={cardDetails.image}
						alt={cardDetails.name}
						style={{
							width: "150px",
							height: "fit-content",
							objectFit: "cover",
							borderRadius: "4px",
						}}
					/>
				</Box>
				<Box
					sx={{
						ml: "12px",
						width: "150px",
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
					}}
				>
					<Box>
						<Box sx={{ textAlign: "left", fontSize: "1.5rem" }}>
							{cardDetails.name}
						</Box>
						<Box
							sx={{
								textAlign: "left",
								mb: "12px",
								mt: "5px",
								color: theme.palette.customGrey.dark,
							}}
						>
							{cardDetails.type}
						</Box>
						<Box>
							<Box
								sx={{
									display: "flex",
									fontSize: "0.875rem",
									lineHeight: "1.5",
								}}
							>
								<Box sx={{ color: theme.palette.customGrey.main }}>
									species:
								</Box>
								<Box sx={{ textAlign: "start", pl: "4px" }}>
									{cardDetails.species}
								</Box>
							</Box>
							<Box
								sx={{
									display: "flex",
									fontSize: "0.875rem",
									lineHeight: "1.5",
								}}
							>
								<Box sx={{ color: theme.palette.customGrey.main }}>gender:</Box>
								<Box>&nbsp;{cardDetails.gender}</Box>
							</Box>
							<Box
								sx={{
									display: "flex",
									fontSize: "0.875rem",
									lineHeight: "1.5",
								}}
							>
								<Box sx={{ color: theme.palette.customGrey.main }}>status:</Box>
								<Box
									sx={{
										color:
											cardDetails.status === "Alive"
												? "green"
												: cardDetails.status === "Dead"
												? "red"
												: theme.palette.customGrey.main,
									}}
								>
									&nbsp;{cardDetails.status}
								</Box>
							</Box>
						</Box>
					</Box>
					<Link
						to={`/character/${cardDetails.id}`}
						style={{ textDecoration: "none" }}
					>
						<Box
							sx={{
								display: "flex",
								justifyContent: "flex-end",
								// mt: "12px",
								mb: "12px",
							}}
						>
							<Button
								size="small"
								sx={{ fontWeight: "600", fontSize: "0.8125rem" }}
							>
								Learn more
							</Button>
						</Box>
					</Link>
				</Box>
			</Box>
		</Paper>
	);
}
