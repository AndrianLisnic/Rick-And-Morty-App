import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		customGrey: {
			light: "#F5F5F5",
			main: "#9E9E9E",
			dark: "#424242",
			contrastText: "#000000",
		},
	},
});

export default theme;