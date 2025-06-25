import { todo_list_item, todoItem } from "./todo_list_item";
import { todo_list_project, todoProject } from "./todo_list_project";

// console.log("TODO LIST");
// console.log(todo_list_item);
// console.log(todo_list_project);

// console.log(todoItem);

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

// console.log(localStorage);
// console.log(localStorage.getItem('project_1'));
// console.log(localStorage.getItem('project_2'));


const todoListApp = (() => {
    
    function clearContent(){
        document.querySelector("#content").textContent = "";
    }
    function bindToDoListAppButtonEventHandlers(){
        document.querySelector("#add_item").addEventListener('click', () => {
            console.log("ADD ITEM");
            clearContent();
            document.querySelector("#content").appendChild(getAddItemFormContent());
        });


        document.querySelector("#add_project").addEventListener('click', () => {
            console.log("ADD PROJECT");
            clearContent();
            document.querySelector("#content").appendChild(getAddProjectFormContent());
            
        });


    }

    function addItemSubmitHandler(){
        document.querySelector("#add-item-submit").addEventListener('click', () =>{
                console.log("SUBMIT ADD ITEM");
        });
    }

    function addProjectSubmitHandler(){
        document.querySelector("#add-project-submit").addEventListener('click', () =>{
                console.log("SUBMIT ADD PROJECT");
        });
    }


    function getAddProjectFormContent(){
        let projectFormDiv = document.createElement("div");
        projectFormDiv.setAttribute('id', 'add-project-form');

        let projectForm = document.createElement("form");

        let projectFormNameLabel = document.createElement("label");
        projectFormNameLabel.setAttribute('for', 'project_name');
        projectFormNameLabel.textContent = "Project Name:";
        let projectFormNameInput = document.createElement("input");
        projectFormNameInput.setAttribute('id', 'project_name');
        projectFormNameInput.setAttribute('name', 'project_name');
        projectFormNameInput.setAttribute('type', 'text');
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
        
        let projectFormSubmit = document.createElement("button");
        projectFormSubmit.setAttribute('type', 'button');
        projectFormSubmit.setAttribute('id', 'add-project-submit');
        projectFormSubmit.setAttribute('onclick', 'addProjectSubmitHandler()');
        projectFormSubmit.textContent = 'Add Project';
        projectForm.appendChild(projectFormSubmit);

        projectFormDiv.appendChild(projectForm);

        return projectFormDiv;
    }

    function getAddItemFormContent(){
        let itemFormDiv = document.createElement("div");
        itemFormDiv.setAttribute('id', 'add-item-form');

        let itemForm = document.createElement("form");

        let itemFormNameLabel = document.createElement("label");
        itemFormNameLabel.setAttribute('for', 'item_name');
        itemFormNameLabel.textContent = "Item Name:";
        let itemFormNameInput = document.createElement("input");
        itemFormNameInput.setAttribute('id', 'item_name');
        itemFormNameInput.setAttribute('name', 'item_name');
        itemFormNameInput.setAttribute('type', 'text');
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
        itemForm.appendChild(itemFormPriorityLabel);
        itemForm.appendChild(itemFormPriorityInput);

        let itemFormSubmit = document.createElement("button");
        itemFormSubmit.setAttribute('type', 'button');
        itemFormSubmit.setAttribute('id', 'add-item-submit');
        itemFormSubmit.setAttribute('onclick', 'addItemSubmitHandler()');
        itemFormSubmit.textContent = 'Add Item';
        itemForm.appendChild(itemFormSubmit);
        
        itemFormDiv.appendChild(itemForm);
        
        return itemFormDiv;
    }

    return{
        bindToDoListAppButtonEventHandlers,
        addItemSubmitHandler,
        addProjectSubmitHandler,
    }
})();

todoListApp.bindToDoListAppButtonEventHandlers();
