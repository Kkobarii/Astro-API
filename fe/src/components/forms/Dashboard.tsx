import React from "react";
import { useState, useEffect } from "react";
import { Planet } from "../../misc/interfaces";
import { url } from "inspector";
import {
  Button, Container, Stack,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  Outlet,
  Link,
  Route,
  HistoryRouterProps,
  useNavigate,
} from "react-router-dom";
import { EditPlanet } from "./EditPlanet";
import PlanetDashboard from "./Planets";
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';

let BaseUrl = process.env.REACT_APP_BACKEND_URL;

function loader() {
  let url = BaseUrl + "/planets";

  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return {
        planets: data.items,
      };
    });
}

export const DashboardHome = () => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [loading, setLoading] = useState(true);
  const Url = process.env.REACT_APP_BACKEND_URL + "/planets?pageSize=-1";

  useEffect(() => {
    fetch(Url)
      .then((response) => response.json())
      .then((data) => {
        setPlanets(data.items);
        setLoading(false);
      });
  }, []);

  const onDelete = (id: number) => {
    const newPlanets = planets.filter((planet) => planet.id !== id);
    setPlanets(newPlanets);
    let url = BaseUrl + "/planets/" + id;
    fetch(url, {
      method: "DELETE",
    });
  };

  return (
    <Container>
      <Stack direction="row" spacing={2} style={{justifyContent: 'space-between', margin:'20px'}}>
      <h1>Welcome to AstroAPI Editor</h1>
      
      <Button component={Link} to="/creators/new-planet"
                  variant="contained"
                  color="success">
        Add new planet
      </Button>
      </Stack>
      <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Size</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {planets.map((planet) => (
            <TableRow key={planet.id}>
              <TableCell style={{ display: "flex" }}>
                <img src={planet.iconUrl} alt={planet.name} className="icon" />
                <p className="icon-name">{planet.name}</p>
              </TableCell>
              <TableCell>{planet.type}</TableCell>
              <TableCell>{planet.size}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="info"
                  component={Link}
                  to={`/creators/edit-planet/${planet.id}`}
                  style={{ marginRight: "1em" }}
                >
                  Update
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    Confirm.show("Delete Planet", `Are you sure you want to delete ${planet.name}?`, "Yes", "No", () => {
                      onDelete(planet.id);
                    });
                  }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
};
