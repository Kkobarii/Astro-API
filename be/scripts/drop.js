// Just a script to drop all tables in the database

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const DropPlanet = async () => {
  const planet = await prisma.planet.deleteMany();
  console.log(planet);
};

const DropResource = async () => {
  const resource = await prisma.resource.deleteMany();
  console.log(resource);
};

const DropGas = async () => {
  const gas = await prisma.gas.deleteMany();
  console.log(gas);
};

const DropPlanetResource = async () => {
  const planetResource = await prisma.planetResource.deleteMany();
  console.log(planetResource);
};

const DropPlanetGas = async () => {
  const planetGas = await prisma.planetGas.deleteMany();
  console.log(planetGas);
};

const DropAll = async () => {
  console.log("Dropping tables...");

  await DropPlanetGas();
  await DropPlanetResource();
  await DropPlanet();
  await DropResource();
  await DropGas();

  // todo zeptat se v hodine
  // await prisma.$executeRaw`delete from sqlite_sequence where name='planet';`;
  // await prisma.$executeRaw`UPDATE sqlite_sequence SET seq = 0 WHERE name = 'resource';`;
  // await prisma.$executeRaw`UPDATE sqlite_sequence SET seq = 0 WHERE name = 'gas';`;
};

export { DropAll };
