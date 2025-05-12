import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Details from "./pages/details";
import Location from "./pages/location";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/character/:id" element={<Details />} />
			<Route path="/location/:id" element={<Location />} />
		</Routes>
	);
}

export default App;
