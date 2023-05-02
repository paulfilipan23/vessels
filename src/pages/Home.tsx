import { useEffect, useState } from "react";
import "../App.css";
import { IVessel } from "../interfaces";
import logo from "../logo.svg";
import { loadVessels } from "../service";
import { VesselCard } from "../VesselCard";

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadData, setLoadData] = useState(false);
  const [vessels, setVessels] = useState<IVessel[]>();
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  useEffect(() => {
    if (loadData) {
      loadVessels().then((data) => {
        setVessels(data);
        setDataIsLoaded(true);
        setIsLoading(false);
      });
    }
  }, [loadData]);
  return (
    <div className="App-header">
      {isLoading && <img src={logo} className="App-logo" alt="logo" />}
      {dataIsLoaded && <h1>Loaded vessels</h1>}

      {!dataIsLoaded && (
        <button
          style={{
            padding: "10px 20px",
            fontSize: "20px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "green",
            color: "white",
            cursor: "pointer",
          }}
          onClick={() => {
            setLoadData(true);
            setIsLoading(true);
          }}
        >
          Load vessels
        </button>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {vessels?.map((vessel: IVessel) => (
          <VesselCard name={vessel.name} imo={vessel.imo} />
        ))}
      </div>
    </div>
  );
}

export default Home;
