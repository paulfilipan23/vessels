import "../App.css";
import { IPortInfo } from "../interfaces";
interface IProps {
  port: IPortInfo;
  index: number;
}

export function PortInfo({ port, index }: IProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "start",
        border: "1px solid black",
        padding: "10px",
        borderRadius: "5px",
        backgroundColor: "lightblue",
        width: "fit-content",
        height: "fit-content",
        margin: "10px",
      }}
    >
      <h5 className="smaller-padding">Place: {index + 1}</h5>
      <p className="smaller-padding">
        <strong>Port name: </strong>
        {port.name}
      </p>
      <p className="smaller-padding">
        {" "}
        <strong>Port total calls: </strong>
        {port.totalPortCalls}
      </p>
      <p className="smaller-padding">
        {" "}
        <strong>Port non omitted: </strong>
        {port.nonOmittedPortCalls}
      </p>
      <p className="smaller-padding">
        {" "}
        <strong>Port omitted: </strong>
        {port.omittedPortCalls}
      </p>
    </div>
  );
}
