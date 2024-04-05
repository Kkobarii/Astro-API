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
router.post("/", crud.create(prisma.planet, requiredFields));

// PUT
router.put("/:id", crud.update(prisma.planet, requiredFields.push("id")));

// DELETE
router.delete("/:id", crud.remove(prisma.planet));

export { router };
