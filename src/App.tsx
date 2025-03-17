import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import { routes } from "./utils/routes/routes";
import Login from "./pages/Login/Login";

function App() {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route
            path={routes.HOME}
            element={<Home />}
          />
          <Route
            path={routes.ABOUT}
            element={<About />}
          />
          <Route
            path={routes.LOGIN}
            element={<Login />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
