import { Route, Routes } from "react-router-dom";
import "./css/App.css";

import ChampionDetails from "./components/ChampionDetails";
import Champions from "./components/Champions";
import NotFound from "./components/NotFound";
import PlayerDetails from "./components/PlayerDetails";
import Players from "./components/Players";

import ChampionsLayout from "./components/layouts/ChampionsLayout";
import HomeLayout from "./components/layouts/HomeLayout";
import PlayersLayout from "./components/layouts/PlayersLayout";

export const App = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<HomeLayout />}></Route>
				<Route path="/champions" element={<ChampionsLayout />}>
					<Route index element={<Champions />} />
					<Route
						path="/champions/:championName"
						element={<ChampionDetails />}
					/>
				</Route>
				<Route path="/players" element={<PlayersLayout />}>
					<Route index element={<Players />} />
					<Route path="/players/:name" element={<PlayerDetails />} />
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
};

export default App;
