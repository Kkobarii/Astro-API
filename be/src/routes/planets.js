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

  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || 5;
  const orderBy = req.query.orderBy || { id: "asc" };
  console.log("page", page, "pageSize", pageSize, "orderBy", orderBy);
  delete req.query.page;
  delete req.query.pageSize;
  delete req.query.orderBy;

  const optional = crud.parseQuery(req.query, res);
  if (optional !== typeof Object) return;
  if (!crud.checkFields(allowedFields, optional, res)) return;

  console.log(optional);

  crud.getAll(prisma.planet, optional, orderBy, page, pageSize)(req, res);
});

// GET one
router.get("/:id", async (req, res) => {
  const optional = crud.parseQuery(req.query, res);
  console.log("optional: ", optional);
  if (typeof optional != "object") return;
  if (!crud.checkFields(allowedFields, optional, res)) return;

  console.log("optional: ", optional);

  crud.getById(prisma.planet, optional)(req, res);
});

// POST
router.post("/", crud.create(prisma.planet, requiredFields));

// PUT
router.put("/:id", crud.update(prisma.planet, requiredFields.push("id")));

// DELETE
router.delete("/:id", crud.remove(prisma.planet));

export { router };
