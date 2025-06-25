export const todo_list_project = "To Do list Project";

export const todoProject = (() => {
    let projectId = 1;
    let projectItemCount = 0;
    function createProject(title, description){
        let nextProjectId = getNextProjectId();
        localStorage.setItem(`project_${nextProjectId}`, JSON.stringify({id: nextProjectId, title, description, items: getProjectItems()}));
        return `project_${nextProjectId}`;
    }

    function getProjectId(project){
        return project.id;
    }

    function getNextProjectId(){
        return projectId++;
    }

    function getProjectItems(project){
        return [];
    }

    function getProjectObj(projectId){
        return JSON.parse(localStorage.getItem(projectId));
    }

    function getProjectTitle(projectId){
        return getProjectObj(projectId).title;
    }

    function updateProjectTitle(projectId, newTitle){
        let projectObj = getProjectObj(projectId);
        projectObj.title = newTitle;
        localStorage.setItem(`item_${itemId}`, JSON.stringify(projectObj));
    }

    function getProjectDescription(projectId){
        return getProjectObj(projectId).description;
    }

    function updateProjectDescription(projectId, newDescription){
        let projectObj = getProjectObj(projectId);
        projectObj.description= newDescription;
        localStorage.setItem(`item_${itemId}`, JSON.stringify(projectObj));
    }

    function addItemToProject(projectId, item){
        let toUpdateProject = getProjectObj(projectId);
        toUpdateProject.items.push(item);
        localStorage.setItem(projectId, JSON.stringify(toUpdateProject));
    }

    function deleteProject(projectId){
        localStorage.removeItem(`project_${projectId}`);
        console.log(`Deleted Project ${projectId}`);
    }

    return {
        createProject,
        deleteProject,
        addItemToProject,
    }
})();