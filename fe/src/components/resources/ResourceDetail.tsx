import { NavLink, Outlet, useLoaderData, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { response } from "express";
import "../../App.css";
import {
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../styled/StyledTable";

const Url = process.env.REACT_APP_BACKEND_URL;

export function loader({ params }: any) {
  const resourceUrl =
    Url + "/resources/" + params.resourceId + "?include=planets";

  // Fetch resource data
  return fetch(resourceUrl)
    .then((response) => response.json())
    .then((resourceData) => {
      const planetIds = resourceData.planets.map(
        (resource: any) => resource.planetId
      );

      // Fetch planets associated with the resource
      const planetPromises = planetIds.map((planetId: any) =>
        fetch(Url + "/planets/" + planetId).then((response) => response.json())
      );

      // Wait for all promises to resolve
      return Promise.all(planetPromises).then((planets) => {
        // add resource.location to each planet
        planets.forEach((planet: any) => {
          const location = resourceData.planets.find(
            (p: any) => p.planetId === planet.id
          );
          planet.location = location.location;
        });

        return {
          resource: resourceData,
          planets: planets,
        };
      });
    });
}

export function ResourceDetail() {
  // @ts-ignore
  const { resource, planets } = useLoaderData();

  return (
    <div className="detail">
      <Stack direction="row">
        <Container>
          <Typography variant="h2" gutterBottom className="name">
            {resource.name}
          </Typography>
          <Typography variant="body1" className="description">
            {resource.description}
          </Typography>
        </Container>
        <div>
          <img src={resource.imageUrl} alt={resource.name} className="image" />
          <div style={{ marginBottom: "20px" }}>
            <div className="infos">
              <h3>Byte Value:</h3>
              <p>{resource.byteValue}</p>
            </div>
            <div className="infos">
              <h3>Scrap Value:</h3>
              <p>{resource.scrapValue}</p>
            </div>
            <div className="infos">
              <h3>Smelts Into:</h3>
              <p>{resource.smeltsInto}</p>
            </div>
          </div>
        </div>
      </Stack>
      <Divider />

      <Stack textAlign="left">
        {planets && planets.length > 0 && (
          <Container>
            <Typography variant="h4" gutterBottom style={{ marginTop: "1em" }}>
              Planets:
            </Typography>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>Location</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {planets.map((planet: any) => (
                    <StyledTableRow key={planet.id}>
                      <StyledTableCell>
                        <Button
                          component={NavLink}
                          to={`/planets/${planet.id}`}
                        >
                          <img
                            src={planet.iconUrl}
                            alt={planet.name}
                            className="icon"
                          />
                          <p className="icon-name">{planet.name}</p>
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell>{planet.location}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        )}
      </Stack>
    </div>
  );
}
