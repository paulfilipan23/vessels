import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { IPortInfo } from "../interfaces";
import { mapPortsToDataPercentile } from "../utils/utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Percentile",
    },
    tooltip: {
      callbacks: {
        label: function (context: any) {
          let label = context.dataset.label || "";

          if (label) {
            label += ": ";
          }
          if (context.parsed.y !== null) {
            //transfor in hours and minutes
            const hours = Math.floor(context.parsed.y / 60);
            const minutes = context.parsed.y % 60;
            label += `${hours}h ${minutes}m or ${context.parsed.y}m`;
          }
          return label;
        },
      },
    },
  },
};

interface IProps {
  portInfo: IPortInfo;
}
export function Percentile({ portInfo }: IProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "center",
        gap: "10px",
        width: "100%",
        height: 300,
      }}
    >
      <h5>{portInfo.name}</h5>
      <Bar options={options} data={mapPortsToDataPercentile(portInfo)} />
    </div>
  );
}
