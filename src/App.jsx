import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme/theme";

function App() {
  return (
    <>
    <ThemeProvider theme={theme}>
      <RouterProvider router={routes}/>
    </ThemeProvider>
    </>
  );
}

export default App;
