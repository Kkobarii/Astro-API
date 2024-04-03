import express from "express";
import { PrismaClient } from "@prisma/client";
import * as crud from "./util/crud.js";

const router = express.Router();
const prisma = new PrismaClient();

const requiredFields = ["name", "type", "size", "difficulty", "sun", "wind"];

// GET all
router.get(
  "/",
  crud.getAll(prisma.planet, {
    select: { id: true, name: true, difficulty: true },
    where: { difficulty: "Easy" },
  })
);

// GET one
router.get("/:id", async (req, res) => {
  const optionals = {
    select: { id: true, name: true, resources: true },
    //include: { resources: true },
    where: { id: 1 },
  };

  crud.getById(prisma.planet, optionals)(req, res);
});

// POST
router.post("/", crud.create(prisma.planet, requiredFields));

// PUT
router.put("/:id", crud.update(prisma.planet, requiredFields.push("id")));

// DELETE
router.delete("/:id", crud.remove(prisma.planet));

export { router };
