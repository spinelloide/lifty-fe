import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import { routes } from "./utils/routes";
import Login from "./pages/Login/Login";
import CreateWorkout from "./pages/CreateWorkout/CreateWorkout";
import Signup from "./pages/Signup/Signup";
import ExercisePage from "./pages/ExercisePage/ExercisePage";
import PrivateRoute from "./components/PrivateRoute";
import StartWorkout from "./pages/StartWorkout/StartWorkout";
import Layout from "./components/Layout";

function App() {
  return (
    <div className="">
      <Router>
        <Layout>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Routes>
            <Route
              path={routes.HOME}
              element={<PrivateRoute element={<Home />} />}
            />
            <Route path={routes.ABOUT} element={<About />} />
            <Route
              path={routes.CREATE_WORKOUT}
              element={<PrivateRoute element={<CreateWorkout />} />}
            />
            <Route path={routes.SIGNUP} element={<Signup />} />
            <Route path={routes.LOGIN} element={<Login />} />
            <Route
              path={routes.ADD_EXERCISES}
              element={<PrivateRoute element={<ExercisePage />} />}
            />
            <Route
              path={`${routes.START_WORKOUT}/:id`}
              element={<PrivateRoute element={<StartWorkout />} />}
            />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
