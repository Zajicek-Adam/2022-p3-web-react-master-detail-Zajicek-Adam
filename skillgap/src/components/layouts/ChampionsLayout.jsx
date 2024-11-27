import { Link, Outlet } from "react-router-dom";
import styles from "../../css/ChampionsLayout.module.css";
import Menu from "../ui/Menu";


const ChampionsLayout = () => {
	return (
		<div className={styles.container}> 
			<Menu/>
			<Outlet />
		</div>
	);
};

export default ChampionsLayout;
