import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ProtectedRoute from "./ProtectedRoute";
import MainPanel from "../pages/MainPanel";
import NotFound from "../pages/NotFound";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainPanel></MainPanel>
          </ProtectedRoute>
        }
      />
      <Route path="/home" element={<Home></Home>}></Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="*" element={<NotFound></NotFound>}></Route>
    </Routes>
  </Router>
);

export default AppRoutes;
