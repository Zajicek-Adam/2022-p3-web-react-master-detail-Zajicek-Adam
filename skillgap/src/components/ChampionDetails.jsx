import { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "../css/ChampionDetails.module.css";
import DataDragonService from "../services/dataDragonService";
import clsx from "clsx";

const ChampionDetails = () => {
  let { championName } = useParams();

  const [data, setData] = useState();

  const APICall = async () => {
    await DataDragonService.getChampionData(championName)
      .then((result) => {
        setData(Object.values(result)[0]); // Set champNames to the resolved value
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(data);
  };
  useEffect(() => {
    APICall();
  }, [championName]);

  return (
    <>
      {console.log(data)}
      {data !== undefined ? (
        <>
          <div className={styles.gridContainer}>
            <div
              className={clsx(styles.card, styles.imageCard)}
              style={{
                gridColumn: "span 3",
                gridRow: "span 4",
                backgroundImage: `url(${DataDragonService.getSplashArtUrl(
                  championName.charAt(0).toUpperCase() + championName.slice(1)
                )})`,
                backgroundSize: "cover",
              }}
            >
              <h1>{data !== undefined ? <>{data.name}</> : <></>}</h1>
              <h2>{data !== undefined ? <>{data.title}</> : <></>}</h2>
            </div>

            <div
              className={clsx(styles.card, styles.lore)}
              style={{ gridColumn: "span 3", gridRow: "span 3" }}
            >
              <p>{data !== undefined ? <>{data.lore}</> : <></>}</p>
            </div>

            <div className={styles.card} style={{ gridColumn: "span 2" }}>
              <p style={{ color: "var(--sgHighlight)" }}>
                {data !== undefined && data.allytips.length !== 0 ? (
                  <>{data.allytips[0]}</>
                ) : (
                  <>This champion has no allied tips</>
                )}
              </p>
            </div>

            <div className={styles.card}>
              <h2
                style={{
                  textTransform: "uppercase",
                  color: "var(--sgRed-300)",
                }}
              >
                {data !== undefined ? <>{data.tags[0]}</> : <></>}
              </h2>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.gridContainer}>
            <h1 style={{gridColumn: "2 / 6", gridRow: "2/4", display: "Flex", justifyContent: "center", alignItems: "center", fontSize: "3.5em", flexDirection: "column", gap: "1em"}}>Champion does not exist uwu &gt;~&lt; <Link to="/champions" className={styles.card} style={{fontSize: "0.75em", color: "var(--sgRed-500)", padding: "1em"}}>Back to champions</Link></h1>
          </div>
        </>
      )}
    </>
  );
};
export default ChampionDetails;
