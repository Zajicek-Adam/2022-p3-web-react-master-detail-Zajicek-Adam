import { useState } from "react";
import { useNavigate } from "react-router-dom";
import searchStyles from "../../css/Search.module.css";

const Search = ({ style, className, src}) => {
	const [searchText, setSearchText] = useState("");

	const navigate = useNavigate();

	const checkChampionName = () => {
		return
	}

	function SearchForPlayer() {
		if(!checkChampionName())
			navigate(`/players/${searchText}`);
	}

	return (
		<div className="relative" style={style}>
			<input
				className={className}
				onChange={(e) => {
					setSearchText(e.target.value);
				}}
				onKeyUp={(e) => {
					if (e.key === "Enter") {
						SearchForPlayer();
					}
				}}
				type="search"
				placeholder="search something..."
			/>
			<button className={searchStyles.buttoN} onClick={(e) => SearchForPlayer()}>
				<img src={src} width={32} alt="search icon" />
			</button>
		</div>
	);
};

export default Search;
