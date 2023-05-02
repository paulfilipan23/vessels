import { IPortInfo } from "../interfaces";
import {
  calculatePercentiles,
  mapPortsToDataChartMinutes,
  mapPortsToDataPercentile,
} from "../utils/utils";
const sortedPorts: IPortInfo[] = [
  {
    name: "Port A",
    totalPortCalls: 1,
    nonOmittedPortCalls: 1,
    omittedPortCalls: 0,
    totalPortCallDurationInMinutes: 60,
    portCallDurationsMinutes: [60],
    percentiles: {
      5: 60,
      20: 60,
      50: 60,
      75: 60,
      90: 60,
    },
    totalPortCallDuration: "1h 0m or 60m",
  },
  {
    name: "Port B",
    totalPortCalls: 1,
    nonOmittedPortCalls: 1,
    omittedPortCalls: 0,
    totalPortCallDurationInMinutes: 120,
    portCallDurationsMinutes: [120],
    percentiles: {
      5: 120,
      20: 120,
      50: 120,
      75: 120,
      90: 120,
    },
    totalPortCallDuration: "2h 0m or 120m",
  },
  {
    name: "Port C",
    totalPortCalls: 2,
    nonOmittedPortCalls: 2,
    omittedPortCalls: 0,
    totalPortCallDurationInMinutes: 180,
    portCallDurationsMinutes: [60, 120],
    percentiles: {
      5: 60,
      20: 60,
      50: 60,
      75: 120,
      90: 120,
    },
    totalPortCallDuration: "3h 0m or 180m",
  },
];
describe("calculatePercentiles", () => {
  it("should return object with all values as 0 when given an empty array", () => {
    expect(calculatePercentiles([])).toEqual({
      5: 0,
      20: 0,
      50: 0,
      75: 0,
      90: 0,
    });
  });

  it("should correctly calculate percentiles when given an array of port call durations", () => {
    const durations = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    console.log("calculate, percentiles", calculatePercentiles(durations));
    expect(calculatePercentiles(durations)).toEqual({
      5: 10,
      20: 25,
      50: 55,
      75: 80,
      90: 95,
    });
  });
});

describe("mapPortsToDataPercentile", () => {
  it("should return correct data when given a port with percentiles", () => {
    const port: IPortInfo = {
      name: "Port A",
      nonOmittedPortCalls: 10,
      omittedPortCalls: 0,
      portCallDurationsMinutes: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
      totalPortCallDurationInMinutes: 550,
      totalPortCalls: 10,
      percentiles: {
        5: 10,
        20: 25,
        50: 55,
        75: 80,
        90: 95,
      },
    };
    expect(mapPortsToDataPercentile(port)).toEqual({
      labels: ["5th", "20th", "50th", "75th", "90th"],
      datasets: [
        {
          label: "Time in hours and minutes",
          data: [10, 25, 55, 80, 95],
          backgroundColor: "#b3cde0",
        },
      ],
    });
  });

  it("should return correct data when given a port without percentiles", () => {
    const port: IPortInfo = {
      name: "Port A",
      nonOmittedPortCalls: 0,
      omittedPortCalls: 0,
      portCallDurationsMinutes: [],
      totalPortCallDurationInMinutes: 0,
      totalPortCalls: 0,
      percentiles: {
        5: 0,
        20: 0,
        50: 0,
        75: 0,
        90: 0,
      },
    };
    expect(mapPortsToDataPercentile(port)).toEqual({
      labels: ["5th", "20th", "50th", "75th", "90th"],
      datasets: [
        {
          label: "Time in hours and minutes",
          data: [0, 0, 0, 0, 0],
          backgroundColor: "#b3cde0",
        },
      ],
    });
  });
});

describe("mapPortsToDataChartMinutes", () => {
  it("should correctly map port data to chart data", () => {
    expect(mapPortsToDataChartMinutes(sortedPorts)).toEqual({
      labels: ["Port A", "Port B", "Port C"],
      datasets: [
        {
          label: "Times in ports",
          data: [60, 120, 180],
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    });
  });

  it("should return undefined data when given empty port data", () => {
    const ports: IPortInfo[] = [];
    expect(mapPortsToDataChartMinutes(ports)).toEqual({
      labels: [],
      datasets: [
        {
          label: "Times in ports",
          data: [],
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    });
  });
});
