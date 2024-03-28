import express from 'express'
import { PrismaClient } from '@prisma/client';

const app = express()
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Infernus Ad Astra!')
})


// Planets
app.get('/planets', async (req, res) => {
  const planets = await prisma.planet.findMany();
  res.json(planets);
});


// Resources
app.get('/resources', async (req, res) => {
  const resources = await prisma.resource.findMany();
  res.json(resources);
});

export { app };