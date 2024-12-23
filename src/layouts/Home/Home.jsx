import React, { useContext, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Route, Routes, useNavigate } from "react-router-dom";
import { routes } from "../../routes";
import { AuthContext } from "../../context/AuthContext";
import "./Home.css";

function Home() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/auth/login");
    }
  }, []);

  return (
    <div className="homeContainer">
      <div className="sidebarContainerHome">
        <Sidebar />
      </div>
      <div className="pagesContainerHome">
        <Routes>
          {routes?.map((route, index) => (
            <Route key={index} path={route.path} element={route.element}>
              {/* Render nested routes */}
              {route.children &&
                route.children.map((childRoute, childIndex) => (
                  <Route
                    key={childIndex}
                    path={`${childRoute.path}`}
                    element={childRoute.element}
                  />
                ))}
            </Route>
          ))}
        </Routes>
      </div>
    </div>
  );
}

export default Home;
