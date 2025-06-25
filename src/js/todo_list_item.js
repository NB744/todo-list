export const todo_list_item = "To Do list Item";

export const todoItem = (() => {
    
    let itemId = 1;
    const priorities = ["Low", "Normal", "High"];

    function createItem(title, description, dueDate, priority, notes){
        let nextItemId = getNextItemId();
        localStorage.setItem(`item_${nextItemId}`, JSON.stringify({id: nextItemId, title, description, dueDate, priority, notes}));
        return `item_${nextItemId}`;
    }

    function getAllPriorities(){
        return priorities;
    }

    function getItemTitle(itemId){
        let itemObj = getItemObj(itemId);
        return itemObj.title;
    }

    function updateItemTitle(itemId, newTitle){
        let itemObj = getItemObj(itemId);
        itemObj.title = newTitle;
        let toUpdateItemObj = JSON.stringify(itemObj);
        localStorage.setItem(`item_${itemId}`, toUpdateItemObj);
    }

    function getItemPriority(itemId){
        let itemObj = localStorage.getItem(`item_${itemId}`);
        return itemObj.priority;
    }

    function updateItemPriority(itemId, priority){
        let itemObj = getItemObj(itemId);
        itemObj.priority = priority;
        let toUpdateItemObj = JSON.stringify(itemObj);
        localStorage.setItem(`item_${itemId}`, toUpdateItemObj);
    }

    function updateItemNote(itemId, newNote){
        let itemObj = getItemObj(itemId);
        itemObj.notes = newNote;
        let toUpdateItemObj = JSON.stringify(itemObj);
        localStorage.setItem(`item_${itemId}`, toUpdateItemObj);
    }

    function getItemDueDate(itemId){
        let itemObj = getItemObj(itemId);
        return itemObj.dueDate;
    }

    function updateItemDueDate(itemId, newDueDate){
        let itemObj = getItemObj(itemId);
        itemObj.dueDate = newDueDate;
        let toUpdateItemObj = JSON.stringify(itemObj);
        localStorage.setItem(`item_${itemId}`, toUpdateItemObj);
    }

    function getItemDescription(itemId){
        let itemObj = getItemObj(itemId);
        return itemObj.description;
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
        return itemId++;
    }

    function deleteItem(itemId){
        localStorage.removeItem(`item_${itemId}`);
        console.log(`Deleted Item ${itemId}`);
    }

    return {
        createItem, 
        deleteItem,
        getAllPriorities,
    }
})();

