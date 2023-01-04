import express from "express";
import { getAll, getOne, update, remove, create } from "./service.js";

const router = express.Router();

router.get("/", async (_req, res) => {
  const tasks = await getAll();
  res.send(tasks);
});

router.get("/:id", async (req, res) => {
  const task = await getOne({ _id: req.params.id });
  res.send(task);
});

router.get("/identifier/:identifier", async (req, res) => {
  const task = await getOne({ identifier: req.params.identifier });
  res.send(task);
});

router.post("/", async (req, res) => {
  try {
    const taskExists = await getOne({ identifier: req.body.identifier });
    if (taskExists) return res.send(await update(req.body));

    const task = await create(req.body);
    res.send(task);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
});

router.patch("/", async (req, res) => {
    try {
        const task = await update(req.body);
        res.send(task);
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
});

router.delete("/:identifier", async (req, res) => {
    try {
        const task = await remove(req.params.identifier);
        res.send(task);
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
});

export default router;
