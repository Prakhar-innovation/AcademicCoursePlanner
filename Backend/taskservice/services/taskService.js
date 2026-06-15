import Task from "../models/task.js";

export async function createTask(data) {

    try {

        const task =
        await Task.create(data);

        return {
            code: 200,
            task
        };

    } catch(error) {

        return {
            code: 500,
            message: error.message
        };
    }
}

export async function getAllTasks() {

    try {

        const tasks =
        await Task.find();

        return {
            code: 200,
            tasks
        };

    } catch(error) {

        return {
            code: 500,
            message: error.message
        };
    }
}

export async function getTask(id) {

    try {

        const task =
        await Task.findById(id);

        if(!task) {

            return {
                code:404,
                message:"Task Not Found"
            };
        }

        return {
            code:200,
            task
        };

    } catch(error) {

        return {
            code:500,
            message:error.message
        };
    }
}

export async function updateTask(id,data) {

    try {

        const task =
        await Task.findByIdAndUpdate(
            id,
            data,
            {new:true}
        );

        return {
            code:200,
            task
        };

    } catch(error) {

        return {
            code:500,
            message:error.message
        };
    }
}

export async function deleteTask(id) {

    try {

        await Task.findByIdAndDelete(id);

        return {
            code:200,
            message:"Task Deleted"
        };

    } catch(error) {

        return {
            code:500,
            message:error.message
        };
    }
}