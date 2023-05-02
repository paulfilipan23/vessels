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
import { mapPortsToDataChartMinutes } from "../utils/utils";

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
      text: "Times in each port",
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
  sortedPorts: IPortInfo[];
}
export function Chart({ sortedPorts }: IProps) {
  return (
    <Bar
      data-testid="chartPortCalls"
      id="chartPortCalls"
      options={options}
      data={mapPortsToDataChartMinutes(sortedPorts)}
    />
  );
}
