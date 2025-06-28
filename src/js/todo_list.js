import { todo_list_item, todoItem } from "./todo_list_item";
import { todo_list_project, todoProject } from "./todo_list_project";
import "../css/todolist.css";

console.log("TODO LIST");
let allItems = {};
let allProjects = {};
let initItemId = 0;
let initProjectId = 0;
 
const todoListApp = (() => {
    
    function clearContent(){
        document.querySelector("#content").textContent = "";
    }
    function bindToDoListAppButtonEventHandlers(){
        document.querySelector("#add-item").addEventListener('click', () => {
            clearContent();
            document.querySelector("#content").appendChild(getAddItemFormContent());
        });


        document.querySelector("#add-project").addEventListener('click', () => {
            clearContent();
            document.querySelector("#content").appendChild(getAddProjectFormContent());
            
        });

        document.addEventListener('click', function(e){
            const itemTarget = e.target.closest("#add-item-submit");
            if(itemTarget && validateItemSubmitHandler()){
                let isItemUpdate = e.target.getAttribute('data-is-update');
                if(isItemUpdate === "true"){
                    let toUpdateItemId = e.target.getAttribute('data-item-id');
                    updateItemSubmitHandler(toUpdateItemId);
                }else{
                    addItemSubmitHandler();
                    clearContent();
                    document.querySelector("#content").appendChild(getAddItemFormContent());
                }
                renderItemsList();
            }

            const projectTarget = e.target.closest("#add-project-submit");
            if(projectTarget && validateProjectSubmitHandler()){
                let isProjectUpdate = e.target.getAttribute('data-is-update');
                if(isProjectUpdate === "true"){
                    let toUpdateProjectId = e.target.getAttribute('data-project-id');
                    updateProjectSubmitHandler(toUpdateProjectId);
                }else{
                    addProjectSubmitHandler();
                    clearContent();
                    document.querySelector("#content").appendChild(getAddProjectFormContent());
                }
                
                renderProjectsList();
                
            }

            const projectEditTarget = e.target.closest(".edit-project-btn")
            if(projectEditTarget){
                clearContent();
                let toEditProjectId = e.target.getAttribute('data-project-id');
                document.querySelector("#content").appendChild(getAddProjectFormContent(true, toEditProjectId));
            }

            const projectDeleteTarget = e.target.closest(".delete-project-btn")
            if(projectDeleteTarget){
                clearContent();
                let toDeleteProject = e.target.getAttribute('data-project-id');
                todoProject.deleteProject(toDeleteProject);
                renderProjectsList();
                // Add message.
                displayMessage("Success! Deleted Project!");
            }

            const itemEditTarget = e.target.closest(".edit-item-btn");
            if(itemEditTarget){
                clearContent();
                let toEditItemId = e.target.getAttribute('data-item-id');
                document.querySelector("#content").appendChild(getAddItemFormContent(true, toEditItemId));
            }

            const itemDeleteTarget = e.target.closest(".delete-item-btn");
            const itemDeleteTargetNew = e.target.closest("#delete-item-btn-2");
            if(itemDeleteTarget || itemDeleteTargetNew){
                clearContent();
                let toDeleteItem = e.target.getAttribute('data-item-id');
                todoItem.deleteItem(toDeleteItem);
                //Also, remove item from any project that might contain it.
                let itemOfProject = getProjectOfItem(toDeleteItem);
                if(itemOfProject){
                    removeItemFromProject(itemOfProject, toDeleteItem);
                }
                renderItemsList();
                // Add message.
                displayMessage("Success! Deleted item!");
            }
            

            const projectClickTarget = e.target.closest("#projects-list-ul");
            if(projectClickTarget){
                let clickedProjectId = e.target.getAttribute("data-project-key");
                clearContent();
                document.querySelector("#content").appendChild(renderObj("project", clickedProjectId));
            }

            const itemClickTarget = e.target.closest("#items-list-ul");
            const itemViewTarget = e.target.closest('#view-item-btn');
            if(itemClickTarget || itemViewTarget){
                let clickedItemId = e.target.getAttribute("data-item-key");
                clearContent();
                document.querySelector("#content").appendChild(renderObj("item", clickedItemId));
            }

        });
    }

    function removeItemFromProject(projectId, itemId){
        let allProjects = getAllProjects();
        delete allProjects[projectId].items[itemId];
        localStorage.setItem("projects", JSON.stringify(allProjects));
    }

    function renderObj(objType, objId){
        let renderDiv = document.createElement("div");
        renderDiv.classList.add("render-container");

        let renderHeaderDiv = document.createElement("div");
        renderHeaderDiv.classList.add("render-header-container");

        let renderBodyDiv = document.createElement("div");
        renderHeaderDiv.classList.add("render-body-container");

        if(objType === "item"){
            let itemObj = getAllItems()[`${objId}`];
            let itemName = itemObj.title;
            let itemDescription = itemObj.description;
            let itemDueDate = itemObj.dueDate;
            let itemPriority = itemObj.priority;
            let itemNotes = itemObj.notes;
            let itemProjectId = getProjectOfItem(objId);
            let itemProjectName = "Not assigned to any projects";
            if(itemProjectId !== false){
                let projectObj = getAllProjects()[`${itemProjectId}`];
                itemProjectName = projectObj.title;
            }

            let itemHeaderDetailsDiv = document.createElement("div");
            itemHeaderDetailsDiv.classList.add('item-details-header-div');

            let itemNameDiv = document.createElement("div");
            itemNameDiv.classList.add('object-render-element-div');
            itemNameDiv.textContent = itemName;

            itemHeaderDetailsDiv.appendChild(itemNameDiv);
            
            let hrElem = document.createElement("hr");
            renderBodyDiv.appendChild(hrElem);

            let itemDescDiv = document.createElement("div");
            itemDescDiv.classList.add('object-render-element-div');
            itemDescDiv.textContent = `Description: ${itemDescription}`;

            renderBodyDiv.appendChild(itemDescDiv);

            let itemDueDateDiv = document.createElement("div");
            itemDueDateDiv.classList.add('object-render-element-div');
            itemDueDateDiv.textContent = `Due Date: ${itemDueDate}`;

            let itemDueDateHeaderDiv = document.createElement("div");
            itemDueDateHeaderDiv.textContent = itemDueDate;

            renderBodyDiv.appendChild(itemDueDateDiv);
            itemHeaderDetailsDiv.appendChild(itemDueDateHeaderDiv);

            let itemPriorityDiv = document.createElement("div");
            itemPriorityDiv.classList.add('object-render-element-div');
            itemPriorityDiv.textContent = `Priority: ${itemPriority}`;

            let itemPriorityHeaderDiv = document.createElement("div");
            itemPriorityHeaderDiv.classList.add("item-view-priority-header");
            itemPriorityHeaderDiv.classList.add(`item-view-header-priority-${itemPriority}`);
            itemPriorityHeaderDiv.textContent = itemPriority;

            renderBodyDiv.appendChild(itemPriorityDiv);
            itemHeaderDetailsDiv.appendChild(itemPriorityHeaderDiv);

            let itemNotesDiv = document.createElement("div");
            itemNotesDiv.classList.add('object-render-element-div');
            itemNotesDiv.textContent = `Notes: ${itemNotes}`;

            renderBodyDiv.appendChild(itemNotesDiv);

            let itemProjectDiv = document.createElement("div");
            itemProjectDiv.classList.add('object-render-element-div');
            itemProjectDiv.textContent = `Project Assigned to: ${itemProjectName}`;

            renderBodyDiv.appendChild(itemProjectDiv);
            renderHeaderDiv.appendChild(itemHeaderDetailsDiv);

            let eachItemActionContainer = document.createElement("div");
            eachItemActionContainer.classList.add("each-item-action-container");
            
            let eachItemEditBtn = document.createElement("button");
            eachItemEditBtn.setAttribute('id', `edit-${objId}-btn`);
            eachItemEditBtn.classList.add('edit-item-btn');
            eachItemEditBtn.setAttribute('data-item-id', objId);
            eachItemEditBtn.textContent = "Edit Item";

            let eachItemDeleteBtn = document.createElement("button");
            eachItemDeleteBtn.setAttribute('id', `delete-${objId}-btn`);
            eachItemDeleteBtn.classList.add('delete-item-btn');
            eachItemDeleteBtn.setAttribute('data-item-id', objId);
            eachItemDeleteBtn.textContent = "Delete Item";
                
            eachItemActionContainer.appendChild(eachItemEditBtn);
            eachItemActionContainer.appendChild(eachItemDeleteBtn);
            
            renderHeaderDiv.appendChild(eachItemActionContainer);
        }else if(objType === "project"){
            let projectObj = getAllProjects()[`${objId}`];
            let projectName = projectObj.title;
            let projectDescription = projectObj.description;

            let projectHeaderDetailsDiv = document.createElement("div");
            projectHeaderDetailsDiv.classList.add('project-details-header-div');
            
            let projectNameDiv = document.createElement("div");
            projectNameDiv.classList.add('object-render-element-div');
            projectNameDiv.textContent = projectName;

            projectHeaderDetailsDiv.appendChild(projectNameDiv);

            let projectDescDiv = document.createElement("div");
            projectDescDiv.classList.add('object-render-element-div');
            projectDescDiv.textContent = `Description: ${projectDescription}`;

            renderBodyDiv.appendChild(projectDescDiv);

            let eachProjectActionContainer = document.createElement("div");
            eachProjectActionContainer.classList.add("each-project-action-container");
            
            let eachProjectEditBtn = document.createElement("button");
            eachProjectEditBtn.setAttribute('id', `edit-${objId}-btn`);
            eachProjectEditBtn.classList.add('edit-project-btn');
            eachProjectEditBtn.setAttribute('data-project-id', objId);
            eachProjectEditBtn.textContent = "Edit Project";

            let eachProjectDeleteBtn = document.createElement("button");
            eachProjectDeleteBtn.setAttribute('id', `delete-${objId}-btn`);
            eachProjectDeleteBtn.classList.add('delete-project-btn');
            eachProjectDeleteBtn.setAttribute('data-project-id', objId);
            eachProjectDeleteBtn.textContent = "Delete Project";
                
            eachProjectActionContainer.appendChild(eachProjectEditBtn);
            eachProjectActionContainer.appendChild(eachProjectDeleteBtn);

            // List all Items in the project.
            let allItemsInThisProject = getAllItemsInAProject(objId);
            if(Object.keys(allItemsInThisProject).length){
                let allItems = getAllItems();
                for(let eachItemInThisProject in allItemsInThisProject){
                    let eachItemInThisProjectObj = allItems[eachItemInThisProject];
                    let eachItemInThisProjectTitle = eachItemInThisProjectObj.title;
                    let eachItemInThisProjectDesc = eachItemInThisProjectObj.description;
                    let eachItemInThisProjectDueDate = eachItemInThisProjectObj.dueDate;
                    let eachItemInThisProjectPriority = eachItemInThisProjectObj.priority;

                    let projectItemsDiv = document.createElement("div");
                    projectItemsDiv.classList.add('object-render-element-div');
                    projectItemsDiv.classList.add('project-item-wrapper');
                    
                    let eachItemInThisProjectDiv = document.createElement("div");
                    eachItemInThisProjectDiv.classList.add('object-render-element-div');
                    eachItemInThisProjectDiv.classList.add('project-item-container');

                    let eachItemInThisProjectNameDiv = document.createElement("div");
                    eachItemInThisProjectNameDiv.textContent = eachItemInThisProjectTitle;

                    eachItemInThisProjectDiv.appendChild(eachItemInThisProjectNameDiv);

                    let eachItemInThisProjectDescDiv = document.createElement("div");
                    eachItemInThisProjectDescDiv.textContent = eachItemInThisProjectDesc;

                    eachItemInThisProjectDiv.appendChild(eachItemInThisProjectDescDiv);

                    let eachItemInThisProjectDueDateDiv = document.createElement("div");
                    eachItemInThisProjectDueDateDiv.textContent = eachItemInThisProjectDueDate;

                    eachItemInThisProjectDiv.appendChild(eachItemInThisProjectDueDateDiv);

                    let eachItemInThisProjectPriorityDiv = document.createElement("div");
                    eachItemInThisProjectPriorityDiv.textContent = eachItemInThisProjectPriority;

                    eachItemInThisProjectDiv.appendChild(eachItemInThisProjectPriorityDiv);

                    let eachItemInProjectActionDiv = document.createElement("div");
                    eachItemInProjectActionDiv.classList.add('project-item-actions');
                    
                    let eachItemInProjectViewItemBtn = document.createElement("button");
                    eachItemInProjectViewItemBtn.setAttribute('id', 'view-item-btn');
                    eachItemInProjectViewItemBtn.setAttribute('data-item-key', eachItemInThisProject);
                    eachItemInProjectViewItemBtn.textContent = 'View Item Details';


                    let eachItemInProjectDeleteItemBtn = document.createElement("button");
                    eachItemInProjectDeleteItemBtn.setAttribute('id', 'delete-item-btn-2');
                    eachItemInProjectDeleteItemBtn.setAttribute('data-item-id', eachItemInThisProject);
                    eachItemInProjectDeleteItemBtn.textContent = 'Delete Item';

                    eachItemInProjectActionDiv.appendChild(eachItemInProjectViewItemBtn);
                    eachItemInProjectActionDiv.appendChild(eachItemInProjectDeleteItemBtn);
                    
                    projectItemsDiv.appendChild(eachItemInThisProjectDiv);
                    let hrElem = document.createElement("hr");
                    projectItemsDiv.appendChild(hrElem);
                    projectItemsDiv.appendChild(eachItemInProjectActionDiv);
                    renderBodyDiv.appendChild(projectItemsDiv);
                }
            }else{
                let projectItemsDiv = document.createElement("div");
                projectItemsDiv.classList.add('object-render-element-div');
                projectItemsDiv.classList.add('project-item-wrapper');
                projectItemsDiv.textContent = "No Items in this project";
                renderBodyDiv.appendChild(projectItemsDiv);
            }

            projectHeaderDetailsDiv.appendChild(eachProjectActionContainer);
            renderHeaderDiv.appendChild(projectHeaderDetailsDiv);
        }

        renderDiv.appendChild(renderHeaderDiv);
        renderDiv.appendChild(renderBodyDiv);

        return renderDiv;
    }

    function renderProjectsList(){
        document.querySelector("#projects-list-container").textContent = "";
        document.querySelector("#projects-list-container").appendChild(displayProjects());
    }

    function renderItemsList(){
        document.querySelector("#items-list-container").textContent = "";
        document.querySelector("#items-list-container").appendChild(displayItems());
    }

    function displayItems(){
        let items = getAllItems();
        if(Object.keys(items).length){
            let itemsListElem = document.createElement("ul");
            itemsListElem.setAttribute('id', 'items-list-ul');
            for(let eachItem in items){
                const eachItemObj = items[eachItem];
                let eachItemListElem = document.createElement("li");
                let eachItemPriorityDiv = document.createElement("div");

                const eachItemId = eachItemObj.id;
                const eachItemName = eachItemObj.title;
                const eachItemPriority = eachItemObj.priority;

                eachItemPriorityDiv.classList.add(`item-priority-${eachItemPriority}`);
                eachItemPriorityDiv.classList.add('item-priority-dot')

                eachItemListElem.innerHTML = '';
                eachItemListElem.appendChild(eachItemPriorityDiv);
                eachItemListElem.appendChild(document.createTextNode(eachItemName));
                eachItemListElem.setAttribute('id', `item-${eachItemId}`);
                eachItemListElem.setAttribute('data-item-key', eachItem);
                
                itemsListElem.appendChild(eachItemListElem);                
            }
            return itemsListElem;
        }else{
            let noItems = document.createElement("span");
            noItems.textContent = "No Items found!";
            return noItems;
        }
    }

    function displayProjects(){
        let projects = getAllProjects();
        if(Object.keys(projects).length){
            let projectsListElem = document.createElement("ul");
            projectsListElem.setAttribute('id', 'projects-list-ul');
            for(let eachProject in projects){
                const eachProjectObj = projects[eachProject];
                let eachProjectListElem = document.createElement("li");

                let eachProjectListElemContainer = document.createElement("div");
                eachProjectListElemContainer.classList.add("each-project-list-container");
                
                let eachProjectDataContainer = document.createElement("div");
                eachProjectDataContainer.classList.add("each-project-data-container");
                
                const eachProjectId = eachProjectObj.id;
                const eachProjectTitle = eachProjectObj.title;
                const eachProjectDesc = eachProjectObj.description;
                
                if(eachProjectDesc.trim() !== ""){
                    eachProjectDataContainer.textContent = `${eachProjectTitle} - ${eachProjectDesc}`;
                    
                }else{
                    eachProjectDataContainer.textContent = `${eachProjectTitle}`;
                }
                eachProjectDataContainer.setAttribute('data-project-key', eachProject);

                eachProjectListElem.appendChild(eachProjectDataContainer);
                projectsListElem.appendChild(eachProjectListElem);
            }
            return projectsListElem;
        }else{
            let noProjects = document.createElement("span");
            noProjects.textContent = "No Projects found!";
            return noProjects;
        }
    }

    function displayItemsInProject(project){

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
        let itemProjectElem = document.getElementById("item_project");
        let addedItem = todoItem.createItem(itemName,itemDesc,itemDueDate,itemPriority,itemNotes);
        if(itemProjectElem){
            let itemProjectId = itemProjectElem.value;
            if(itemProjectId){
                todoProject.addItemToProject(itemProjectId, addedItem);
            }
        }

        // Add message.
        displayMessage(`Success! Added new item ${itemName}`);
    }

    function updateItemSubmitHandler(itemId){
        // Get the input from the form.
        let itemName = document.getElementById("item_name").value;
        let itemDesc = document.getElementById("item_desc").value;
        let itemDueDate = document.getElementById("item_due_date").value;
        let itemPriority = document.getElementById("item_priority").value;
        let itemNotes = document.getElementById("item_notes").value;
        let itemProject = document.getElementById("item_project").value;
        // Update Item.
        todoItem.updateItem(itemId, itemName,itemDesc,itemDueDate,itemPriority,itemNotes);
        
        let updatedProject = false;
        //Also, update the item's project.
        let itemCurrentProject = getProjectOfItem(`item_${itemId}`);
        let allProjects = getAllProjects();
        //Remove from old project
        if(itemCurrentProject){
            delete allProjects[itemCurrentProject].items[`item_${itemId}`];   
            updatedProject = true;
        }
        //Add to new project.
        if(itemProject){
            allProjects[itemProject].items[`item_${itemId}`] = `item_${itemId}`;
            updatedProject = true;
        }
        
        if(updatedProject){
            //Update storage.
            localStorage.setItem("projects", JSON.stringify(allProjects));
        }
            
        
        // Add message.
        displayMessage(`Success! Updated item ${itemName}`);
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

    function updateProjectSubmitHandler(projectId){
        // Get the input from the form.
        let projectName = document.getElementById("project_name").value;
        let projectDesc = document.getElementById("project_desc").value;
        // Create Project.
        todoProject.updateProject(projectId, projectName, projectDesc);
        //Display message.
        displayMessage(`Success! Updated project ${projectName}`);
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
        projectFormSubmit.setAttribute('data-is-update', false);
        projectForm.appendChild(projectFormSubmit);
        
        if(update){
            let projects = JSON.parse(localStorage.getItem("projects"));
            let toUpdateProject = projects[updateProjectId];
            let toUpdateProjectName = toUpdateProject.title;
            let toUpdateProjectDesc = toUpdateProject.description;
            let toUpdateProjectItems = toUpdateProject.items;
            projectFormNameInput.value = toUpdateProjectName;
            projectFormDescInput.value = toUpdateProjectDesc;
            projectFormSubmit.setAttribute('data-is-update', true);
            projectFormSubmit.setAttribute('data-project-id', toUpdateProject.id);
            projectFormSubmit.setAttribute('value', 'Update Project');
        }
        
        projectFormDiv.appendChild(projectForm);
        return projectFormDiv;
    }

    function getAddItemFormContent(update = false, updateItemId = undefined){
        let itemFormDiv = document.createElement("div");
        itemFormDiv.setAttribute('id', 'add-item-form');

        let itemForm = document.createElement("form");
        itemForm.setAttribute('onsubmit', 'return false');

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

        let allProjects = getAllProjects();
        if(Object.keys(allProjects).length > 0){
            let itemFormProjectLabel = document.createElement("label");
            itemFormProjectLabel.setAttribute('for', 'item_project');
            itemFormProjectLabel.textContent = "Project:";
            let itemFormProjectInput = document.createElement("select");
            let noProjectOptionElem = document.createElement("option");
            noProjectOptionElem.setAttribute('value', '')
            noProjectOptionElem.textContent = "NONE";
            itemFormProjectInput.appendChild(noProjectOptionElem); 
            for(const eachProject in allProjects){
                let eachProjectObj = allProjects[eachProject];
                let eachProjectOptionElem = document.createElement("option");
                eachProjectOptionElem.classList.add('edit-item-project-option');
                eachProjectOptionElem.setAttribute('value', eachProject)
                eachProjectOptionElem.textContent = eachProjectObj.title;
                itemFormProjectInput.appendChild(eachProjectOptionElem); 
            }
            itemFormProjectInput.setAttribute('id', 'item_project');
            itemFormProjectInput.setAttribute('name', 'item_project');
            

            if(update){
                let toUpdateItemProject = getProjectOfItem(updateItemId);
                if(toUpdateItemProject){
                    allProjects = getAllProjects();
                    let toUpdateItemProjectId = allProjects[toUpdateItemProject].id;
                    let toUpdateItemProjectTitle = allProjects[toUpdateItemProject].title;
                    itemFormProjectInput.querySelector(`option[value= "${toUpdateItemProject}"]`).selected = true;
                }
            }

            itemForm.appendChild(itemFormProjectLabel);
            itemForm.appendChild(itemFormProjectInput);
        }
        

        let itemFormSubmit = document.createElement("input");
        itemFormSubmit.setAttribute('type', 'submit');
        itemFormSubmit.setAttribute('id', 'add-item-submit');
        itemFormSubmit.setAttribute('value', 'Add Item');
        

        if(update){
            let items = JSON.parse(localStorage.getItem("items"));
            let toUpdateItem = items[updateItemId];
            let toUpdateItemId = toUpdateItem.id;
            let toUpdateProjectName = toUpdateItem.title;
            let toUpdateProjectDesc = toUpdateItem.description;
            let toUpdateItemDueDate = toUpdateItem.dueDate;
            let toUpdateItemPriority = toUpdateItem.priority;
            let toUpdateItemNotes = toUpdateItem.notes;
            itemFormNameInput.value = toUpdateProjectName;
            itemFormDescInput.value = toUpdateProjectDesc;
            itemFormDueDateInput.value = toUpdateItemDueDate;
            itemFormPriorityInput.value = toUpdateItemPriority;
            itemNotesInput.value = toUpdateItemNotes;
            itemFormSubmit.setAttribute('data-is-update', true);
            itemFormSubmit.setAttribute('data-item-id', toUpdateItemId);
            itemFormSubmit.setAttribute('value', 'Update Item');
        }

        itemForm.appendChild(itemFormSubmit);
        itemFormDiv.appendChild(itemForm);
        
        return itemFormDiv;
    }

    function getProjectOfItem(itemId){
        let allProjects = getAllProjects();
        for (let eachProject in allProjects){
            let eachProjectObj = allProjects[eachProject];
            let eachProjectObjItems = eachProjectObj.items;
            for(let eachItem in eachProjectObjItems){
                if(eachItem === itemId){
                    return eachProject;
                }
            }
        }
        return false;
    }

    function getAllItemsInAProject(projectId){
        let allProjects = getAllProjects();
        let projectItemsArr = {};
        for (let eachProject in allProjects){
            if(eachProject === projectId){
                let eachProjectObj = allProjects[eachProject];
                let eachProjectObjItems = eachProjectObj.items;
                for(let eachItem in eachProjectObjItems){
                    let eachItemObj = eachProjectObjItems[eachItem];
                    projectItemsArr[eachItem] = eachItemObj;
                }
            }
        }
        return projectItemsArr;
    }

    function initializeStorage(){
        let currentItems = JSON.parse(localStorage.getItem("items"));
        let currentProjects = JSON.parse(localStorage.getItem("projects"));
        let currentProjectId = JSON.parse(localStorage.getItem("currentProjectId"));
        let currentItemId = JSON.parse(localStorage.getItem("currentItemId"));
        if(currentItems === null ){
            localStorage.setItem("items", JSON.stringify(allItems));
        }

        if(currentProjects === null){
            localStorage.setItem("projects", JSON.stringify(allProjects));
        }

        if(currentProjectId === null){
            localStorage.setItem("currentProjectId", JSON.stringify(initProjectId));
        }

        if(currentItemId === null){
            localStorage.setItem("currentItemId", JSON.stringify(initItemId));
        }
    }

    function getAllProjects(){
        return JSON.parse(localStorage.getItem("projects"));
    }

    function getAllItems(){
        return JSON.parse(localStorage.getItem("items"));
    }

    return{
        bindToDoListAppButtonEventHandlers,
        addItemSubmitHandler,
        addProjectSubmitHandler,
        initializeStorage,
        renderProjectsList,
        renderItemsList,
    }
})();


todoListApp.initializeStorage();
todoListApp.renderProjectsList();
todoListApp.renderItemsList();
todoListApp.bindToDoListAppButtonEventHandlers();