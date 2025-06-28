export const todo_list_project = "To Do list Project";

export const todoProject = (() => {
    let projectId = 1;
    let projectItemCount = 0;
    function createProject(title, description){
        let nextProjectId = getNextProjectId();
        let projects = getProjectsObj();
        projects[`project_${nextProjectId}`] = {id: nextProjectId, title, description, items: {}};
        localStorage.setItem("projects", JSON.stringify(projects));
        localStorage.setItem("currentProjectId", JSON.stringify(nextProjectId));
        return `project_${nextProjectId}`;
        
    }

    function updateProject(id, title, description){
        let projects = getProjectsObj();
        projects[`project_${id}`] = {id, title, description, items: getProjectItems()};
        localStorage.setItem("projects", JSON.stringify(projects));
        return `project_${id}`;
    }

    function getProjectsObj(){
        return JSON.parse(localStorage.getItem("projects"));
    }

    function getProjectId(project){
        return project.id;
    }

    function getCurrentProjectId(){
        return parseInt(JSON.parse(localStorage.getItem("currentProjectId")));
    }
    function getNextProjectId(){
        return getCurrentProjectId() + 1;
    }

    function getProjectItems(project){
        return {};
    }

    function getProjectObj(projectId){
        return JSON.parse(localStorage.getItem(projectId));
    }

    function getProjectTitle(projectId){
        return getProjectsObj()[`${projectId}`].title;
    }

    function updateProjectTitle(projectId, newTitle){
        let projects = getProjectsObj();
        projects[`${projectId}`].title = newTitle;
        localStorage.setItem(`item_${itemId}`, JSON.stringify(projects));
    }

    function getProjectDescription(projectId){
        return getProjectsObj()[`${projectId}`].description;
    }

    function updateProjectDescription(projectId, newDescription){
        let projects = getProjectsObj();
        projects[`${projectId}`].description = newDescription;
        localStorage.setItem(`item_${itemId}`, JSON.stringify(projects));
    }

    function addItemToProject(projectId, item){
        let projects = getProjectsObj();
        projects[`${projectId}`].items[`${item}`] = item;
        localStorage.setItem("projects", JSON.stringify(projects));       
    }

    function deleteProject(projectId){
        let projects = JSON.parse(localStorage.getItem("projects"));
        delete projects[projectId];
        localStorage.setItem("projects", JSON.stringify(projects));
    }

    return {
        createProject,
        deleteProject,
        addItemToProject,
        getProjectObj,
        updateProject,
        getCurrentProjectId,
    }
})();