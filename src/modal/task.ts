type AcutalStatuses = 'to-do' | 'done'

abstract class List {

    public id : number
    public title :string
    public status : AcutalStatuses

    constructor(id:number, title:string, status:AcutalStatuses){
        this.id = id
        this.title = title
        this.status = status
    }
    
}

export class Tasks extends List{}


export class TaskManager {

    private tasks : List[] = []
    private nextId : number = 1 

    addTask(title:string):List{
        let task = new Tasks(this.nextId++, title, 'to-do')   
        this.tasks.push(task)  
        return task  
    }


    getAllTasks():List[]{
       return this.tasks;
    }

    getTaskById(id: number): List | undefined {
        return this.tasks.find((item: List) => item.id === id);
    }
    

    editTasks(id:number, title:string):void{
        let task = this.getTaskById(id)
        if(task){
            task.title = title
        }
    }

    doneTask(id:number){
        let task = this.getTaskById(id)
        if(task){
            if(task.status === 'done'){
                task.status = 'to-do'
            }else{
                task.status = "done"
            }
        }
    }

    deleteTask(id:number){
        const index = this.tasks.findIndex(task => task.id === id);
        if (index !== -1) {
            this.tasks.splice(index, 1);
        }
    }
}