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
import { idText } from "typescript";

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
    id: planet?.id || 0,
    name: planet?.name || "",
    description: planet?.description || "",
    type: planet?.type || "",
    size: planet?.size || sizeOptions[0],
    difficulty: planet?.difficulty || difficultyOptions[0],
    sun: planet?.sun || sunOptions[0],
    wind: planet?.wind || windOptions[0],
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "20px",
      }}
    >
      <Container>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form className="planetForm">
              <Container style={{ display: "flex", flexDirection: "row" }}>
                <Container>
                  <Field
                    name="name"
                    as={TextField}
                    label="Name"
                    className="planetFormItem"
                  />
                  <Field
                    name="type"
                    as={TextField}
                    label="Type"
                    className="planetFormItem"
                  />
                  <Field
                    name="description"
                    as={TextField}
                    label="Description"
                    className="planetFormItem"
                    multiline
                    rows={5}
                  />
                </Container>
                <Container>
                  <Field
                    name="size"
                    label="Size"
                    options={sizeOptions}
                    component={SelectField}
                    className="planetFormItem"
                  />
                  <Field
                    name="difficulty"
                    label="Difficulty"
                    options={difficultyOptions}
                    component={SelectField}
                    className="planetFormItem"
                  />
                  <Field
                    name="sun"
                    label="Sun"
                    options={sunOptions}
                    component={SelectField}
                    className="planetFormItem"
                  />
                  <Field
                    name="wind"
                    label="Wind"
                    options={windOptions}
                    component={SelectField}
                    className="planetFormItem"
                  />
                </Container>
              </Container>
              <Container style={{ display: "flex", flexDirection: "row" }}>
                <Button
                  type="submit"
                  className=".MuiFormControl-fullWidth"
                  variant="contained"
                  color="primary"
                  style={{ marginLeft: "auto" }}
                >
                  Submit
                </Button>
              </Container>
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
                              <MyCheckbox
                                name={`resources[${index}].selected`}
                              />
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
            </Form>
          )}
        </Formik>
      </Container>
    </div>
  );
}
