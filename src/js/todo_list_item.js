export const todo_list_item = "To Do list Item";

export const todoItem = (() => {
    
    let itemId = 1;
    function createItem(title, description, dueDate, priority, notes){
        let nextItemId = getNextItemId();
        localStorage.setItem(`item_${nextItemId}`, JSON.stringify({id: nextItemId, title, description, dueDate, priority, notes}));
        return `item_${nextItemId}`;
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
    }
})();

