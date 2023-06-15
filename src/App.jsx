import React, { useState, useEffect, Suspense, lazy } from "react";
import { Loader } from "./components";
import ErrorPage from "./components/ErrorPage/404Error";
import { Routes, Route } from "react-router-dom";
import GoToTop from "./components/Top/GoToTop";
import { Landing, Main, Navbar, Footer, AddButton } from "./components";
import SuspenseLoader from "./components/SuspenseLoader/SuspenseLoader";
const ShowCode = lazy(() => import("./components/ShowCode/ShowCode"));

const App = ({ modeToggleFunc, modeToggle }) => {
  const [loading, setLoading] = useState(false);
  const [toggleMode, setToggleMode] = useState(true);

  const routes = [
    {
      path: "/",
      element: (
        <div>
          <Landing modeToggle={toggleMode} modeToggleFunc={setToggleMode} />
          <Main modeToggle={toggleMode} modeToggleFunc={setToggleMode} />
        </div>
      ),
    },
    {
      path: "/show/:id",
      element: (
        <Suspense fallback={<SuspenseLoader />}>
          <ShowCode />
        </Suspense>
      ),
    },
    {
      path: "/add",
      element: <AddButton />,
    },
    {
      path: "*",
      element: <ErrorPage modeToggleFunc={modeToggle} />,
    },
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={`${toggleMode ? "dark" : "light"}`}>
          <Navbar modeToggle={toggleMode} modeToggleFunc={setToggleMode} />

          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
          <GoToTop />
          <Footer modeToggle={toggleMode} />
        </div>
      )}
    </>
  );
};

export default App;
