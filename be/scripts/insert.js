// This is script which we can utilize to seed our database.

import { PrismaClient } from "@prisma/client";
import { DropAll } from "./drop.js";
import fs from 'fs';

const prisma = new PrismaClient();

const file = fs.readFileSync('be/scripts/data.json', 'utf-8');
const data = JSON.parse(file);

const CreatePlanet = async (p) => {
  const resources = p.resources;
  const gases = p.gases;
  delete p.resources;
  delete p.gases;

  const planet = await prisma.planet.create({
    data: p,
  });

  resources.forEach(async (r) => {
    const resource = await prisma.resource.findUnique({
      where: {
        name: r.name,
      },
    });

    if (resource) {
      await prisma.planetResource.create({
        data: {
          planetId: planet.id,
          resourceId: resource.id,
          location: r.location,
        },
      });
    } else {
      console.error(`Resource ${r.name} not found`);
    }
  });

  gases.forEach(async (g) => {
    const gas = await prisma.gas.findUnique({
      where: {
        name: g.name,
      },
    });

    if (gas) {
      await prisma.planetGas.create({
        data: {
          planetId: planet.id,
          gasId: gas.id,
          partsPerUnit: g.partsPerUnit,
        },
      });
    } else {
      console.error(`Gas ${g.name} not found`);
    }
  });

  console.log(" - " + planet.name);
};

const CreateResource = async (r) => {
  const resource = await prisma.resource.create({
    data: r,
  });
  console.log(" - " + resource.name);
};

const CreateGas = async (g) => {
  const gas = await prisma.gas.create({
    data: g,
  });
  console.log(" - " + gas.name);
};

// Run the script

async function seedDatabase() {
  try {
    await DropAll();
    console.log("\nSeeding database...")

    console.log("\nCreating resources...");
    await Promise.all(data.resources.map(CreateResource));

    console.log("\nCreating gases...");
    await Promise.all(data.gases.map(CreateGas));

    console.log("\nCreating planets...");
    await Promise.all(data.planets.map(CreatePlanet));

    await prisma.$disconnect();
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
}

seedDatabase();
