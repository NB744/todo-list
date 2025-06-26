import { todo_list_item, todoItem } from "./todo_list_item";
import { todo_list_project, todoProject } from "./todo_list_project";

console.log("TODO LIST");
// console.log(todo_list_item);
// console.log(todo_list_project);

// console.log(todoItem);
//localStorage.clear();

let allItems = {};
let allProjects = {};
 
const todoListApp = (() => {
    
    function clearContent(){
        document.querySelector("#content").textContent = "";
    }
    function bindToDoListAppButtonEventHandlers(){
        document.querySelector("#add-item").addEventListener('click', () => {
            console.log("ADD ITEM");
            clearContent();
            document.querySelector("#content").appendChild(getAddItemFormContent());
        });


        document.querySelector("#add-project").addEventListener('click', () => {
            console.log("ADD PROJECT");
            clearContent();
            document.querySelector("#content").appendChild(getAddProjectFormContent());
            
        });

        document.addEventListener('click', function(e){
            const itemTarget = e.target.closest("#add-item-submit");

            if(itemTarget && validateItemSubmitHandler()){
                console.log("NIS ADD ITEM CLICKED");
                addItemSubmitHandler();
                clearContent();
                document.querySelector("#content").appendChild(getAddItemFormContent());
            }

            const projectTarget = e.target.closest("#add-project-submit");
            if(projectTarget && validateProjectSubmitHandler()){
                console.log("NIS ADD PROJECT CLICKED");
                addProjectSubmitHandler();
                clearContent();
                document.querySelector("#content").appendChild(getAddProjectFormContent());
                renderProjectsList();
                
            }

            const projectEditTarget = e.target.closest("#edit-project")
            if(projectEditTarget){
                console.log("EDIT PROJECT");
                clearContent();
                //document.querySelector("#content").appendChild(getAddProjectFormContent(edit, ));   
            }

            const itemEditTarget = e.target.closest("#edit-item");
            if(itemEditTarget){
                console.log("EDIT ITEM");
                clearContent();
                document.querySelector("#content").appendChild(getAddItemFormContent());
            }
        });
    }

    function renderProjectsList(){
        document.querySelector("#projects-list-container").textContent = "";
        document.querySelector("#projects-list-container").appendChild(displayProjects());
    }

    function displayProjects(){
        let projects = JSON.parse(localStorage.getItem("projects"));
        console.log(projects);
        if(Object.keys(projects).length){
            //let projectsDetailsElem = document.createElement("details");
            //let projectsSummaryElem = document.createElement("summary");
            //projectsDetailsElem.append(projectsSummaryElem);
            let projectsListElem = document.createElement("ul");
            for(let eachProject in projects){
                const eachProjectObj = projects[eachProject];
                let eachProjectListElem = document.createElement("li");
                const eachProjectTitle = eachProjectObj.title;
                const eachProjectDesc = eachProjectObj.description;
                if(eachProjectDesc.trim() !== ""){
                    eachProjectListElem.textContent = `${eachProjectTitle} - ${eachProjectDesc}`;
                }else{
                    eachProjectListElem.textContent = `${eachProjectTitle}`;
                }
                
                projectsListElem.appendChild(eachProjectListElem);
            }
            return projectsListElem;
        }else{
            let noProjects = document.createElement("span");
            noProjects.textContent = "No Projects found!";
            return noProjects;
        }
    }

    function validateItemSubmitHandler(){
        if(document.getElementById("item_name").value && document.getElementById("item_due_date").value){
            return true;
        }
        return false;
    }

    function validateProjectSubmitHandler(){
        if(document.getElementById("project_name").value){
            return true;
        }
        return false;
    }

    function addItemSubmitHandler(){
        // Get the input from the form.
        let itemName = document.getElementById("item_name").value;
        let itemDesc = document.getElementById("item_desc").value;
        let itemDueDate = document.getElementById("item_due_date").value;
        let itemPriority = document.getElementById("item_priority").value;
        let itemNotes = document.getElementById("item_notes").value;
        // Create Item.
        todoItem.createItem(itemName,itemDesc,itemDueDate,itemPriority,itemNotes);
        // Add message.
        displayMessage(`Success! Added new item ${itemName}`);
    }

    function addProjectSubmitHandler(){
        // Get the input from the form.
        let projectName = document.getElementById("project_name").value;
        let projectDesc = document.getElementById("project_desc").value;
        // Create Project.
        todoProject.createProject(projectName, projectDesc);
        //Display message.
        displayMessage(`Success! Added new project ${projectName}`);
    }

    function displayMessage(message){
        document.querySelector("#message-container").textContent = message;
    }

    function getAddProjectFormContent(update = false, updateProjectId = undefined){
        let projectFormDiv = document.createElement("div");
        projectFormDiv.setAttribute('id', 'add-project-form');

        let projectForm = document.createElement("form");
        projectForm.setAttribute('onsubmit', 'return false');

        let projectFormNameLabel = document.createElement("label");
        projectFormNameLabel.setAttribute('for', 'project_name');
        projectFormNameLabel.textContent = "Project Name:";
        let projectFormNameInput = document.createElement("input");
        projectFormNameInput.setAttribute('id', 'project_name');
        projectFormNameInput.setAttribute('name', 'project_name');
        projectFormNameInput.setAttribute('type', 'text');
        projectFormNameInput.required = true;
        projectForm.appendChild(projectFormNameLabel);
        projectForm.appendChild(projectFormNameInput);

        let projectFormDescLabel = document.createElement("label");
        projectFormDescLabel.setAttribute('for', 'project_desc');
        projectFormDescLabel.textContent = "Project Description:";
        let projectFormDescInput = document.createElement("textarea");
        projectFormDescInput.setAttribute('id', 'project_desc');
        projectFormDescInput.setAttribute('name', 'project_desc');
        projectForm.appendChild(projectFormDescLabel);
        projectForm.appendChild(projectFormDescInput);
        
        let projectFormSubmit = document.createElement("input");
        projectFormSubmit.setAttribute('type', 'submit');
        projectFormSubmit.setAttribute('id', 'add-project-submit');
        projectFormSubmit.setAttribute('value','Add Project');
        projectForm.appendChild(projectFormSubmit);

        //let projectEditBtn = document.createElement("button");
        //projectEditBtn.setAttribute('id', 'edit-project');
        //projectEditBtn.setAttribute('data-project-id')

        projectFormDiv.appendChild(projectForm);
        

        if(update){
            let toUpdateProject = todoProject.getProjectObj(toUpdateProject);
            let toUpdateProjectName = toUpdateProject.title;
            let toUpdateProjectDesc = toUpdateProject.itemDesc;
            let toUpdateProjectItems = toUpdateProject.items;
            projectFormNameInput.textContent = toUpdateProjectName;
            projectFormDescInput.textContent = toUpdateProjectDesc;
        }
        return projectFormDiv;
    }

    function getAddItemFormContent(edit = false){
        let itemFormDiv = document.createElement("div");
        itemFormDiv.setAttribute('id', 'add-item-form');

        let itemForm = document.createElement("form");
        //itemForm.setAttribute('onsubmit', 'return false');

        let itemFormNameLabel = document.createElement("label");
        itemFormNameLabel.setAttribute('for', 'item_name');
        itemFormNameLabel.textContent = "Item Name:";
        let itemFormNameInput = document.createElement("input");
        itemFormNameInput.setAttribute('id', 'item_name');
        itemFormNameInput.setAttribute('name', 'item_name');
        itemFormNameInput.setAttribute('type', 'text');
        itemFormNameInput.required = true;
        itemForm.appendChild(itemFormNameLabel);
        itemForm.appendChild(itemFormNameInput);

        let itemFormDescLabel = document.createElement("label");
        itemFormDescLabel.setAttribute('for', 'item_desc');
        itemFormDescLabel.textContent = "Item Description:";
        let itemFormDescInput = document.createElement("textarea");
        itemFormDescInput.setAttribute('id', 'item_desc');
        itemFormDescInput.setAttribute('name', 'item_desc');
        itemForm.appendChild(itemFormDescLabel);
        itemForm.appendChild(itemFormDescInput);
       
        let itemFormDueDateLabel = document.createElement("label");
        itemFormDueDateLabel.setAttribute('for', 'item_due_date');
        itemFormDueDateLabel.textContent = "Due Date:";
        let itemFormDueDateInput = document.createElement("input");
        itemFormDueDateInput.setAttribute('id', 'item_due_date');
        itemFormDueDateInput.setAttribute('name', 'item_due_date');
        itemFormDueDateInput.setAttribute('type', 'date');
        itemFormDueDateInput.required = true;
        itemForm.appendChild(itemFormDueDateLabel);
        itemForm.appendChild(itemFormDueDateInput);
        
        let itemFormPriorityLabel = document.createElement("label");
        itemFormPriorityLabel.setAttribute('for', 'item_priority');
        itemFormPriorityLabel.textContent = "Priority:";
        let itemFormPriorityInput = document.createElement("select");
        let allPossiblePriorities = todoItem.getAllPriorities();
        for(const eachPriority of allPossiblePriorities){
            let eachPriorityElem = document.createElement("option");
            eachPriorityElem.setAttribute('value', eachPriority.toLowerCase());
            eachPriorityElem.textContent = eachPriority;
            itemFormPriorityInput.appendChild(eachPriorityElem);
        }
        itemFormPriorityInput.setAttribute('id', 'item_priority');
        itemFormPriorityInput.setAttribute('name', 'item_priority');
        itemFormPriorityInput.required = true;
        itemForm.appendChild(itemFormPriorityLabel);
        itemForm.appendChild(itemFormPriorityInput);

        let itemNotesLabel = document.createElement("label");
        itemNotesLabel.setAttribute('for', 'item_notes');
        itemNotesLabel.textContent = "Item Notes:";
        let itemNotesInput = document.createElement("textarea");
        itemNotesInput.setAttribute('id', 'item_notes');
        itemNotesInput.setAttribute('name', 'item_notes');
        itemForm.appendChild(itemNotesLabel);
        itemForm.appendChild(itemNotesInput);

        let itemFormSubmit = document.createElement("input");
        itemFormSubmit.setAttribute('type', 'submit');
        itemFormSubmit.setAttribute('id', 'add-item-submit');
        itemFormSubmit.setAttribute('value', 'Add Item');
        itemForm.appendChild(itemFormSubmit);
        
        itemFormDiv.appendChild(itemForm);
        
        return itemFormDiv;
    }

    function initializeStorage(){
        localStorage.setItem("items", JSON.stringify(allItems));
        localStorage.setItem("projects", JSON.stringify(allProjects));
    }

    return{
        bindToDoListAppButtonEventHandlers,
        addItemSubmitHandler,
        addProjectSubmitHandler,
        initializeStorage,
        renderProjectsList,
    }
})();


todoListApp.initializeStorage();
todoListApp.renderProjectsList();
todoListApp.bindToDoListAppButtonEventHandlers();




// let nis1 = todoItem.createItem("Nischal Test Item 1", "This is a test", "06-26-2025", "high", "This is a test Note");
// let nis2 = todoItem.createItem("Nischal Test Item 2", "This is a test", "06-26-2025", "high", "This is a test Note");
// let nis3 = todoItem.createItem("Nischal Test Item 3", "This is a test", "06-26-2025", "high", "This is a test Note");
// let nis4 = todoItem.createItem("Nischal Test Item 4", "This is a test", "06-26-2025", "high", "This is a test Note");
// let nis5 = todoItem.createItem("Nischal Test Item 5", "This is a test", "06-26-2025", "high", "This is a test Note");


// let nisProject1 = todoProject.createProject("Nischal Project 1", "Test Project");
// let nisProject2 = todoProject.createProject("Nischal Project 2", "Test Project");


// todoProject.addItemToProject(nisProject1, nis1);
// todoProject.addItemToProject(nisProject1, nis2);
// todoProject.addItemToProject(nisProject1, nis5);

// todoProject.addItemToProject(nisProject2, nis3);
// todoProject.addItemToProject(nisProject2, nis4);

// // console.log(localStorage);
// console.log(JSON.parse(localStorage.getItem("items")));
// console.log(JSON.parse(localStorage.getItem("projects")));
