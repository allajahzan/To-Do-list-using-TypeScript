import { Response, Request } from "express";
import { TaskManager, Tasks } from "../modal/task";
const manager = new TaskManager()

// get page
export const getPage = async (req:Request, res:Response) =>{
    res.redirect('/todolist')
}

export const todolist = async (req:Request, res:Response) =>{
    let tasks = manager.getAllTasks()

    res.render('to_do_list', {tasks, Tasks})
}

// add tasks
export const addTasks = async (req:Request, res:Response) =>{

    let title : string = req.body.title
    manager.addTask(title)

    let tasks = manager.getAllTasks()

    res.status(200).json({
        msg:"Successfully Added",
        tasks:tasks
    })

}


// edit tasks
export const editTask = async (req:Request, res:Response) =>{
    let title : string = req.body.title
    let id : number = Number(req.body.id)

    manager.editTasks(id,title)

    let tasks = manager.getAllTasks()

    res.status(200).json({
        msg:"Successfully Added",
        tasks:tasks
    })
}

// change tasks status
export const doneTask = async (req:Request, res:Response) =>{

    let id : number = Number(req.body.id)

    manager.doneTask(id)

    let tasks = manager.getAllTasks()

    res.status(200).json({
        msg:"Successfully Added",
        tasks:tasks
    })
}


// delete task
export const deleteTask =  async (req:Request, res:Response) =>{

    let id : number = Number(req.body.id)

    manager.deleteTask(id)

    let tasks = manager.getAllTasks()

    res.status(200).json({
        msg:"Successfully Added",
        tasks:tasks
    })
}