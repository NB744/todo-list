import { todo_list_item, todoItem } from "./todo_list_item";
import { todo_list_project, todoProject } from "./todo_list_project";

console.log("TODO LIST");
console.log(todo_list_item);
console.log(todo_list_project);

console.log(todoItem);

let nis1 = todoItem.createItem("Nischal Test Item 1", "This is a test", "06-26-2025", "high", "This is a test Note");
let nis2 = todoItem.createItem("Nischal Test Item 2", "This is a test", "06-26-2025", "high", "This is a test Note");
let nis3 = todoItem.createItem("Nischal Test Item 3", "This is a test", "06-26-2025", "high", "This is a test Note");
let nis4 = todoItem.createItem("Nischal Test Item 4", "This is a test", "06-26-2025", "high", "This is a test Note");
let nis5 = todoItem.createItem("Nischal Test Item 5", "This is a test", "06-26-2025", "high", "This is a test Note");


let nisProject1 = todoProject.createProject("Nischal Project 1", "Test Project");
let nisProject2 = todoProject.createProject("Nischal Project 2", "Test Project");


todoProject.addItemToProject(nisProject1, nis1);
todoProject.addItemToProject(nisProject1, nis2);
todoProject.addItemToProject(nisProject1, nis5);

todoProject.addItemToProject(nisProject2, nis3);
todoProject.addItemToProject(nisProject2, nis4);

console.log(localStorage);
console.log(localStorage.getItem('project_1'));
console.log(localStorage.getItem('project_2'));