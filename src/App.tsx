import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import { routes } from "./utils/routes/routes";
import Login from "./pages/Login/Login";
import CreateWorkout from "./pages/CreateWorkout/CreateWorkout";
import Signup from "./pages/Signup/Signup";
import ExercisePage from "./pages/ExercisePage/ExercisePage";

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
            path={routes.CREATE_WORKOUT}
            element={<CreateWorkout />}
          />
          <Route
            path={routes.SIGNUP}
            element={<Signup />}
          />
          <Route
            path={routes.LOGIN}
            element={<Login />}
          />
          <Route
            path={routes.ADD_EXERCISES}
            element={<ExercisePage />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
