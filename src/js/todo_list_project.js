export const todo_list_project = "To Do list Project";

export const todoProject = (() => {
    let projectId = 1;
    let projectItemCount = 0;
    function createProject(title, description){
        let nextProjectId = getNextProjectId();
        localStorage.setItem(`project_${nextProjectId}`, stringifyProject({id: nextProjectId, title, description, items: getProjectItems()}));
        return `project_${nextProjectId}`;
    }

    function stringifyProject(project){
        return JSON.stringify(project);
    }

    function parseProjectString(projectString){
        return JSON.parse(projectString);
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

    function getProjectItem(project_id){
        return localStorage.getItem(`project_${nextProjectId}`);
    }

    function addItemToProject(project, item){

        let toUpdateProject = JSON.parse(localStorage.getItem(project));
        let toUpdateProjectId = getProjectId(toUpdateProject);
        toUpdateProject.items.push(item);
        let toUpdateProjectStr = stringifyProject(toUpdateProject);
        localStorage.setItem(`project_${toUpdateProjectId}`, toUpdateProjectStr);
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