import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Link, NavLink } from "react-router-dom";
import { Outlet, useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../App.css";

const Url = "http://localhost:4000/planets";

export function loader() {
  return fetch(Url)
    .then((response) => response.json())
    .then((data) => {
      return {
        planets: data.items,
      };
    });
}

interface Planet {
  id: string;
  name: string;
  iconUrl: string;
  [key: string]: any; // for any other properties that a planet might have
}


export function Planets() {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [loading, setLoading] = useState(true);
  const Url = 'http://localhost:4000/planets?pageSize=-1';

  useEffect(() => {
    fetch(Url)
      .then((response) => response.json())
      .then((data) => {
        setPlanets(data.items);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "20%", maxWidth: "15em" }}>
        <List style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          {planets.map((planet) => (
            // <ListItem />
            <ListItem
              key={planet.id}
              // @ts-ignore
              button
              to={`/planets/${planet.id}`}
              component={NavLink}
              // @ts-ignore
              style={({isActive}) => isActive ? {backgroundColor: 'lightgray'} : {backgroundColor: 'white'}}
            >
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: "white", width: "50px", height: "50px" }}>
                  <img src={planet.iconUrl} alt={planet.name} className="planet-icon" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={planet.name} style={{ marginLeft: "20px"}} />
            </ListItem>
          ))}
        </List>
      </div>
      <div style={{ width: "80%", marginLeft: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
};
