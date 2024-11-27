import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "../css/Champions.module.css";
import DataDragonService from "../services/dataDragonService";

const Champions = () => {
  //FREE ROTACE TADY

  const [freeChamps, setFreeChamps] = useState([]);

  const [champNames, setChampNames] = useState({});

  const [version, setVersion] = useState("");

  const APICall = async () => {
    let APICallString = `http://localhost:4000/getChampions`;

    await axios
      .get(APICallString)
      .then(function (response) {
        setFreeChamps(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    await DataDragonService.getChampions()
      .then((result) => {
        setChampNames(result); // Set champNames to the resolved value
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(champNames);
  };

  useEffect(() => {
    APICall();
  }, []);

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className={styles.container}>
          <h1 style={{ gridColumn: "1/-1" }}>Free Champion Rotation</h1>
          {Object.values(champNames).map((element, index) => (
            <>
              {Object.values(element).map((champ, champIndex) => (
                <>
                  <Outlet />

                  {freeChamps.includes(Number(champ.key)) && (
                    <Link
                      to={`/champions/${champ.id}`}
                      className={styles.championCard}
                      style={{
                        backgroundImage: `url(${DataDragonService.getSplashArtUrl(
                          champ.id
                        )})`,
                      }}
                    >
                      <h1>{champ.name}</h1>
                      <h2>{champ.title}</h2>
                    </Link>
                  )}
                </>
              ))}
            </>
          ))}
        </div>

        <div className={styles.container}>
          <h1 style={{ gridColumn: "1/-1" }}>All champions</h1>
          {Object.values(champNames).map((element, index) => (
            <>
              {Object.values(element).map((champ, champIndex) => (
                <>
                  <Outlet />
                  {champ.id != undefined && (
                    <Link
                      to={`/champions/${champ.id}`}
                      className={styles.championCard}
                      style={{
                        backgroundImage: `url(${DataDragonService.getSplashArtUrl(
                          champ.id
                        )})`,
                      }}
                    >
                      <h1>{champ.name}</h1>
                      <h2>{champ.title}</h2>
                    </Link>
                  )}
                </>
              ))}
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default Champions;
