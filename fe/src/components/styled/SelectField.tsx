import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { FieldProps } from "formik";

export const SelectField: React.FC<
  FieldProps & { label: string; options: string[] }
> = ({ field, form: { touched, errors }, label, options, ...props }) => (
  <FormControl fullWidth>
    <InputLabel>{label}</InputLabel>
    <Select {...field} {...props}>
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);
