import { Checkbox } from "@mui/material";
import { useField } from "formik";

export const MyCheckbox = ({ name }: { name: string }) => {
  const [field] = useField(name);
  return (
    <Checkbox
      {...field}
      checked={field.value}
      onChange={(event) => {
        const fakeEvent = {
          target: {
            name: field.name,
            value: event.target.checked,
          },
        };
        field.onChange(fakeEvent);
      }}
    />
  );
};
