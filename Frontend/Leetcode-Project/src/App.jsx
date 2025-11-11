import { Routes, Route, Navigate } from "react-router";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Homepage from "./component/Homepage";
import AdminPage from "./component/AdminPage";
import { authUser } from "./utils/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading, user } = useSelector(
    (state) => state?.auth
  );

  console.log(user);

  useEffect(() => {
    dispatch(authUser());
    console.log("fetchUser");
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Homepage /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        ></Route>
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/" /> : <Signup />}
        ></Route>
        <Route
          path="/admin"
          element={user?.role === "role" ? <Navigate to="/" /> : <AdminPage />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
