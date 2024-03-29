import express from "express";
import { PrismaClient } from "@prisma/client";
import * as crud from "./util/crud.js";

const router = express.Router();
const prisma = new PrismaClient();

// GET all
router.get("/", crud.getAll(prisma.resource));

// GET one
router.get("/:id", crud.getById(prisma.resource));

// POST
router.post("/", crud.create(prisma.resource));

// PUT
router.put("/:id", crud.update(prisma.resource));

// DELETE
router.delete("/:id", crud.remove(prisma.resource));

export { router };
