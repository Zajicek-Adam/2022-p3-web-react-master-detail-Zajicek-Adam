import Menu from "../ui/Menu";
import { Outlet } from 'react-router-dom';

const PlayersLayout = () => {
	return (
		<>
			<Menu/>
			<Outlet/>

		</>
	);
};

export default PlayersLayout;
