import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Link, NavLink } from "react-router-dom";
import { Outlet, useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../App.css";

const Url = "http://localhost:4000/gases";

export function loader() {
  return fetch(Url)
    .then((response) => response.json())
    .then((data) => {
      return {
        gases: data.items,
      };
    });
}

interface Gas {
  id: string;
  name: string;
  iconUrl: string;
  [key: string]: any; // for any other properties that a gas might have
}


export function Gases() {
  const [gases, setGases] = useState<Gas[]>([]);
  const [loading, setLoading] = useState(true);
  const Url = 'http://localhost:4000/gases?pageSize=7';

  useEffect(() => {
    fetch(Url)
      .then((response) => response.json())
      .then((data) => {
        setGases(data.items);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "20%", maxWidth: "15em" }}>
        <List style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          {gases.map((gas) => (
            // <ListItem />
            <ListItem
              key={gas.id}
              // @ts-ignore
              button
              to={`/gases/${gas.id}`}
              component={NavLink}
              // @ts-ignore
              style={({isActive}) => isActive ? {backgroundColor: 'lightgray'} : {backgroundColor: 'white'}}
            >
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: "white", width: "50px", height: "50px" }}>
                  <img src={gas.iconUrl} alt={gas.name} className="icon" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={gas.name} style={{ marginLeft: "20px"}} />
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
