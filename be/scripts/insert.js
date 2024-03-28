// This is script which we can utilize to seed our database.

import { PrismaClient } from "@prisma/client";
import { DropAll } from "./drop.js";

const prisma = new PrismaClient();

const CreatePlanet = async () => {
  const planet = await prisma.planet.create({
    data: {
      name: "Sylva",
      type: "Terran",
      description:
        "Sylva is a Terran Planet in Astroneer, with the moon Desolo orbiting it. It is the third planet, as well as the starting planet, with everything a player needs to begin their adventure. It has an average atmosphere and is overall very temperate and pleasant. Power generation on Sylva is balanced enough for the player to effectively use solar panels, wind turbines, or generators.",
      size: "Medium",
      difficulty: "Easy",
      sun: "Medium",
      wind: "Medium",
      iconUrl:
        "https://static.wikia.nocookie.net/astroneer_gamepedia/images/d/d2/Icon_Sylva.png",
      imageUrl:
        "https://static.wikia.nocookie.net/astroneer_gamepedia/images/f/f1/Sylva.png",
    },
  });
  console.log(planet);
};

const CreateResource = async () => {
  const resource = await prisma.resource.create({
    data: {
      name: "Malachite",
      description:
        "Malachite is a natural resource in Astroneer. Malachite is found in tall, clumped shards of brown-green crystalline deposits.",
      byteValue: 100,
      scrapValue: 1,
      smeltsInto: "Copper",
      iconUrl:
        "https://static.wikia.nocookie.net/astroneer_gamepedia/images/3/3b/Icon_Malachite.png",
      imageUrl:
        "https://static.wikia.nocookie.net/astroneer_gamepedia/images/b/be/Nugget_Malachite.png",
    },
  });
  console.log(resource);
};

const CreateGas = async () => {
  const gas = await prisma.gas.create({
    data: {
      name: "Hydrogen",
      description:
        "Hydrogen is an atmospheric resource in Astroneer. It is an orange-yellow gas that is stored in a spherical canister. A yellow ring on top indicates how much gas is left in the canister.",
      byteValue: 100,
      usedIn: "Hydrazine",
      iconUrl:
        "https://static.wikia.nocookie.net/astroneer_gamepedia/images/4/42/Icon_Hydrogen.png",
      imageUrl:
        "https://static.wikia.nocookie.net/astroneer_gamepedia/images/4/40/Nugget_Hydrogen.png",
    },
  });
  console.log(gas);
};

const MapResourceToPlanet = async () => {
  const planet = await prisma.planet.findUnique({
    where: {
      name: "Sylva",
    },
  });
  const resource = await prisma.resource.findUnique({
    where: {
      name: "Malachite",
    },
  });

  const planetResource = await prisma.planetResource.create({
    data: {
      planetId: planet.id,
      resourceId: resource.id,
      location: "Gray Mountains and Mantle Layers",
    },
  });

  console.log("Mapped Malachite to Sylva");
}

const MapGasToPlanet = async () => {
  const planet = await prisma.planet.findUnique({
    where: {
      name: "Sylva",
    },
  });
  const gas = await prisma.gas.findUnique({
    where: {
      name: "Hydrogen",
    },
  });

  const planetGas = await prisma.planetGas.create({
    data: {
      planetId: planet.id,
      gasId: gas.id,
      partsPerUnit: 75,
    },
  });
  console.log("Mapped Hydrogen to Sylva");
}

// Run the script

try {
  await DropAll();
  await CreatePlanet();
  await CreateResource();
  await CreateGas();
  await MapResourceToPlanet();
  await MapGasToPlanet();
  await prisma.$disconnect();
} catch (e) {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
}
