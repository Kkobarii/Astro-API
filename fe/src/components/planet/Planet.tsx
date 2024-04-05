import React from "react";

const Url = "http://localhost:3000/planets"

const Planet: React.FC<{}> = () => {
  const [planets, setPlanets] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(Url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  return (
    <div>
      <h3>Planets</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {planets.map((planet: any) => (
            <li key={planet.id}>
              <p>{planet.name}</p>
              <p>{planet.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { Planet };