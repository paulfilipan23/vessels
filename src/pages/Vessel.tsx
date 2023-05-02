import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PortCall } from "../components/PortCall";
import { IVesselPortCalls } from "../interfaces";
import { loadVessel } from "../service";

function Vessel() {
  const { vesselId } = useParams();
  const [vesselInformation, setVesselInformation] =
    useState<IVesselPortCalls>();
  useEffect(() => {
    if (!vesselId) return;
    loadVessel(Number(vesselId)).then((data) => {
      setVesselInformation(data);
    });
  }, [vesselId]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "1.5rem",
      }}
    >
      <h3>Vessel - {vesselInformation?.vessel.name}</h3>

      {vesselInformation && (
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
          {vesselInformation.portCalls.map((portCall, index) => (
            <PortCall portCall={portCall} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Vessel;
