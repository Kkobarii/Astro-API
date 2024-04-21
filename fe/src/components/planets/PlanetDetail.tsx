import { NavLink, Outlet, useLoaderData, useParams } from "react-router-dom";
import "../../App.css";
import { Button, Container, Divider, Paper, Stack, Table, TableBody, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { StyledTableCell, StyledTableRow } from "../styled/StyledTable";

const Url = "http://localhost:4000/";

export function loader({ params }: any) {
  const planetUrl = Url + "planets/" + params.planetId + "?include=resources&include=gases";

  // Fetch planet data
  return fetch(planetUrl)
    .then((response) => response.json())
    .then((planetData) => {
      const resourceIds = planetData.resources.map((resource: any) => resource.resourceId);
      const gasIds = planetData.gases.map((gas: any) => gas.gasId);
      
      // Fetch resources associated with the planet
      const resourcePromises = resourceIds.map((resourceId: any) =>
        fetch(Url + "resources/" + resourceId).then((response) => response.json())
      );

      // Fetch gases associated with the planet
      const gasPromises = gasIds.map((gasId: any) =>
        fetch(Url + "gases/" + gasId).then((response) => response.json())
      );

      // Wait for all promises to resolve
      return Promise.all([
        Promise.all(resourcePromises),
        Promise.all(gasPromises)
      ]).then(([resources, gases]) => {
        // add resource location to each resource
        resources.forEach((resource: any) => {
          const location = planetData.resources.find((r: any) => r.resourceId === resource.id);
          resource.location = location.location
        });

        // add gas parts per unit to each gas
        gases.forEach((gas: any) => {
          const partsPerUnit = planetData.gases.find((g: any) => g.gasId === gas.id);
          gas.partsPerUnit = partsPerUnit.partsPerUnit
        });
        gases.sort((a: any, b: any) => b.partsPerUnit - a.partsPerUnit);

        return {
          planet: planetData,
          resources: resources,
          gases: gases
        };
      });
    });
}


export function PlanetDetail () {
  // @ts-ignore
  const { planet, resources, gases } = useLoaderData();

  return (
    <div className="detail">
      <Container>
      <Stack direction="row">
        <Container>
          <Typography variant="h2" gutterBottom className="name">{planet.name}</Typography>
          <Typography variant="body1" className="description">{planet.description}</Typography>
        </Container>
        <div>
          <img src={planet.imageUrl} alt={planet.name} className="image" />
          <div style={{ marginBottom: '20px' }}>
            <div className="infos">
              <h3>Type:</h3>
              <p>{planet.type}</p>
            </div>
            <div className="infos">
              <h3>Size:</h3>
              <p>{planet.size}</p>
            </div>
            <div className="infos">
              <h3>Difficulty:</h3>
              <p>{planet.difficulty}</p>
            </div>
            <div className="infos">
              <h3>Sun:</h3>
              <p>{planet.sun}</p>
            </div>
            <div className="infos">
              <h3>Wind:</h3>
              <p>{planet.wind}</p>
            </div>
          </div>
        </div>
      </Stack>
      </Container>
      <Divider />
      <Container>
      <Stack textAlign="left">
        {resources && resources.length > 0 && (
          <Container>
          <Typography variant="h4" gutterBottom style={{marginTop: "1em"}}>Resources:</Typography>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>Location</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {resources.map((resource: any) => (
                    <StyledTableRow key={resource.id}>
                      <StyledTableCell>
                        <Button component={NavLink} to={`/resources/${resource.id}`}>
                          <img src={resource.iconUrl} alt={resource.name} className="icon" />
                          <p className="icon-name">{resource.name}</p>
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell>{resource.location}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        )}

        {gases && gases.length > 0 && (
            <Container>
            <Typography variant="h4" gutterBottom style={{marginTop: "1em"}}>Gases:</Typography>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <StyledTableRow>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell>Parts per Unit</StyledTableCell>
                    </StyledTableRow>
                  </TableHead>
                  <TableBody>
                    {gases.map((gas: any) => (
                      <StyledTableRow key={gas.id}>
                        <StyledTableCell>
                          <Button component={NavLink} to={`/gases/${gas.id}`}>
                            <img src={gas.iconUrl} alt={gas.name} className="icon" />
                          <p className="icon-name">{gas.name}</p>
                          </Button>
                        </StyledTableCell>
                        <StyledTableCell>{gas.partsPerUnit}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Container>
          )}
      </Stack>
      </Container>

    </div>
  );
};


