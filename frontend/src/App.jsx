import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Submit from "./Submit";
import Dashboard from "./Dashboard";
import Detail from "./Detail";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <h1>AI Startup Idea Validator</h1>

        <nav>
          <Link to="/" style={{ marginRight: 20 }}>
            Submit Idea
          </Link>
          <Link to="/dashboard">
            Dashboard
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<Submit />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ideas/:id" element={<Detail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;