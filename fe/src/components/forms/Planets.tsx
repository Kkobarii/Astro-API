import React, { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { Planet } from "../../misc/interfaces";
import { Confirm } from "notiflix/build/notiflix-confirm-aio";
import { on } from "events";

interface DashboardProps {
  planets: Planet[];
  onUpdate: (id: number) => void;
  onDelete: (id: number) => void;
}

const PlanetDashboard: FC<DashboardProps> = ({
  planets,
  onUpdate,
  onDelete,
}) => {
  return (
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
                  onClick={() => onUpdate(planet.id)}
                  style={{ marginRight: "1em" }}
                >
                  Update
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    Confirm.show(
                      "Delete Planet",
                      `Are you sure you want to delete ${planet.name}?`,
                      "Yes",
                      "No",
                      () => {
                        onDelete(planet.id);
                      }
                    );
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
  );
};

export default PlanetDashboard;
