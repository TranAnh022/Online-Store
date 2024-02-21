import { useCallback, useEffect, useState } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoadingComponent from "./components/loading/LoadingComponent";
import Header from "./components/header/Header";
import { useAppDispatch, useAppSelector } from "./redux/configureStore";
import { fetchCurrentUser } from "./redux/actions/userActions";
import { createCustomTheme } from "./customizedCSS";

function App() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? "dark" : "light";

  const dispatch = useAppDispatch();
  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]);

  if (loading) return <LoadingComponent message="Initializing app..." />;

  return (
    <ThemeProvider theme={createCustomTheme(paletteType)}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <Outlet />
    </ThemeProvider>
  );
}

export default App;
