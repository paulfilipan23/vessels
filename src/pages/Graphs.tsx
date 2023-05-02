import { useEffect, useState } from "react";
import "../App.css";
import { Chart } from "../components/Chart";
import { Percentile } from "../components/Percentile";
import { PortInfo } from "../components/PortInfo";
import { IPortInfo } from "../interfaces";
import logo from "../logo.svg";
import { topFiveAndBottomFivePorts } from "../utils/loadAllVessels";

function Graphs() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadData, setLoadData] = useState(false);
  const [topPorts, setTopPorts] = useState<IPortInfo[]>();
  const [bottomPorts, setBottomPorts] = useState<IPortInfo[]>();
  const [dataIsLoaded, setDataIsLoaded] = useState(false);
  const [sortedPorts, setSortedPorts] = useState<IPortInfo[]>();
  const [sortedPortsByOmmitedPortCalls, setSortedPortsByOmmitedPortCalls] =
    useState<IPortInfo[]>();

  useEffect(() => {
    if (loadData) {
      topFiveAndBottomFivePorts().then((data) => {
        console.log("data", data);
        setTopPorts(data.topFivePorts);
        setBottomPorts(data.bottomFivePorts);
        setSortedPorts(data.sortedPorts);
        setSortedPortsByOmmitedPortCalls(data.sortedPortsByNonOmmitedPortCalls);
        // console.log("sortedPorts", data.sortedPorts);
        // setTopVessels(data);
        setDataIsLoaded(true);
        setIsLoading(false);
      });
    }
  }, [loadData]);
  return (
    <div className="App-header">
      {isLoading && <img src={logo} className="App-logo" alt="logo" />}

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
            setTimeout(() => {
              setIsLoading(false);
            }, 2000);
          }}
        >
          Load and Analyze data
        </button>
      )}
      {topPorts && (
        <>
          <h3>Top 5 Ports</h3>
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
            {topPorts?.map((port: IPortInfo, index) => (
              <PortInfo port={port} index={index} />
            ))}
          </div>
        </>
      )}
      {bottomPorts && (
        <>
          <h3>Bottom 5 Ports</h3>
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
            {bottomPorts?.map((port: IPortInfo, index) => (
              <PortInfo port={port} index={index} />
            ))}
          </div>
        </>
      )}

      {sortedPortsByOmmitedPortCalls && (
        <>
          <h3>Chart of ports with the most port calls</h3>
          <Chart sortedPorts={sortedPortsByOmmitedPortCalls} />
        </>
      )}
      {sortedPorts && (
        <>
          <h3>Chart of minutes in each port</h3>
          <Chart sortedPorts={sortedPorts} />
        </>
      )}
      {sortedPorts && sortedPorts.length && (
        <>
          <h3>List of port calls sorted by port call duration time</h3>
          {sortedPorts.map((port) => (
            <Percentile portInfo={port} />
          ))}
        </>
      )}
    </div>
  );
}

export default Graphs;
