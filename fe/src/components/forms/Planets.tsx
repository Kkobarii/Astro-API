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
