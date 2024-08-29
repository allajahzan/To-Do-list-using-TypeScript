async function addTasks(event:Event):Promise<void>{
    event.preventDefault()

    let input = document.getElementById('title') as HTMLFormElement
    let title;
    if(input)
        title = input.value as string

    const resp = await fetch('/tasks', {
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            title:title
        })
    })

    const data = await resp.json()
    makeLists(data.tasks)
    
    let form = document.getElementById('add_form') as HTMLFormElement
    form.reset()

}


// get edit form

function editTask(title:string,index:string){
    let editform = document.getElementById('edit_form_'+`${index}`) as HTMLFormElement
    let tasks_div = document.getElementById('tasks_div_'+`${index}`) as HTMLElement
    let buttons = document.getElementById('buttons_'+`${index}`) as HTMLElement

    editform.style.display = 'flex'
    tasks_div.style.display = 'none'
    buttons.style.display = 'none'

    let input = document.getElementById('edit_input_'+`${index}`) as HTMLFormElement
    input.value = title
    input.focus()

}


// edit task

async function saveTask(event:Event,taskId:string){
    event.preventDefault()

    let input = document.getElementById('edit_input_'+taskId) as HTMLFormElement
    let input1 = document.getElementById('id'+taskId) as HTMLFormElement
    let title = input.value as string
    let id = input1.value as string

    const resp = await fetch('/tasks', {
        method:'PUT',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            title:title,
            id:id
        })
    })

    const data = await resp.json()

    makeLists(data.tasks)
}


// done
async function done(id:string){

    const resp = await fetch('/tasks', {
        method:'PATCH',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            id:id
        })
    })

    const data = await resp.json()

    makeLists(data.tasks)
}

// delete tasks

async function deleteTask(id:string){
    const resp = await fetch('/tasks', {
        method:'DELETE',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify({
            id:id
        })
    })

    const data = await resp.json()

    makeLists(data.tasks)
}

// make lists

function makeLists(tasks:any[]){
    let html = ``

    tasks.forEach((ele : any) => {
        html+= `  <div
                    style="display: flex; justify-content: space-between; margin-bottom: 10px; background-color: rgb(231, 231, 231); padding: 5px; border-radius: 10px;">
                    <input id="id${ele.id}" type="hidden"  value="${ele.id}" >
                    <div id="tasks_div_${ele.id}" style="display:flex; width: 230px; overflow: hidden; text-overflow: ellipsis;">
                      ${ele.status === 'done' ? `
                            <button onclick="done('${ele.id}')" class="done_btn" style="position: relative; top: 1px;"><span class="material-symbols-outlined">
                                check_circle
                            </span></button>
                            <p class="title" style="position: relative; top: 8px; text-decoration: line-through;">
                                ${ele.title}
                            </p>
                        ` : `
                            <button onclick="done('${ele.id}')" class="done_btn" style="position: relative; top: 1px;"><span class="material-symbols-outlined">
                                radio_button_unchecked
                            </span></button>
                            <p class="title" style="position: relative; top: 8px;">
                                ${ele.title}
                            </p>
                     `} 
                    </div>
                    <div id="edit_form_${ele.id}" style="display: none;">
                          ${ele.status === 'done' ? `
                            <button class="done_btn" style="position: relative; top: 1px;"><span class="material-symbols-outlined">
                                check_circle
                             </span></button>
                        `:`
                            <button class="done_btn" style="position: relative; top: 1px;"><span class="material-symbols-outlined">
                                radio_button_unchecked
                             </span></button>
                         `}
                          <form style="padding: 0px;" action="" onsubmit="saveTask(event,'${ele.id}')">
                             <input id="id${ele.id}" type="hidden"  value="${ele.id}" >
                            <input style="padding-left: 10px; background-color: white;" id="edit_input_${ele.id}" required type="text">
                            <button style="width: 9%;"><span style="color: green;" class="material-symbols-outlined">
                                Save
                            </span></button>
                        </form>
                    </div>
                    <div id="buttons_${ele.id}" style="display: flex; justify-content: space-between;">
                       <button onclick="editTask('${ele.title}','${ele.id}')" ><span class="material-symbols-outlined">
                                edit
                            </span></button>
                        <button  onclick="deleteTask('${ele.id}')"><span style="color: black;" class="material-symbols-outlined">
                                delete
                            </span></button>
                    </div>
                </div>`
    });

            
    let div = document.getElementById('lists_of_tasks') as HTMLElement
    div.innerHTML = html

}