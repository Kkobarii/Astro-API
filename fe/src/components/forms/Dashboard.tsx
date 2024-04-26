import PlanetDashboard from "./Planets";
import React from "react";
import { useState, useEffect } from "react";
import { Planet } from "../../misc/interfaces";
import { url } from "inspector";
import { Button } from "@mui/material";
import {
  Outlet,
  Link,
  Route,
  HistoryRouterProps,
  useNavigate,
} from "react-router-dom";
import { EditPlanet } from "./EditPlanet";

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

  const onUpdate = (id: number) => {
    console.log("Update planet with id: " + id);
    console.log("Redirecting to edit planet form");
    //routeChange();
    //return <EditPlanet id={id} />;
    return <Link to={"/creators/edit-planet/" + id} />;
  };

  return (
    <div>
      <h1>Welcome to AstroAPI Editor</h1>
      <Button component={Link} to="/creators/new-planet">
        Add new planet
      </Button>
      <PlanetDashboard
        planets={planets}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    </div>
  );
};
