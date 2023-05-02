import { useNavigate } from "react-router-dom";
import { IVessel } from "./interfaces";

export function VesselCard({ name, imo }: IVessel) {
  const navigate = useNavigate();
  return (
    <div
      style={{
        padding: "10px",
        border: "1px solid black",
        borderRadius: "5px",
        margin: "10px",
        width: "200px",
        height: "100px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        backgroundColor: "lightblue",
      }}
      onClick={() => {
        navigate(`/vessel/${imo}`);
      }}
    >
      <h4
        style={{
          margin: "5px",
          fontSize: "1.5rem",
        }}
      >
        {name}
      </h4>
      <h5
        style={{
          margin: "5px",
          fontSize: "1.5rem",
        }}
      >
        {imo}
      </h5>
    </div>
  );
}
