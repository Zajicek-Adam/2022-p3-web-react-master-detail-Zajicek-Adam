var express = require("express");
var cors = require("cors");
const axios = require("axios");
require("dotenv").config();

var app = express();

app.use(cors());

const API_KEY = process.env.API_KEY;

//get basic profile info

async function getPlayer(playerName) {
	try {
		return await axios
			.get(
				"https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" +
					playerName +
					"?api_key=" +
					API_KEY
			)
			.then((response) => {
				if (response.status == 200) {
					return response.data;
				} else {
					throw new Error("Player not found");
				}
			});
	} catch (Error) {
		return "NotFound";
	}
}

app.get("/getPlayerRank", async (req, res) => {
	const data = await getPlayer(req.query.username);
	if (data == "NotFound") return res.json("notfound");
	const summonerId = data.id;
	const API_CALL =
		"https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/" +
		summonerId +
		"?api_key=" +
		API_KEY;

	const rank = await axios
		.get(API_CALL)
		.then((response) => response.data)
		.catch((err) => {
			return err;
		});
	const returnArray =
		rank[0] !== undefined
			? [
					rank[0].tier,
					rank[0].rank,
					rank[0].leaguePoints,
					rank[0].wins,
					rank[0].losses,
			  ]
			: ["UNRANKED", "", "", "", ""];

	console.log(returnArray);

	res.json(returnArray);
});

app.get("/getIconId", async (req, res) => {
	const playerName = req.query.username;
	const IconId = await getPlayer(playerName);

	if (IconId == "NotFound") return res.json("notfound");

	res.json(IconId.profileIconId);
});

app.get("/getMatches", async (req, res) => {
	const playerName = req.query.username;
	const data = await getPlayer(playerName);
	if (data == "NotFound") return res.json(["notfound"]);
	const puuid = data.puuid;

	const API_CALL =
		"https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/" +
		puuid +
		"/ids" +
		"?api_key=" +
		API_KEY;

	const gameIDS = await axios
		.get(API_CALL)
		.then((response) => response.data)
		.catch((err) => {
			return err;
		});

	var matchDataArray = [];
	for (let index = 0; index < gameIDS.length - 10; index++) {
		const matchID = gameIDS[index];
		const matchData = await axios
			.get(
				"https://europe.api.riotgames.com/lol/match/v5/matches/" +
					matchID +
					"?api_key=" +
					API_KEY
			)
			.then((response) => response.data)
			.catch((err) => err);
		matchDataArray.push(matchData);
	}
	res.json(matchDataArray);
});

app.get("/getChampions", async (req, res) => {
	const API_CALL =
		"https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=" +
		API_KEY;

	const returnedObject = await axios
		.get(API_CALL)
		.then((response) => response.data)
		.catch((err) => {
			return err;
		});

	const freeRotation = Object.values(returnedObject)[0];

	res.json(freeRotation);
});

app.get("/getChallengers", async (req, res) => {
	const API_CALL =
		"https://euw1.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=" +
		API_KEY;
	const returnedObject = await axios
		.get(API_CALL)
		.then((response) => response.data)
		.catch((err) => {
			return err;
		});
	
	const entries = Object.values(returnedObject)[4];

	res.json(entries);
});

app.listen(4000, function () {
	console.log(
		"server runnnnnin, onm my of sseped on port 4000 \nhttp://localhost:4000"
	);
});
