// checks if a title can be used in localStorage without overwriting a previous note
function checkTitleAvailable(title) {
    let content = localStorage.getItem(title);

    if (content === null) {
        return true;
    } else {
        return false;
    }
}

// generates a card to hold a note
function createNoteCard(key, data) {
    // creates div element and adds the note-card class to enable css styling
    let card = document.createElement("div");
    card.classList.add("note-card");

    // creates HTML elements for the title, note, and buttons
    let title = createElement("h1", key);
    let date = createElement("p", data.date);
    let note = createElement("p", data.note);
    let buttons = createNoteButtons(
        [{label: "Edit", classes: [data.id, "btn-primary", "edit-note"]},
        {label: "Delete", classes: [data.id, "btn-danger", "delete-note"]}]);

    // adds Bootstrap classes to date element
    date.classList.add("small", "text-muted");

    // adds the created elements to the page
    card.appendChild(title);
    card.appendChild(note);
    card.appendChild(date);
    card.appendChild(buttons);

    return card;
}

// creates an html element and inserts content (data)
function createElement(format, data) {
    let element = document.createElement(format);
    let node = document.createTextNode(data);

    element.appendChild(node);
    return element;
}

// create a basic button
function createButton() {
    let button = document.createElement("button");
    button.classList.add("btn");

    return button;
}

// creates a div element that holds buttons that are tied to specific notes
function createNoteButtons(buttonInfo) {
    // create a div element to hold the buttons in
    let div = document.createElement("div");
    let buttons = [];

    // create a button each button object defined in buttonInfo
    buttonInfo.forEach(function(setOfInfo) {
        let button = createButton();
        let buttonText = document.createTextNode(setOfInfo.label);
        button.appendChild(buttonText);
        setOfInfo.classes.forEach(classItem => button.classList.add(classItem));

        //put each button in the buttons array
        buttons.push(button);
    })

    //put the buttons in the div
    buttons.forEach(button => div.appendChild(button));
    
    return div;
}

// puts the ids used to access note titles in order from smallest to largest (or oldest to newest, as id is based on date made)
function orderKeys(keys) {
    sortedKeys = keys.map(key => parseInt(key))
    sortedKeys.sort();
    sortedKeys.forEach(key => key.toString());

    return sortedKeys;
}