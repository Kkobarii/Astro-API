import styled from "@emotion/styled";
import { TableRow } from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // @ts-ignore
    backgroundColor: theme.palette.primary.main,
    // @ts-ignore
    color: theme.palette.common.black,
    // @ts-ignore
    fontWeight: theme.typography.fontWeightBold,
    // @ts-ignore
    fontSize: theme.typography.pxToRem(20),
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    paddingTop: "5px",
    paddingBottom: "5px",
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    // @ts-ignore
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
