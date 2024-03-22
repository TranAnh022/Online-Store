import { useCallback, useEffect, useMemo, useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingComponent from "./components/loading/LoadingComponent";
import Header from "./components/header/Header";
import { useAppDispatch } from "./redux/configureStore";
import { fetchCurrentUser } from "./redux/actions/userActions";
import { customTheme } from "./customizedCSS";
import { ColorModeContext } from "./components/contextAPI/ThemeColorProvider.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { setCart } from "./redux/slices/cartSlice";

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

      const cartPersist = localStorage.getItem("cart") ;
      if (cartPersist !== null) {
        await dispatch(setCart(JSON.parse(cartPersist)));
      }
    } catch (error:any) {
      toast.error(error);
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
          clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
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
