//import {checkTitleAvailable, createNoteCard, orderKeys} from '/helpers.js';

let form = document.querySelector('#noteTaker');
let archive = document.getElementById('noteArchive');

form.addEventListener('submit', function(event) {
    if (checkTitleAvailable((document.getElementById('title').value)) === true) {
        let time = new Date(Date.now());
        let date = time.toLocaleString();
        let id = JSON.stringify(Date.now());
        let note = document.getElementById('note').value;
        let data = { "note": note, "date": `Posted on: ${date}`, "id": id, timeEdited: "" };

        // store the note
        localStorage.setItem(document.getElementById('title').value, JSON.stringify(data));
                        
        // let the user know the note was successfully stored and reset the form
        event.preventDefault();
        bootbox.alert("Your message has been saved!", function() {
            location.reload();
        });
    } else {
        // send an error to the user
        event.preventDefault();
        bootbox.confirm({
            size: "small",
            message: "Title already in use. Your note will not be saved if you continue!",
            callback: function(result) {
                if (result) {
                    location.reload();
                }
            }
        })
    }
})

// creates an object that will look up note titles by ID number
let archivedNotes = {};

Object.keys(localStorage).forEach(function(key) {
    // unpacks the data object from localStorage
    let data = JSON.parse(localStorage.getItem(key));

    // records the ID of the note against the title
    archivedNotes[data.id] = {key: key, data: data};
});

let unorderedKeys = Object.keys(archivedNotes);
let noteOrder = orderKeys(unorderedKeys);

noteOrder.forEach(function(id) {
    let title = archivedNotes[id].key;
    let data = archivedNotes[id].data;
    let noteCard = createNoteCard(title, data);
    archive.insertBefore(noteCard, archive.childNodes[0]);
})

let deleteButtons = document.getElementsByClassName('delete-note');

Array.from(deleteButtons).forEach(function(button) {
    button.addEventListener('click', function() {
    let title = archivedNotes[button.classList[1]].key;
        if (confirm(`Are you sure you want to remove "${title}"? You can't undo this!`)) {
            localStorage.removeItem(title);
            location.reload();
        }
    })
})

let editButtons = document.getElementsByClassName('edit-note');

Array.from(editButtons).forEach(function(button) {
    button.addEventListener('click', function(event) {
        let title = (archivedNotes[button.classList[1]].key);
        let originalData = (archivedNotes[button.classList[1]].data);
        bootbox.prompt({
            size: "medium",
            title: `Editing "${title}":`,
            inputType: 'textarea',
            value: originalData.note,
            buttons: {
                cancel: {label: 'Cancel'},
                confirm: {label: 'Save'}
                },
            callback: function(result) {
                if (result === null) {
                    localStorage.setItem(title, JSON.stringify(originalData));
                } else {
                    let timeNow = new Date(Date.now());
                    let timeOfEdit = timeNow.toLocaleString();
                    let newData = { "note": result, "date": originalData.date, "id": originalData.id, "timeEdited": `| Edited on: ${timeOfEdit}` };
                    localStorage.setItem(title, JSON.stringify(newData));
                    location.reload();
                }
            }
        })
    })
})

let clearNotes = document.querySelector('#clearLocalStorage');

clearNotes.addEventListener('click', function(event) {
    bootbox.confirm("Are you sure? You can't undo this!", function(result) {
        if (result) {
            localStorage.clear();
            location.reload();
        }
    })
})