import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../css/PlayerDetails.module.css";
import DataDragonService from "../services/dataDragonService";
import clsx from "clsx";
import Search from "./ui/Search";

const PlayerDetails = () => {
	let { name } = useParams();

	const [playerData, setPlayerData] = useState({});
	const [matches, setMatches] = useState([]);

	const [iconId, setIconId] = useState(0);

	const [rank, setRank] = useState([]);

	const APICall = async () => {
		let APICallString = `http://localhost:4000/getMatches`;

		let APICallStringIcon = `http://localhost:4000/getIconId`;

		let APICallStringRank = `http://localhost:4000/getPlayerRank`;

		await axios
			.get(APICallStringRank, { params: { username: name } })
			.then(function (response) {
				setRank(response.data);
				console.log(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});

		await axios
			.get(APICallString, { params: { username: name } })
			.then(function (response) {
				setMatches(response.data);
				console.log(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});

		await axios
			.get(APICallStringIcon, { params: { username: name } })
			.then(function (response) {
				setIconId(response.data);
				console.log(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	};
	useEffect(() => {
		APICall();
	}, [name]);

	const calculateTime = (time) => {
		const minutes = Math.floor(time / 60);
		const seconds = time - minutes * 60;
		return `${minutes}m ${seconds}s`;
	};

	const unixToDate = (unixTime) => {
		let currentDate = new Date();
		const current = currentDate.getTime();
		const timestamp = unixTime;

		let millisecondDifference = Math.abs(current - timestamp);

		let minutes = millisecondDifference / (1000 * 60);
		let hours = millisecondDifference / (1000 * 60 * 60);
		let days = millisecondDifference / (1000 * 60 * 60 * 24);

		if (minutes < 60.0) {
			return `${minutes.toFixed(0)} minutes ago`;
		}
		if (minutes >= 60.0 && hours < 24.0) {
			return `${hours.toFixed(0)} hours ago`;
		}
		if (hours >= 24.0 && days < 28) {
			return `${days.toFixed(0)} day${
				days.toFixed(0) > 1 ? "s" : ""
			} ago`;
		}
		if (days.toFixed(0) >= 28) {
			return `${(days / 28.0).toFixed(0)} month${
				(days / 28).toFixed(0) > 1 ? "s" : ""
			} ago`;
		}
	};

	const getStatPerMinute = (stat, gameDuration) => {
		return (stat / (gameDuration / 60)).toFixed(2);
	};

	const getStatRatingGlobal = (playerStat, players) => {
		let damages = [];
		players.map((player, playerIndex) => {
			damages.push(player.totalDamageDealtToChampions);
		});
		damages.sort((a, b) => b - a);
		const ranking = damages.findIndex((element) => element === playerStat);
		return ranking + 1;
	};

	const getSuffix = (number) => {
		if (number === 1) {
			return "st";
		} else if (number === 2) {
			return "nd";
		} else if (number === 3) {
			return "rd";
		} else {
			return "th";
		}
	};

	const getRankImage = (rank) => {
		switch (rank.toUpperCase()) {
			case "IRON":
				return "../img/iron.png";
			case "BRONZE":
				return "../img/bronze.png";
			case "SILVER":
				return "../img/silver.png";
			case "GOLD":
				return "../img/gold.png";
			case "PLATINUM":
				return "../img/plat.png";
			case "DIAMOND":
				return "../img/diamond.png";
			case "MASTER":
				return "../img/master.png";
			case "GRANDMASTER":
				return "../img/gm.png";
			case "CHALLENGER":
				return "../img/chall.png";
			default:
				return "../img/unranked.png";
		}
	};

	return (
		<>
			<div className={styles.gridContainer}>
				{matches[0] != "notfound" ? (
					<>
						{matches.length === 0 ? (
							<>
								<div
									className="loadingio-spinner-dual-ring-10iywntj3hre"
									style={{
										position: "absolute",
										inset: "50%",
										transform: "translate(-50%, -50%)",
									}}
								>
									<div className="ldio-dhxhlox2sa7">
										<div></div>
										<div>
											<div></div>
										</div>
									</div>
								</div>
							</>
						) : (
							<>
								<div
									className={styles.card}
									style={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										flexWrap: "wrap",
										gap: "1.5em",
										boxSizing: "border-box",
										gridColumn: "span 2",
									}}
								>
									<img
										src={DataDragonService.getIcon(iconId)}
										width={114}
										style={{ borderRadius: "0.75em" }}
									/>
									{/*ikonka*/}
									<div>
										<h1
											style={{
												color: "var(--sgRed-500)",
												fontSize: "2.5em",
											}}
										>
											{name.toUpperCase()}
										</h1>
										<h2
											style={{ color: "var(--sgRed-50)" }}
										>
											{matches[0].info.platformId
												.toString()
												.slice(0, 3)}
										</h2>
									</div>
								</div>

								{/*- -	-	-R-ANK -T-AD-Y-	--	-	-*/}
								{/*- -	-	-R-ANK -T-AD-Y-	--	-	-*/}
								{/*- -	-	-R-ANK -T-AD-Y-	--	-	-*/}
								{/*- -	-	-R-ANK -T-AD-Y-	--	-	-*/}
								{/*- -	-	-R-ANK -T-AD-Y-	--	-	-*/}
								{/*- -	-	-R-ANK -T-AD-Y-	--	-	-*/}
								{/*- -	-	-R-ANK -T-AD-Y-	--	-	-*/}

								<div
									className={styles.card}
									style={{
										display: "flex",
										justifyContent: "space-evenly",
										alignItems: "center",
										gridColumn: "span 3",
									}}
								> 
									<div
										style={{
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											gap: "1em",
											height: "100%",
											overflow: "hidden",
										}}
									>
										<img
											height={175}
											src={getRankImage(rank[0])}
										></img>
										<div>
											<h2
												style={{
													color: "var(--sgRed-500)",
													fontSize: "2.5em",
												}}
											>
												{rank[0]} {rank[1]}
											</h2>
											<h2
												style={{
													color: "var(--sgRed-50)",
												}}
											>
												{rank[2] !== "" ? (
													<>{rank[2]} LP</>
												) : (
													<></>
												)}
											</h2>
										</div>
									</div>
									<div
										style={{
											display: "flex",
											justifyContent: "center",
											alignItems: "flex-start",
											flexDirection: "column",
											fontSize: "1.25em",
										}}
									>
										<div
											style={{
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
												gap: "1em",
											}}
										>
											<h2
												style={{
													color: "var(--sgBlue)",
												}}
											>
												{rank[3] !== "" ? (
													<>{rank[3]}W</>
												) : (
													<></>
												)}
											</h2>
											<h2
												style={{
													color: "var(--sgRed-500)",
												}}
											>
												{rank[4] !== "" ? (
													<>{rank[4]}L</>
												) : (
													<></>
												)}
											</h2>
										</div>
										<h2
											style={
												(
													(rank[3] /
														(rank[3] + rank[4])) *
													100
												).toFixed(1) >= 50
													? { color: "var(--sgBlue)" }
													: {
															color: "var(--sgRed-500)",
													  }
											}
										>
											{rank[3] != "" ? (
												<>
													{(
														(rank[3] /
															(rank[3] +
																rank[4])) *
														100
													).toFixed(1)}
													%
												</>
											) : (
												<></>
											)}
										</h2>
									</div>
								</div>

								<div
									className={clsx(
										styles.card,
										styles.matchHistory
									)}
									style={{
										display: "flex",
										justifyContent: "start",
										alignItems: "start",
										gridColumn: "span 5",
										gridRow: "span 4",
										flexDirection: "column",
									}}
								>
									{matches.map((gameData, index) => (
										<Fragment key={index}>
											{gameData.info.participants.map(
												(player, playerIndex) => (
													<Fragment key={playerIndex}>
														{player.summonerName ===
															name && (
															<div
																className={clsx(
																	index === 9
																		? styles.lastChild
																		: styles.otherChildren
																)}
																style={{
																	display:
																		"grid",
																	gridTemplateColumns:
																		"0.75fr 0.5fr 0.5fr 0.5fr",
																	gridTemplateRows:
																		"1fr",
																	justifyContent:
																		"left",
																	alignItems:
																		"center",
																	gap: "1em",
																	width: "100%",
																	padding:
																		"1em",
																}}
															>
																<div
																	style={{
																		display:
																			"flex",
																		justifyContent:
																			"left",
																		alignItems:
																			"center",
																	}}
																>
																	<img
																		src={DataDragonService.getChampionIconUrl(
																			player.championName
																		)}
																		width={
																			128
																		}
																		style={{
																			borderRadius:
																				"1.25em",
																			boxSizing:
																				"border-box",
																			padding:
																				"0.5em",
																		}}
																	/>
																	<div>
																		<h2>
																			{
																				gameData
																					.info
																					.gameMode
																			}
																		</h2>
																		<div
																			style={{
																				display:
																					"flex",
																				justifyContent:
																					"center",
																				alignItems:
																					"center",
																				gap: "1em",
																			}}
																		>
																			<h4>
																				{calculateTime(
																					gameData
																						.info
																						.gameDuration
																				)}
																			</h4>
																			<h4>
																				{unixToDate(
																					gameData
																						.info
																						.gameEndTimestamp
																				)}
																			</h4>
																		</div>
																		{player.win ? (
																			<h2
																				className={
																					styles.victory
																				}
																			>
																				Victory
																			</h2>
																		) : (
																			<h2
																				className={
																					styles.defeat
																				}
																			>
																				Defeat
																			</h2>
																		)}
																	</div>
																</div>
																<div>
																	<h2>{`${player.kills} / ${player.deaths} / ${player.assists}`}</h2>
																	<h2
																		style={
																			(player.kills +
																				player.assists) /
																				player.deaths >
																			3
																				? {
																						color: "var(--sgBlue)",
																				  }
																				: {
																						color: "var(--sgRed-200)",
																				  }
																		}
																	>
																		{player.deaths !=
																		0 ? (
																			<>
																				{(
																					(player.kills +
																						player.assists) /
																					player.deaths
																				).toFixed(
																					2
																				)}
																			</>
																		) : (
																			<>
																				Perfect
																			</>
																		)}{" "}
																		KDA
																	</h2>
																</div>
																<div>
																	<h2>{`${player.totalMinionsKilled}`}</h2>
																	<h2
																		style={
																			getStatPerMinute(
																				player.totalMinionsKilled,
																				gameData
																					.info
																					.gameDuration
																			) >
																			7
																				? {
																						color: "var(--sgBlue)",
																				  }
																				: {
																						color: "var(--sgRed-200)",
																				  }
																		}
																	>
																		{getStatPerMinute(
																			player.totalMinionsKilled,
																			gameData
																				.info
																				.gameDuration
																		)}
																		cs/m
																	</h2>
																</div>
																<div>
																	<h2>{`${getStatPerMinute(
																		player.totalDamageDealtToChampions,
																		gameData
																			.info
																			.gameDuration
																	)} dmg/m`}</h2>
																	<h2
																		style={
																			getStatRatingGlobal(
																				player.totalDamageDealtToChampions,
																				gameData
																					.info
																					.participants
																			) <
																			5
																				? {
																						color: "var(--sgBlue)",
																				  }
																				: {
																						color: "var(--sgRed-200)",
																				  }
																		}
																	>
																		{getStatRatingGlobal(
																			player.totalDamageDealtToChampions,
																			gameData
																				.info
																				.participants
																		)}
																		{getSuffix(
																			getStatRatingGlobal(
																				player.totalDamageDealtToChampions,
																				gameData
																					.info
																					.participants
																			)
																		)}
																	</h2>
																</div>
															</div>
														)}
													</Fragment>
												)
											)}
										</Fragment>
									))}
								</div>
							</>
						)}
					</>
				) : (
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							flexDirection: "column",
							gridColumn: "span 5",
							gridRow: "span 4",
							gap: "3em",
						}}
					>
						<h1
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							Player does not exist
						</h1>
						<Search
							src={"../img/search.svg"}
							style={{ color: "black" }}
						/>
					</div>
				)}
			</div>
		</>
	);
};
export default PlayerDetails;
