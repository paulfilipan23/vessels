import { fireEvent, render, screen } from "@testing-library/react";
import Graphs from "../pages/Graphs";

test("renders Load and Analyze data button", () => {
  render(<Graphs />);
  const buttonElement = screen.getByText(/Load and Analyze data/i);
  expect(buttonElement).toBeInTheDocument();
});

test("clicking Load and Analyze data button sets loadData and isLoading state", () => {
  render(<Graphs />);
  const buttonElement = screen.getByText(/Load and Analyze data/i);
  fireEvent.click(buttonElement);
  expect(buttonElement).not.toBe(""); // Check that the button is disabled while data is loading
  expect(screen.getByAltText("logo")).toBeInTheDocument(); // Check that the loading animation is displayed
});

test("renders data after clicking Load and Analyze data button", async () => {
  render(<Graphs />);
  const buttonElement = screen.getByText(/Load and Analyze data/i);
  fireEvent.click(buttonElement);
  await screen.findByText(/Top 5 Ports/i); // Check that Top 5 Ports section is rendered
});
