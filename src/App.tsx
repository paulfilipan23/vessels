import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Graphs from "./pages/Graphs";
import Home from "./pages/Home";
import Vessel from "./pages/Vessel";

function App() {
  return (
    <Router>
      <div>
        <nav
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            padding: "10px",
            backgroundColor: "lightblue",
          }}
        >
          <Link to="/">Home</Link>
          <Link to="/graphs">Graphs</Link>
        </nav>

        <Routes>
          <Route path="/graphs" element={<Graphs />} />
          <Route path="/vessel/:vesselId" element={<Vessel />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
