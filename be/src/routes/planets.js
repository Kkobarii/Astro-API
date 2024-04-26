import express from "express";
import { PrismaClient } from "@prisma/client";
import * as crud from "./util/crud.js";

const router = express.Router();
const prisma = new PrismaClient();

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
  let gases = req.body.gases;
  let resources = req.body.resources;

  delete req.body.gases;
  delete req.body.resources;

  if (gases) {
    crud.create(prisma.planetGas, ["partsPerUnit"])(gases, res);
  }
  if (resources) {
    crud.create(prisma.planetResource, ["location"])(resources, res);
  }

  crud.create(prisma.planet, requiredFields)(req, res);
});

// PUT
router.put("/:id", async (req, res) => {
  let gases = req.body.gases;
  let resources = req.body.resources;

  crud.update(prisma.planet, requiredFields)(req, res);
});

// DELETE
router.delete("/:id", crud.remove(prisma.planet));

export { router };
