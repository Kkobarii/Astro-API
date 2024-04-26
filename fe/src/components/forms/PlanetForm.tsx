import {
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Box,
  Typography,
} from "@mui/material";
import { Formik, Form, Field, FieldProps, useField } from "formik";
import * as Yup from "yup";
import { StyledTableCell, StyledTableRow } from "../styled/StyledTable";
import { useState, useEffect } from "react";
import { Gas, Planet, PlanetFormProps, Resource } from "../../misc/interfaces";
import { SelectField } from "../styled/SelectField";
import { MyCheckbox } from "../styled/MyCheckbox";
import { on } from "events";

let Url = process.env.REACT_APP_BACKEND_URL;

export function PlanetForm({
  handleSubmit,
  planet,
}: {
  handleSubmit: (
    values: PlanetFormProps,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => void;
  planet?: Planet;
}) {
  const sizeOptions = ["Small", "Medium", "Large"];
  const difficultyOptions = ["Easy", "Medium", "Hard", "Very Hard", "Extreme"];
  const sunOptions = ["Very low", "Low", "Medium", "High", "Very High"];
  const windOptions = ["Very low", "Low", "Medium", "High", "Very High"];

  //gasesOptions
  const [gasesOptions, setGasesOptions] = useState<Gas[]>([]);
  useEffect(() => {
    const fetchGasesOptions = async () => {
      const response = await fetch(Url + "/gases?pageSize=-1");
      const data = await response.json();
      setGasesOptions(data.items);
    };
    fetchGasesOptions();
  }, []);

  //resourcesOptions
  const [resourcesOptions, setResourcesOptions] = useState<Resource[]>([]);
  useEffect(() => {
    const fetchResourcesOptions = async () => {
      const response = await fetch(Url + "/resources?pageSize=-1");
      const data = await response.json();
      setResourcesOptions(data.items);
    };
    fetchResourcesOptions();
  }, []);

  console.log(gasesOptions);
  console.log(resourcesOptions);

  const initialValues = {
    name: "",
    description: "",
    type: "",
    size: sizeOptions[0],
    difficulty: difficultyOptions[0],
    sun: sunOptions[0],
    wind: windOptions[0],
    resources: resourcesOptions.map((resource) => ({
      selected: false,
      location: "",
      id: resource.id,
    })),
    gases: gasesOptions.map((gas) => ({
      selected: false,
      partsPerUnit: "",
      id: gas.id,
    })),
  };

  const requiredFields = ["name", "type", "size", "difficulty", "sun", "wind"];
  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    type: Yup.string().required("Required"),
    size: Yup.string().required("Required"),
    difficulty: Yup.string().required("Required"),
    sun: Yup.string().required("Required"),
    wind: Yup.string().required("Required"),
  });

  return (
    <Box
      component="section"
      sx={{
        mt: 3,
        margin: 5,
        padding: 5,
        border: 1,
        borderColor: "grey.500",
        borderRadius: 1,
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form style={{ margin: 5 }}>
            <Field name="name" as={TextField} label="Name" />
            <Field name="description" as={TextField} label="Description" />
            <Field name="type" as={TextField} label="Type" />
            <Field
              name="size"
              label="Size"
              options={sizeOptions}
              component={SelectField}
            />
            <Field
              name="difficulty"
              label="Difficulty"
              options={difficultyOptions}
              component={SelectField}
            />
            <Field
              name="sun"
              label="Sun"
              options={sunOptions}
              component={SelectField}
            />
            <Field
              name="wind"
              label="Wind"
              options={windOptions}
              component={SelectField}
            />
            {/* this is first table */}
            <Container>
              <Typography
                variant="h5"
                gutterBottom
                style={{ marginTop: "1em" }}
              >
                Resources:
              </Typography>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <StyledTableRow>
                      <StyledTableCell></StyledTableCell>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell>Location </StyledTableCell>
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {resourcesOptions.map(
                      (resource: Resource, index: number) => (
                        <StyledTableRow key={resource.id}>
                          <StyledTableCell>
                            <MyCheckbox name={`resources[${index}].selected`} />
                          </StyledTableCell>
                          <StyledTableCell>{resource.name}</StyledTableCell>
                          <StyledTableCell>
                            <Field
                              name={`resources[${index}].location`}
                              as={TextField}
                            />
                          </StyledTableCell>
                        </StyledTableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Container>
            {/* one or many resources with checkboxes */}
            <Container>
              <Typography
                variant="h5"
                gutterBottom
                style={{ marginTop: "1em" }}
              >
                Gases:
              </Typography>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <StyledTableRow>
                      <StyledTableCell></StyledTableCell>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell>Parts per unit</StyledTableCell>
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {gasesOptions.map((resource: Gas, index: number) => (
                      <StyledTableRow key={resource.id}>
                        <StyledTableCell>
                          <MyCheckbox name={`gases[${index}].selected`} />
                        </StyledTableCell>
                        <StyledTableCell>{resource.name}</StyledTableCell>
                        <StyledTableCell>
                          <Field
                            name={`gases[${index}].partsPerUnit`}
                            as={TextField}
                          />
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Container>
            <Button type="submit" className=".MuiFormControl-fullWidth">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}