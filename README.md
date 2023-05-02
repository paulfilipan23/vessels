# Vessels App

This is a web application that allows you to load all vessels and view their port calls. It also displays graphs for various port call statistics.

## Installation

To run the project, you must have Node.js installed on your computer. First, open a terminal and navigate to the project directory. Then run the following commands:

### `npm start`

### `npm ci`

This will install the required dependencies and start the server.

## Usage

Once the server is running, you can navigate to `http://localhost:3000` in your browser to access the app. There are two pages in the app:

### Home Page

The home page has a button that loads all the vessels. Once the vessels are loaded, you can click on one of the cards to view the list of all port calls for that vessel, with some information for each portcall.

### Graphs Page

The graphs page displays various graphs for port call statistics:

- Top 5 Ports
- Bottom 5 Ports
- Graph of ports with the most port calls in minutes sorted by number of total port calls
- Chart displaying the ports sorted by total minutes
- List of port calls sorted by port call duration time

## Testing

You can run the tests for the app by running the following command:

### `npm run test`

This will run all the tests for the app and display the results in the terminal.
