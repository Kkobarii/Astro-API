import express from "express";
import { PrismaClient } from "@prisma/client";
import * as crud from "./util/crud.js";

const router = express.Router();
const prisma = new PrismaClient();

// GET all
router.get("/", crud.getAll(prisma.planet));

// GET one
router.get("/:id", crud.getById(prisma.planet));

// POST
router.post("/", crud.create(prisma.planet));

// PUT
router.put("/:id", crud.update(prisma.planet));

// DELETE
router.delete("/:id", crud.remove(prisma.planet));

export { router };