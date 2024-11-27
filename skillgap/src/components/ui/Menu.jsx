import { useState } from "react";
import menuStyles from "../../css/Menu.module.css";
import clsx from "clsx";
import { Link } from "react-router-dom";

const Menu = () => {
	const [isActive, setIsActive] = useState(false);

	const handleClick = () => {
		setIsActive(!isActive);
	};

	return (
		<>
			<div
				onClick={handleClick}
				className={clsx(
					menuStyles.burger,
					isActive ? menuStyles.clicked : ""
				)}
			>
				<span></span>
				<span></span>
				<span></span>
			</div>

			<div
				className={clsx(
					menuStyles.menu,
					isActive ? "" : menuStyles.hide
				)}
			>
				<header>
					<h1>skillgap.gg</h1>
				</header>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
						marginTop: "2em",
						gap: "1em",
					}}
				>
					<Link to="/" className={menuStyles.linkContainer}>
						<img
							src="../img/house-solid.svg"
							width={48}
							style={{
								filter: "invert(25%) sepia(61%) saturate(2382%) hue-rotate(338deg) brightness(122%) contrast(88%)",
							}}
						/>
						Home
					</Link>
					<Link to="/champions" className={menuStyles.linkContainer}>
						<img
							src="../img/champions-black.svg"
							width={44}
							style={{
								filter: "invert(25%) sepia(61%) saturate(2382%) hue-rotate(338deg) brightness(122%) contrast(88%)",
							}}
						/>
						Champions
					</Link>
					<Link to="/players" className={menuStyles.linkContainer}>
						<img
							src="../img/player-black.svg"
							width={48}
							style={{
								filter: "invert(25%) sepia(61%) saturate(2382%) hue-rotate(338deg) brightness(122%) contrast(88%)",
							}}
						/>
						Players
					</Link>
				</div>
			</div>
		</>
	);
};

export default Menu;
