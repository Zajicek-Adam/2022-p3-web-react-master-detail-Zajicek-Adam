import { Link, Outlet } from "react-router-dom";
import styles from "../../css/HomeLayout.module.css";
import Search from "../ui/Search";

const HomeLayout = () => {
	const RightSide = () => {
		return (
			<div className={[styles.linkContainer, styles.redBg].join(" ")}>
				<Outlet />
				<Link className={styles.link} to="champions">
					<img src="img/champions.svg" alt="champion icon" />
				</Link>

				<Link className={styles.link} to="players">
					<img src="img/player.svg" alt="player icon" />
				</Link>
			</div>
		);
	};

	const LeftSide = () => {
		return (
			<div className={[styles.linkContainer, styles.darkBg].join(" ")}>
				<h1>
					skillgap<em>.gg</em>
				</h1>
				<Search className="home" style={{width: "505px"}} src={"img/search.svg"}/>
			</div>
		);
	};

	return (
		<div className={styles.container}>
			<LeftSide></LeftSide>
			<RightSide></RightSide>
		</div>
	);
};

export default HomeLayout;
