import express from "express";
import { PrismaClient } from "@prisma/client";
import * as crud from "./util/crud.js";

const router = express.Router();
const prisma = new PrismaClient();

// GET all
router.get("/", crud.getAll(prisma.gas));

// GET one
router.get("/:id", crud.getById(prisma.gas));

// POST
router.post("/", crud.create(prisma.gas));

// PUT
router.put("/:id", crud.update(prisma.gas));

// DELETE
router.delete("/:id", crud.remove(prisma.gas));

export { router };
