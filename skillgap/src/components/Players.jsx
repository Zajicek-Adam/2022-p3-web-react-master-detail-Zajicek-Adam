import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../css/Player.module.css";
import DataDragonService from "../services/dataDragonService";
import Search from "./ui/Search";
import clsx from "clsx";
import { Link, Outlet } from "react-router-dom";

const Players = () => {
  const [players, setPlayers] = useState(undefined);

  const [icon, setIcon] = useState("");
  const [icon1, setIcon1] = useState("");
  const [icon2, setIcon2] = useState("");
  const [icon3, setIcon3] = useState("");
  const [icon4, setIcon4] = useState("");

  const [hotStreaks, setHotStreaks] = useState(0);

  const APICall = async () => {
    let APICallString = `http://localhost:4000/getChallengers`;

    const result = await axios
      .get(APICallString)
      .then((response) => response.data)
      .catch(function (error) {
        console.log(error);
      });
    setPlayers(
      Array.from(result).sort((a, b) => b.leaguePoints - a.leaguePoints)
    );
  };

  const IconCall = async () => {
    let APICallStringIcon = `http://localhost:4000/getIconId`;
    const id = await axios
      .get(APICallStringIcon, {
        params: { username: players[0].summonerName },
      })
      .then((res) => res.data)
      .catch(function (error) {
        console.log(error);
      });

    const id1 = await axios
      .get(APICallStringIcon, {
        params: { username: players[1].summonerName },
      })
      .then((res) => res.data)
      .catch(function (error) {
        console.log(error);
      });

    const id2 = await axios
      .get(APICallStringIcon, {
        params: { username: players[2].summonerName },
      })
      .then((res) => res.data)
      .catch(function (error) {
        console.log(error);
      });
    const id3 = await axios
      .get(APICallStringIcon, {
        params: { username: players[3].summonerName },
      })
      .then((res) => res.data)
      .catch(function (error) {
        console.log(error);
      });

    const id4 = await axios
      .get(APICallStringIcon, {
        params: { username: players[4].summonerName },
      })
      .then((res) => res.data)
      .catch(function (error) {
        console.log(error);
      });

    const icon = DataDragonService.getIcon(id);
    const icon1 = DataDragonService.getIcon(id1);
    const icon2 = DataDragonService.getIcon(id2);
    const icon3 = DataDragonService.getIcon(id3);
    const icon4 = DataDragonService.getIcon(id4);

    setIcon(icon);
    setIcon1(icon1);
    setIcon2(icon2);
    setIcon3(icon3);
    setIcon4(icon4);
  };

  useEffect(() => {
    APICall();
  }, []);

  useEffect(() => {
    if (players !== undefined) {
      IconCall();
      for (let index = 0; index < 5; index++) {
        const element = players[index];
        console.log(element);
        if (element.hotStreak === true) {
          setHotStreaks((hotStreaks) => hotStreaks + 1);
          console.log(hotStreaks);
        }
      }
    }
  }, [players]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "6em",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
          gridTemplateColumns: "repeat(8, 1fr)",
          width: "min(100%, 1400px)",
          boxSizing: "border-box",
          gap: "2em",
          gridTemplateRows: "125px",
          gridAutoRows: "300px",
        }}
      >
        <>
          {players === undefined ? (
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
              <h1 style={{ gridColumn: "1/5", gridRow: 1 }}>leaderboards</h1>
              <Search
                src="../img/search.svg"
                style={{
                  color: "black",
                  gridColumn: "6/9",
                  gridRow: 1,
                  marginLeft: "-20px",
                }}
                className={styles.small}
              />
              <Outlet />
              {players[0] !== undefined && (
                <Link
                  to={`/players/${players[0].summonerName}`}
                  className={clsx(styles.card, styles.first)}
                  style={{ gridColumn: "1/9" }}
                >
                  <h1 style={{ color: "#CDA967", fontSize: "5em" }}>1</h1>
                  {icon !== undefined ? (
                    <>
                      <img
                        style={{ border: "#CDA967 5px solid" }}
                        src={icon}
                        width={200}
                        alt=""
                      ></img>
                    </>
                  ) : (
                    <></>
                  )}
                  <div style={{ margin: "1.5em" }}>
                    <h1>{players[0].summonerName}</h1>
                    <h2>
                      <em
                        style={{
                          marginRight: "1em",
                          marginLeft: "0.2em",
                          color: "#CDA967",
                        }}
                      >
                        Challenger
                      </em>
                      {players[0].leaguePoints} LP
                    </h2>
                  </div>

                  <div style={{ margin: "" }}>
                    <h2>
                      <em style={{ marginRight: "1em", color: "#CDA967" }}>
                        {(
                          (players[0].wins * 100) /
                          (players[0].wins + players[0].losses)
                        ).toFixed()}
                        % wr
                      </em>
                      {players[0].wins + players[0].losses} games
                    </h2>
                    <div
                      style={{
                        height: "7.5px",
                        width: "100%",
                        backgroundColor: "var(--sgBackground)",
                        marginTop: "1em",
                        borderRadius: "5em",
                        position: "relative",
                      }}
                    >
                      <span
                        style={{
                          height: "7.5px",
                          width: `${(
                            (players[0].wins * 100) /
                            (players[0].wins + players[0].losses)
                          ).toFixed()}%`,
                          backgroundColor: "#CDA967",
                          display: "inline-block",
                          position: "absolute",
                        }}
                      ></span>
                    </div>
                  </div>
                </Link>
              )}
              <Outlet />
              {players[1] !== undefined && (
                <Link
                  to={`/players/${players[1].summonerName}`}
                  className={clsx(styles.card)}
                  style={{ gridColumn: "span 4" }}
                >
                  <div>
                    <h1 style={{ color: "#C0C0C0", fontSize: "5em" }}>2</h1>
                    {icon1 !== undefined ? (
                      <>
                        <img
                          style={{ border: "#CDA967 5px solid" }}
                          src={icon1}
                          width={100}
                          alt=""
                        ></img>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div style={{}}>
                    <h1>{players[1].summonerName}</h1>
                    <h2>
                      <em style={{ marginRight: "1em", color: "#CDA967" }}>
                        Challenger
                      </em>
                      {players[1].leaguePoints} LP
                    </h2>
                    <h2>
                      <em style={{ marginRight: "1em", color: "#CDA967" }}>
                        {(
                          (players[1].wins * 100) /
                          (players[1].wins + players[1].losses)
                        ).toFixed()}
                        % wr
                      </em>
                      {players[1].wins + players[1].losses} games
                    </h2>
                    <div
                      style={{
                        height: "7.5px",
                        width: "100%",
                        backgroundColor: "var(--sgBackground)",
                        marginTop: "1em",
                        borderRadius: "5em",
                        position: "relative",
                      }}
                    >
                      <span
                        style={{
                          height: "7.5px",
                          width: `${(
                            (players[1].wins * 100) /
                            (players[1].wins + players[1].losses)
                          ).toFixed()}%`,
                          backgroundColor: "#CDA967",
                          display: "inline-block",
                          position: "absolute",
                        }}
                      ></span>
                    </div>
                  </div>
                </Link>
              )}

              <Outlet />
              {players[2] !== undefined && (
                <Link
                  to={`/players/${players[2].summonerName}`}
                  className={clsx(styles.card)}
                  style={{ gridColumn: "span 4" }}
                >
                  <div>
                    <h1 style={{ color: "#a37445", fontSize: "5em" }}>3</h1>
                    {icon2 !== undefined ? (
                      <>
                        <img
                          style={{ border: "#CDA967 5px solid" }}
                          src={icon2}
                          width={100}
                          alt=""
                        ></img>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div style={{}}>
                    <h1>{players[2].summonerName}</h1>
                    <h2>
                      <em style={{ marginRight: "1em", color: "#CDA967" }}>
                        Challenger
                      </em>
                      {players[2].leaguePoints} LP
                    </h2>
                    <h2>
                      <em style={{ marginRight: "1em", color: "#CDA967" }}>
                        {(
                          (players[2].wins * 100) /
                          (players[2].wins + players[2].losses)
                        ).toFixed()}
                        % wr
                      </em>
                      {players[2].wins + players[2].losses} games
                    </h2>
                    <div
                      style={{
                        height: "7.5px",
                        width: "100%",
                        backgroundColor: "var(--sgBackground)",
                        marginTop: "1em",
                        borderRadius: "5em",
                        position: "relative",
                      }}
                    >
                      <span
                        style={{
                          height: "7.5px",
                          width: `${(
                            (players[2].wins * 100) /
                            (players[2].wins + players[2].losses)
                          ).toFixed()}%`,
                          backgroundColor: "#CDA967",
                          display: "inline-block",
                          position: "absolute",
                        }}
                      ></span>
                    </div>
                  </div>
                </Link>
              )}
              <Outlet />
              {players[3] !== undefined && (
                <Link
                  to={`/players/${players[3].summonerName}`}
                  className={clsx(styles.card)}
                  style={{ gridColumn: "span 3" }}
                >
                  <div>
                    <h1 style={{ color: "var(--sgRed-50)", fontSize: "5em" }}>
                      4
                    </h1>
                    {icon3 !== undefined ? (
                      <>
                        <img
                          style={{ border: "#CDA967 5px solid" }}
                          src={icon3}
                          width={100}
                          alt=""
                        ></img>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div style={{}}>
                    <h1>{players[3].summonerName}</h1>
                    <h2>
                      <em style={{ marginRight: "1em", color: "#CDA967" }}>
                        Challenger
                      </em>
                      {players[3].leaguePoints} LP
                    </h2>
                    <h2>
                      <em style={{ marginRight: "1em", color: "#CDA967" }}>
                        {(
                          (players[3].wins * 100) /
                          (players[3].wins + players[3].losses)
                        ).toFixed()}
                        % wr
                      </em>
                      {players[3].wins + players[3].losses} games
                    </h2>
                    <div
                      style={{
                        height: "7.5px",
                        width: "100%",
                        backgroundColor: "var(--sgBackground)",
                        marginTop: "1em",
                        borderRadius: "5em",
                        position: "relative",
                      }}
                    >
                      <span
                        style={{
                          height: "7.5px",
                          width: `${(
                            (players[3].wins * 100) /
                            (players[3].wins + players[3].losses)
                          ).toFixed()}%`,
                          backgroundColor: "#CDA967",
                          display: "inline-block",
                          position: "absolute",
                        }}
                      ></span>
                    </div>
                  </div>
                </Link>
              )}

              <Outlet />
              {players[4] !== undefined && (
                <Link
                  to={`/players/${players[4].summonerName}`}
                  className={clsx(styles.card)}
                  style={{ gridColumn: "6/9" }}
                >
                  <div>
                    <h1 style={{ color: "var(--sgRed-50)", fontSize: "5em" }}>
                      5
                    </h1>
                    {icon4 !== undefined ? (
                      <>
                        <img
                          style={{ border: "#CDA967 5px solid" }}
                          src={icon4}
                          width={100}
                          alt=""
                        ></img>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div style={{}}>
                    <h1>{players[4].summonerName}</h1>
                    <h2>
                      <em style={{ marginRight: "1em", color: "#CDA967" }}>
                        Challenger
                      </em>
                      {players[4].leaguePoints} LP
                    </h2>
                    <h2>
                      <em style={{ marginRight: "1em", color: "#CDA967" }}>
                        {(
                          (players[4].wins * 100) /
                          (players[4].wins + players[4].losses)
                        ).toFixed()}
                        % wr
                      </em>
                      {players[4].wins + players[4].losses} games
                    </h2>
                    <div
                      style={{
                        height: "7.5px",
                        width: "100%",
                        backgroundColor: "var(--sgBackground)",
                        marginTop: "1em",
                        borderRadius: "5em",
                        position: "relative",
                      }}
                    >
                      <span
                        style={{
                          height: "7.5px",
                          width: `${(
                            (players[4].wins * 100) /
                            (players[4].wins + players[4].losses)
                          ).toFixed()}%`,
                          backgroundColor: "#CDA967",
                          display: "inline-block",
                          position: "absolute",
                        }}
                      ></span>
                    </div>
                  </div>
                </Link>
              )}
              <div
                className={styles.card}
                style={{
                  gridColumn: "4/6",
                  gridRow: "4",
                  backgroundColor: "var(--sgRed-500)",
                }}
              >
                <h1 style={{ whiteSpace: "normal" }}>
                  {hotStreaks === 0 ? (
                    <>No top 5 players on hotstreak</>
                  ) : (
                    <>{hotStreaks} out of 5 players on hotstreak</>
                  )}
                </h1>
              </div>
            </>
          )}
        </>
      </div>
    </div>
  );
};

export default Players;
