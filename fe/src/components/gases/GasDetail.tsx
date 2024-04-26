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
  const gasUrl = Url + "/gases/" + params.gasId + "?include=planets";

  // Fetch gas data
  return fetch(gasUrl)
    .then((response) => response.json())
    .then((gasData) => {
      const planetIds = gasData.planets.map((gas: any) => gas.planetId);

      // Fetch planets associated with the gas
      const planetPromises = planetIds.map((planetId: any) =>
        fetch(Url + "/planets/" + planetId).then((response) => response.json())
      );

      // Wait for all promises to resolve
      return Promise.all(planetPromises).then((planets) => {
        // add gas.partsPerUnit to each planet
        planets.forEach((planet: any) => {
          const partsPerUnit = gasData.planets.find(
            (p: any) => p.planetId === planet.id
          );
          planet.partsPerUnit = partsPerUnit.partsPerUnit;
        });
        planets.sort((a: any, b: any) => b.partsPerUnit - a.partsPerUnit);

        return {
          gas: gasData,
          planets: planets,
        };
      });
    });
}

export function GasDetail() {
  // @ts-ignore
  const { gas, planets } = useLoaderData();

  return (
    <div className="detail">
      <Stack direction="row">
        <Container>
          <Typography variant="h2" gutterBottom className="name">
            {gas.name}
          </Typography>
          <Typography variant="body1" className="description">
            {gas.description}
          </Typography>
        </Container>
        <div>
          <img src={gas.imageUrl} alt={gas.name} className="image" />
          <div style={{ marginBottom: "20px" }}>
            <div className="infos">
              <h3>Byte Value:</h3>
              <p>{gas.byteValue}</p>
            </div>
            <div className="infos">
              <h3>Used In:</h3>
              <p>{gas.usedIn}</p>
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
                    <StyledTableCell>Parts Per Unit</StyledTableCell>
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
                      <StyledTableCell>{planet.partsPerUnit}</StyledTableCell>
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
