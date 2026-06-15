import * as taskService
from "../services/taskservice.js";

export async function addTask(
    req,
    res
) {

    const response =
    await taskService.createTask(
        req.body
    );

    res.json(response);
}

export async function getTasks(
    req,
    res
) {

    const response =
    await taskService.getAllTasks();

    res.json(response);
}

export async function getTask(
    req,
    res
) {

    const response =
    await taskService.getTask(
        req.params.id
    );

    res.json(response);
}

export async function updateTask(
    req,
    res
) {

    const response =
    await taskService.updateTask(
        req.params.id,
        req.body
    );

    res.json(response);
}

export async function deleteTask(
    req,
    res
) {

    const response =
    await taskService.deleteTask(
        req.params.id
    );

    res.json(response);
}