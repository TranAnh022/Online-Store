import { useCallback, useEffect, useMemo, useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingComponent from "./components/loading/LoadingComponent";
import Header from "./components/header/Header";
import { useAppDispatch } from "./redux/configureStore";
import { fetchCurrentUser } from "./redux/actions/userActions";
import { customTheme } from "./customizedCSS";
import { ColorModeContext } from "./components/contextAPI/ThemeColorProvider.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<"light" | "dark">("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  const theme = useMemo(() => customTheme(mode), [mode]);
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
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <GoogleOAuthProvider
          clientId={`502815919430-o2epc1d7a2otsdvie0n6gt77hnrss8jp.apps.googleusercontent.com`}
        >
          <ToastContainer
            position="bottom-right"
            hideProgressBar
            theme="colored"
          />
          <CssBaseline />
          <Header />
          <Outlet />
        </GoogleOAuthProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
