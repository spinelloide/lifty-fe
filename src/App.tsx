import "./App.css";
import "./styles/toast.css";
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
import React from "react";
import authServices from "./services/AuthServices";
import ChatToTrainer from "./components/ChatToTrainer";
import { useToastConfig } from "./hooks/useToastConfig";

function App() {
  const authData = authServices.getLoginData();
  const toastConfig = useToastConfig();

  return (
    <React.Fragment>
      <Router>
        <Layout>
          <ToastContainer
            position={toastConfig.position}
            autoClose={toastConfig.autoClose}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            style={toastConfig.style}
            className={toastConfig.className}
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
          {authData?.token && (
            <div className="absolute bottom-4 right-4">
              <ChatToTrainer />
            </div>
          )}
        </Layout>
      </Router>
    </React.Fragment>
  );
}

export default App;
