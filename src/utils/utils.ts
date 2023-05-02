import { IPortInfo } from "../interfaces";

export function mapPortsToDataPercentile(portInfo: IPortInfo) {
  const labels =
    portInfo.percentiles &&
    Object.keys(portInfo.percentiles).map((key) => key + "th");
  const data =
    portInfo.percentiles &&
    Object.values(portInfo.percentiles).map((value) => value);
  return {
    labels,
    datasets: [
      {
        label: "Time in hours and minutes",
        data,
        backgroundColor: "#b3cde0",
      },
    ],
  };
}
export function mapPortsToDataChartMinutes(sortedPorts: IPortInfo[]) {
  const labels = sortedPorts.map((port) => port.name);

  const data = sortedPorts.map((port) => port.totalPortCallDurationInMinutes);
  return {
    labels,
    datasets: [
      {
        label: "Times in ports",
        data,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
}

export const calculatePercentiles = (portCallDurations: number[]) => {
  if (portCallDurations.length === 0) {
    return {
      5: 0,
      20: 0,
      50: 0,
      75: 0,
      90: 0,
    };
  }

  const sortedPortCallDurations = portCallDurations.sort((a, b) => a - b);

  const percentiles = [5, 20, 50, 75, 90];
  const n = sortedPortCallDurations.length;
  const percentileIndex = (percentile: number) => (percentile / 100) * n;
  const percentileValues = percentiles.map((percentile) => {
    const index = percentileIndex(percentile);
    //if index is not an integer, round up to the next integer
    if (index % 1 !== 0) {
      return sortedPortCallDurations[Math.ceil(index) - 1];
    } else {
      // add the value before and after the index and divide by 2
      return (
        (sortedPortCallDurations[index - 1] + sortedPortCallDurations[index]) /
        2
      );
    }
  });

  return {
    5: percentileValues[0],
    20: percentileValues[1],
    50: percentileValues[2],
    75: percentileValues[3],
    90: percentileValues[4],
  };
};
