import "./App.css";
import { Outlet, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import logo from "./logo.png";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Divider, Tooltip } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: '#90caf9',
    },
  },
});

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="app-wrapper">
        <AppBar position="static">
          <Toolbar>
            {logo && <img src={logo} alt="logo" className="astroapi-logo" />}
            <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
            </Typography>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/planets">
              Planets
            </Button>
            <Button color="inherit" component={Link} to="/resources">
              Resources
            </Button>
            <Button color="inherit" component={Link} to="/gases">
              Gases
            </Button>
            <Button color="inherit" component={Link} to="/forms">
              Forms
            </Button>
          </Toolbar>
        </AppBar>
        <div className="content-wrapper">
          <Outlet />
        </div>
        <Divider />
        <footer className="footer">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} AstroAPI | Created by Barbora Kovalská and
            {/* hehe */}
            <Tooltip title="Žožo" placement="top" followCursor>
              <span className="žožo"> Martin </span>
            </Tooltip>
             Korotwitschka.
            <br />
            Our Github repository can be found <a href="https://github.com/Kkobarii/Astro-API">here</a>.
            <br />
            Image credit goes to the official Astroneer <a href="https://astroneer.fandom.com/wiki/Astroneer_Wiki">website</a>.
          </Typography>
        </footer>
      </div>
    </ThemeProvider>
  );
}
