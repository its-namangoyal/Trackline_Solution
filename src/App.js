import "./App.css";
import { authRoutes } from "./routes";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import Home from "./layouts/Home/Home";
import { SnackbarProvider } from "notistack";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("auth/login");
    }
  }, []);

  return (
    <>
      {/* check if the user is logged in or not */}
      <SnackbarProvider />
      {auth.currentUser ? (
        <Home />
      ) : (
        <Routes>
          {authRoutes?.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={route.element}
            ></Route>
          ))}
        </Routes>
      )}
    </>
  );
}

export default App;
