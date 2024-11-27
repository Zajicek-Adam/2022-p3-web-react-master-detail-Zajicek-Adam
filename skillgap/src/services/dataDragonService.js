import axios from "axios";

const asyncFunctions = {
	getChampionNames: async (ids) => {
		try {
			const championDataResponse = await axios
				.get(
					`https://ddragon.leagueoflegends.com/cdn/13.11.1/data/en_US/champion.json`
				)
				.then((response) => response.data);

			// Step 3: Create a local dictionary mapping champion IDs to names
			const championDictionary = {};
			Object.values(championDataResponse.data).forEach((champion) => {
				if (ids.includes(Number(champion.key))) {
					championDictionary[champion.key] = champion.name;
				}
			});
			console.log(championDictionary);
			return championDictionary;
		} catch (error) {
			console.error("Error:", error.message, error.stack);
			return {};
		}
	},
};

const DataDragonService = {
	getVersions: async () => {
		const response = await axios.get(
			'https://ddragon.leagueoflegends.com/api/versions.json'
		);
		return response.data;
	},

	getChampionIconUrl: (championName) => {
		return `https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/${championName}.png`;
	},
	getSplashArtUrl: (championName) => {
		return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championName}_0.jpg`;
	},

	getItemIconUrl: (itemId) => {
		return `https://ddragon.leagueoflegends.com/cdn/14.23.1/img/item/${itemId}.png`;
	},
	getIcon: (iconId) => {
		return `https://ddragon.leagueoflegends.com/cdn/14.23.1/img/profileicon/${iconId}.png`;
	},
	getChampions: async () => {
		let championDataResponse = await axios
			.get(
				`https://ddragon.leagueoflegends.com/cdn/14.23.1/data/en_US/champion.json`
			)
			.then((response) => response.data);

		return championDataResponse;
	},
	getChampionData: async (championName) => {
		let championDataResponse = await axios
			.get(
				`http://ddragon.leagueoflegends.com/cdn/14.23.1/data/en_US/champion/${championName}.json`
			)
			.then((response) => response.data);

		return championDataResponse.data;
	}

};

export default DataDragonService;
