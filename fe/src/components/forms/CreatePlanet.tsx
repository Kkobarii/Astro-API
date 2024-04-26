import { PlanetFormProps } from "../../misc/interfaces";
import { PlanetForm } from "./PlanetForm";
import { Planet } from "../../misc/interfaces";

let Url = process.env.REACT_APP_BACKEND_URL;

export function CreatePlanet() {
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
    fetch(Url + "/planets/", {
      method: "POST",
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

  return <PlanetForm handleSubmit={handleSubmit} />;
}
