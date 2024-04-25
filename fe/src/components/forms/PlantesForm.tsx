import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, Input, InputLabel, MenuItem, Select } from '@mui/material';
import { Container, Divider, Paper, Stack, Table, TableBody, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../styled/StyledTable";
import { Link, NavLink } from "react-router-dom";
import { Outlet, useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../App.css";

import { Gas, Planet, Resource } from "../../misc/interfaces";

const Url = process.env.REACT_APP_BACKEND_URL;

export function PlanetForm(){
    const [name, setName] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [type , setType] = useState<string>();
    const [size, setSize] = useState<string>();
    const [difficulty, setDifficulty] = useState<string>();
    const [sun , setSun] = useState<string>();
    const [wind, setWind] = useState<string>();


    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(name, description, type, size, difficulty, sun, wind);
    }


    const sizeOptions = ['Small', 'Medium', 'Large'];
    const difficultyOptions = ['Easy', 'Medium', 'Hard', 'Very Hard', 'Extreme'];
    const sunOptions = [ 'Very low', 'Low', 'Medium', 'High', 'Very High'];
    const windOptions = ['Very low', 'Low', 'Medium', 'High', 'Very High'];


    //gasesOptions
    const [gasesOptions, setGasesOptions] = useState([]);
    useEffect(() => {
        const fetchGasesOptions = async () =>{
            const response = await fetch(Url + "/gases?pageSize=-1");
            const data = await response.json();
            setGasesOptions(data.items);
        };
        fetchGasesOptions();
    }, []);

    //resourcesOptions
    const [resourcesOptions, setResourcesOptions] = useState([]);
    useEffect(() => {
        const fetchResourcesOptions = async () => {
            const response = await fetch(Url + "/resources?pageSize=-1");
            const data = await response.json();
            setResourcesOptions(data.items);
        };
        fetchResourcesOptions();
    }
    , []);

    console.log(gasesOptions);
    console.log(resourcesOptions);



    return (
            <form onSubmit={handleSubmit}>
                <FormControl className='.MuiFormControl-fullWidth'>
                    <InputLabel htmlFor="name"> Name: </InputLabel>
                    <Input id="name" value={name} onChange={e => setName(e.target.value)} />
                </FormControl>

                <FormControl className='.MuiFormControl-fullWidth'>
                    <InputLabel htmlFor="description"> Description: </InputLabel>
                    <Input id="description" value={description} onChange={e => setDescription(e.target.value)} />
                </FormControl>

                <FormControl className='.MuiFormControl-fullWidth'>
                    <InputLabel htmlFor="type"> Type: </InputLabel>
                    <Input id="type" value={type} onChange={e => setType(e.target.value)} />
                </FormControl>

                <FormControl className='.MuiFormControl-fullWidth'>
                    <InputLabel htmlFor="size"> Size: </InputLabel>
                    <Select id="size" value={size} label="Size"  defaultValue='Medium' onChange={e => setSize(e.target.value)}>
                        {sizeOptions.map((sizeOption) => (
                        <MenuItem key={sizeOption} value={sizeOption}>
                            {sizeOption}
                        </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl className='.MuiFormControl-fullWidth'>
                    <InputLabel htmlFor="difficulty"> Difficulty: </InputLabel>
                    <Select id="difficulty" value={difficulty} label="Difficulty" defaultValue='Medium' onChange={e => setDifficulty(e.target.value)}>
                        {difficultyOptions.map((difficultyOption) => (
                        <MenuItem key={difficultyOption} value={difficultyOption}>
                            {difficultyOption}
                        </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl className='.MuiFormControl-fullWidth'>
                    <InputLabel htmlFor="sun"> Sun: </InputLabel>
                    <Select id="sun" value={sun} label="Sun" defaultValue={sunOptions[0]} onChange={e => setSun(e.target.value)}>
                        {sunOptions.map((sunOption) => (
                        <MenuItem key={sunOption} value={sunOption}>
                            {sunOption}
                        </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl className='.MuiFormControl-fullWidth'>
                    <InputLabel htmlFor="wind"> Wind: </InputLabel>
                    <Select id="wind" value={wind} label="Wind" defaultValue='Medium' onChange={e => setWind(e.target.value)}>
                        {windOptions.map((windOption) => (
                        <MenuItem key={windOption} value={windOption}>
                            {windOption}
                        </MenuItem>
                        ))}
                    </Select>
                </FormControl>


                <Container>
                <Typography variant="h5" gutterBottom style={{marginTop: "1em"}}>Gases:</Typography>
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
                        {gasesOptions.map((gas: Gas) => (
                        <StyledTableRow key={gas.id}>
                            <StyledTableCell>
                                <Checkbox  />
                            </StyledTableCell>
                            <StyledTableCell>{gas.name} </StyledTableCell>
                            <StyledTableCell>
                                <Input id="partsPerUnit" value={gas.partsPerUnit} />
                            </StyledTableCell>
                        </StyledTableRow>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
                </Container>

                {/* one or many resources with checkboxes */}
               
                <Container>
                <Typography variant="h5" gutterBottom style={{marginTop: "1em"}}>Resources:</Typography>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                    <TableHead>
                        <StyledTableRow>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell>Location</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {resourcesOptions.map((resource: Resource) => (
                        <StyledTableRow key={resource.id}>
                            <StyledTableCell>
                                <Checkbox  />
                            </StyledTableCell>
                            <StyledTableCell>{resource.name} </StyledTableCell>
                            <StyledTableCell>
                                <Input id="location" value={resource.location} />
                            </StyledTableCell>
                        </StyledTableRow>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
                </Container>


                <Button type="submit" className='.MuiFormControl-fullWidth' >Submit</Button>
            
            </form>
    )

}