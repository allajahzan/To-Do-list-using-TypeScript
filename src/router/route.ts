import { getPage , todolist, addTasks, editTask, doneTask, deleteTask} from "../controller/controller";
import { Router } from "express";
const route = Router()

// get landin page
route.get('/', getPage)

// landing page
route.get('/todolist', todolist)

// add tasks
route.post('/tasks', addTasks)

// edit tasks
route.put('/tasks', editTask)

// change status
route.patch('/tasks', doneTask)

// delete tasks
route.delete('/tasks', deleteTask)




export default route