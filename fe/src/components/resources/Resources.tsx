import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Link, NavLink } from "react-router-dom";
import { Outlet, useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../App.css";

import { Resource } from "../../misc/interfaces";

const Url = process.env.REACT_APP_BACKEND_URL + "/resources";

export function loader() {
  console.log(Url);
  return fetch(Url)
    .then((response) => response.json())
    .then((data) => {
      return {
        resources: data.items,
      };
    });
}

export function Resources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const Url = process.env.REACT_APP_BACKEND_URL + "/resources?pageSize=7";

  useEffect(() => {
    fetch(Url)
      .then((response) => response.json())
      .then((data) => {
        setResources(data.items);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "20%", maxWidth: "15em" }}>
        <List
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          {resources.map((resource) => (
            // <ListItem />
            <ListItem
              key={resource.id}
              // @ts-ignore
              button
              to={`/resources/${resource.id}`}
              component={NavLink}
              // @ts-ignore
              style={({ isActive }) =>
                isActive
                  ? { backgroundColor: "lightgray" }
                  : { backgroundColor: "white" }
              }
            >
              <ListItemAvatar>
                <Avatar
                  style={{
                    backgroundColor: "white",
                    width: "50px",
                    height: "50px",
                  }}
                >
                  <img
                    src={resource.iconUrl}
                    alt={resource.name}
                    className="icon"
                  />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={resource.name}
                style={{ marginLeft: "20px" }}
              />
            </ListItem>
          ))}
        </List>
      </div>
      <div style={{ width: "80%", marginLeft: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
}
