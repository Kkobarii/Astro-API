import PlanetDashboard from "./Planets";
import React from "react";
import { useState, useEffect } from "react";
import { Planet } from "../../misc/interfaces";
import { url } from "inspector";
import { Button } from "@mui/material";
import { Outlet, Link } from "react-router-dom";

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
    <div>
      <h1>Welcome to AstroAPI Editor</h1>
      <Button component={Link} to="/creators/new-planet">
        Add new planet
      </Button>
      <PlanetDashboard
        planets={planets}
        onDelete={onDelete}
        onUpdate={loader}
      />
    </div>
  );
};
