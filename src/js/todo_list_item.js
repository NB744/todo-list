export const todo_list_item = "To Do list Item";

export const todoItem = (() => {
    
    let itemId = 1;
    const priorities = ["Low", "Normal", "High"];

    function createItem(title, description, dueDate, priority, notes){
        let nextItemId = getNextItemId();
        let items = getItemsObj();
        items[`item_${nextItemId}`] = {id: nextItemId, title, description, dueDate, priority, notes};
        localStorage.setItem("items", JSON.stringify(items));
        localStorage.setItem("currentItemId", JSON.stringify(nextItemId));
        return `item_${nextItemId}`;
    }

    function updateItem(id, title, description, dueDate, priority, notes){
        let items = getItemsObj();
        items[`item_${id}`] = {id, title, description, dueDate, priority, notes};
        localStorage.setItem("items", JSON.stringify(items));
        return `item_${id}`;
    }

    function getItemsObj(){
        return JSON.parse(localStorage.getItem("items"));
    }

    function getAllPriorities(){
        return priorities;
    }

    function getItemTitle(itemId){
        return getItemsObj()[`${itemId}`].title;
    }

    function updateItemTitle(itemId, newTitle){
        let items = getItemsObj();
        items[`${itemId}`].title = newTitle;
        localStorage.setItem("items", JSON.parse(items));
    }

    function getItemPriority(itemId){
        return getItemsObj()[`${itemId}`].priority;
    }

    function updateItemPriority(itemId, priority){
        let items = getItemsObj();
        items[`${itemId}`].priority = priority;
        localStorage.setItem("items", JSON.parse(items));
    }

    function updateItemNote(itemId, newNote){
        let items = getItemsObj();
        items[`${itemId}`].notes = newNote;
        localStorage.setItem("items", JSON.parse(items));
    }

    function getItemDueDate(itemId){
        return getItemsObj()[`${itemId}`].dueDate;
    }

    function updateItemDueDate(itemId, newDueDate){
        let items = getItemsObj();
        items[`${itemId}`].dueDate = newDueDate;
        localStorage.setItem("items", JSON.parse(items));
    }

    function getItemDescription(itemId){
        return getItemsObj()[`${itemId}`].description;
    }

    function updateItemDescription(itemId, newDescription){
        let itemObj = getItemObj(itemId);
        itemObj.description = newDescription;
        let toUpdateItemObj = JSON.stringify(itemObj);
        localStorage.setItem(`item_${itemId}`, toUpdateItemObj);
    }

    function getItemObj(itemId){
        return JSON.parse(localStorage.getItem(itemId));
    }

    function getNextItemId(){
        return getCurrentItemId() + 1;
    }

    function getCurrentItemId(){
        return parseInt(JSON.parse(localStorage.getItem("currentItemId")));
    }

    function deleteItem(itemId){
        let items = JSON.parse(localStorage.getItem("items"));
        delete items[itemId];
        console.log(items);
        localStorage.setItem("items", JSON.stringify(items));
        // Also, update any projects where this item is listed.
        console.log(`Deleted Item ${itemId}`);
    }

    return {
        createItem, 
        deleteItem,
        getAllPriorities,
        updateItem,
        getCurrentItemId,
    }
})();

