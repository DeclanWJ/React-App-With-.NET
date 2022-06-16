/* Javascript file that handles functionality for the main site page */

/* Define variables for the uri (uniform resource identifier)
   As well as an array to store the todos. */
const uri = 'api/todoitems';
let todos = [];


function getItems() {

   /* fetch the resource, aka the todo items
      Response = json format
      Send the data to be displayed (then used in display method)
      Catch errors that may occur */
    fetch(uri)
      .then(response => response.json())
      .then(data => _displayItems(data))
      .catch(error => console.error('Unable to get items.', error));

}

function addItem() {

    /* Get the name of the todo from the text box (by id)*/
    const addNameTextBox = document.getElementById('add-name');

    /* Create the item setting any default values*/
    const item = {
        isComplete: false,
        name: addNameTextBox.value.trim()
    };

    /* Make POST request to backend controller to create todo (using json)
       Then display the items and reset nameTextBox     
    */
    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
          getItems();
          addNameTextBox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));

}

function deleteItem(id) {

    /* Little differnt fetch request, because 2 variables are needed (base uri and id of item)*/
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));

}

/* Function to display the edit form when wanting to edit item */
function displayEditForm(id) {

    const item = todos.find(item => item.id === id);

    document.getElementById('edit-name').value = item.name;
    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-isComplete').checked = item.isComplete;
    document.getElementById('editForm').style.display = 'block';

}

/* Function to update item after editing 
   Use POST to create, PUT to update */
function updateItem() {

    const itemId = document.getElementById('edit-id').value;

    const item = {

        id: parseInt(itemId, 10), /* Parse from long (64bit) to int (32bit) */
        isComplete: document.getElementById('edit-isComplete').checked,
        name: document.getElementById('edit-name').value.trim()

    };

    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item', error));

    closeInput();

    return false; /* ?? Why return false here */

}

/* Function for closing out the edit form (after updating) */
function closeInput() {

    document.getElementById('editForm').style.display = 'none';

}

/* Display the count of items 
   underscore in front means private (not enforced by js) */
function _displayCount(itemCount) {

    const name = (itemCount == 1) ? 'to-do' : 'to-dos';

    document.getElementById('counter').innerText = `${itemCount} ${name}`;

}

/* Function to display the items.
   Gets called after getting items in getItems function*/
function _displayItems(data) {

    /* Sets the table body to be todos */
    const tBody = document.getElementById('todos');
    tBody.innerHTML = '';

    _displayCount(data.length);

    const button = document.createElement('button');


    /* For each loop to handle how each item should be displayed
       Creates check boxes and buttons for editing/visualizing
       each todo. */

    data.forEach(item => {
      let isCompleteCheckBox = document.createElement('input');
      isCompleteCheckBox.type = 'checkbox';
      isCompleteCheckBox.disabled = 'true';
      isCompleteCheckBox.checked = item.isComplete;

      let editButton = button.cloneNode(false);
      editButton.innerText = 'Edit';
      editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

      let deleteButton = button.cloneNode(false);
      deleteButton.innerText = 'Delete';
      deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

      let tr = tBody.insertRow();

      let td1 = tr.insertCell(0);
      td1.appendChild(isCompleteCheckBox);

      let td2 = tr.insertCell(1);
      let textNode = document.createTextNode(item.name);
      td2.appendChild(textNode);

      let td3 = tr.insertCell(2);
      td3.appendChild(editButton);

      let td4 = tr.insertCell(3);
      td4.appendChild(deleteButton);

    });

    todos = data; 
}





