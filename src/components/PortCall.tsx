import "../App.css";
import { ShippingData } from "../interfaces";
interface IProps {
  portCall: ShippingData;
  index: number;
}

export function PortCall({ portCall, index }: IProps) {
  return (
    <div
      style={{
        padding: "10px",
        border: "1px solid black",
        borderRadius: "5px",
        margin: "10px",
        width: "300px",
        height: "fit-content",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "start",
        cursor: "pointer",
        backgroundColor: "lightpink",
      }}
    >
      <h5 className="smaller-padding">Port Call {index + 1}</h5>
      <p className="smaller-padding">
        <strong>Arrival:</strong> {new Date(portCall.arrival).toLocaleString()}
      </p>
      <p className="smaller-padding">
        <strong>Departure:</strong>{" "}
        {new Date(portCall.departure).toLocaleString()}
      </p>
      <p className="smaller-padding">
        <strong>Port Name:</strong> {portCall.port.name}
      </p>
      <p className="smaller-padding">
        <strong>Is Omitted:</strong>{" "}
        {portCall.isOmitted ? "omitted" : "not omitted"}
      </p>
      <p className="smaller-padding">
        <strong>Service:</strong> {portCall.service}
      </p>
    </div>
  );
}
