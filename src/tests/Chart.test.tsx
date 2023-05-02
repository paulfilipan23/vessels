import { render, screen } from "@testing-library/react";
import { Chart } from "../components/Chart";
import { IPortInfo } from "../interfaces";
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
describe("Chart", () => {
  test("not gonna be rendered", () => {
    render(<Chart sortedPorts={[]} />);
    expect(screen.queryByText("Times in each port")).not.toBeInTheDocument();
  });

  test("displays the correct data", () => {
    render(<Chart sortedPorts={sortedPorts} />);
    // to have a <canvas> element
    expect(screen.getByTestId("chartPortCalls")).toBeInTheDocument();
  });
});
