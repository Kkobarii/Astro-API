import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Planet, PlanetFormProps } from "../../misc/interfaces";
import { PlanetForm } from "./PlanetForm";

let Url = process.env.REACT_APP_BACKEND_URL;

function loader({ params }: any) {
  const planetUrl =
    Url + "/planets/" + params.planetId + "?include=resources&include=gases";

  // Fetch planet data
  return fetch(planetUrl)
    .then((response) => response.json())
    .then((planetData) => {
      return planetData;
    });
}

function EditPlanet() {
  const { planetId: id } = useParams();
  const [loading, setLoading] = useState(true);
  const [planet, setPlanet] = useState<Planet | null>(null);

  console.log("EditPlanet id:", id);
  console.log("EditPlanet planet:", planet);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/planets/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPlanet(data);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (
    values: PlanetFormProps,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    console.log("Form values:", values);
    setSubmitting(false);

    //get and delete gases and resources from values
    const gases = values.gases;
    delete values.gases;
    const resources = values.resources;
    delete values.resources;

    // POST request to create a new planet
    fetch(Url + "/planets/" + values.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!planet) {
    return <div>Planet not found</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Edit planet</h1>
      <PlanetForm handleSubmit={handleSubmit} planet={planet} />
    </div>
  );
}

export { EditPlanet, loader };
