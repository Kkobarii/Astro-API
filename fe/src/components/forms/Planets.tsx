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
              <TableCell>{planet.name}</TableCell>
              <TableCell>{planet.type}</TableCell>
              <TableCell>{planet.size}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => onUpdate(planet.id)}
                >
                  Update
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => onDelete(planet.id)}
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
