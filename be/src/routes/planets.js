import express from "express";
import { PrismaClient } from "@prisma/client";
import * as crud from "./util/crud.js";

const router = express.Router();
const prisma = new PrismaClient();

//prisma doesnt support getting optional fields nor @unique :(
const requiredFields = ["name", "type", "size", "difficulty", "sun", "wind"];
const allowedFields = [
  ...Object.keys(prisma.planet.fields),
  "resources",
  "gases",
];

// GET all
router.get("/", async (req, res) => {
  console.log(req.query);

  const paginationParams = crud.parsePagination(req.query);

  const optional = crud.parseQuery(req.query, res);
  if (!optional) return;
  if (!crud.checkFields(allowedFields, optional, res)) return;

  crud.getAll(prisma.planet, optional, paginationParams)(req, res);
});

// GET one
router.get("/:id", async (req, res) => {
  const optional = crud.parseQuery(req.query, res);
  if (typeof optional != "object") return;
  if (!crud.checkFields(allowedFields, optional, res)) return;

  crud.getById(prisma.planet, optional)(req, res);
});

// POST
router.post("/", async (req, res) => {
  let gases = {};
  let resources = {};

  gases.body = req.body.gases;
  resources.body = req.body.resources;

  if ("gases" in req.body) delete req.body.gases;
  if ("resources" in req.body) delete req.body.resources;
  if ("id" in req.body) delete req.body.id;

  if (req.body.iconUrl == null || req.body.iconUrl == undefined) {
    req.body.iconUrl =
      "https://static.wikia.nocookie.net/astroneer_gamepedia/images/f/fb/Icon_Landing_Pad.png";
  }
  if (req.body.imageUrl == null || req.body.imageUrl == undefined) {
    req.body.imageUrl =
      "https://static.wikia.nocookie.net/astroneer_gamepedia/images/3/35/Landings_Zones.jpg";
  }

  crud.create(prisma.planet, requiredFields)(req, res);

  if (gases.body) {
    gases.body.forEach((gas) => {
      crud.create(prisma.planetGas, [])(gas, res);
    });
  }
  if (resources.body) {
    resources.body.forEach((resource) => {
      let res = {};
      res.body = resource;
      crud.create(prisma.planetResource, [])(res, res);
    });
  }
});

// PUT
router.put("/:id", async (req, res) => {
  crud.update(prisma.planet, requiredFields)(req, res);
});

// DELETE
router.delete("/:id", crud.remove(prisma.planet));

export { router };
