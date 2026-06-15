import express from "express";
import * as taskController from "../controllers/taskController.js";

const router = express.Router();

/*
ADD TASK
*/
router.post(
    "/add",
    taskController.addTask
);

/*
GET ALL TASKS
*/
router.get(
    "/all",
    taskController.getTasks
);

/*
GET SINGLE TASK
*/
router.get(
    "/:id",
    taskController.getTask
);

/*
UPDATE TASK
*/
router.put(
    "/:id",
    taskController.updateTask
);

/*
DELETE TASK
*/
router.delete(
    "/:id",
    taskController.deleteTask
);

export default router;