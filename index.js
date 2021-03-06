let form = document.querySelector('#noteTaker');

form.addEventListener('submit', function(event) {
    // if the title is available, store the note, otherwise warn the user
    if (checkTitleAvailable((document.getElementById('title').value)) === true) {
        // time is used as an id for each note, and also to create the time and date string displayed to the user
        let time = new Date(Date.now());
        let id = JSON.stringify(Date.now());
        let date = time.toLocaleString();
        let note = document.getElementById('note').value;

        // data holds everything needed to access the note later
        let data = { note: note, date: `Posted on: ${date}`, id: id, timeEdited: "" };

        // store the note using the title as a key
        localStorage.setItem(document.getElementById('title').value, JSON.stringify(data));
                        
        // let the user know the note was successfully stored and reset the form
        event.preventDefault();
        bootbox.alert("Your message has been saved!", function() {
            location.reload();
        });
    } else {
        event.preventDefault();

        // if the user chooses cancel, their note is preserved so that they can edit the title. otherwise, the form is reset
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

    // records the ID of the note against the title and data
    archivedNotes[data.id] = {key: key, data: data};
});

// this takes the keys and puts them in order from newest to oldest
let unorderedKeys = Object.keys(archivedNotes);
let noteOrder = orderKeys(unorderedKeys);

let archive = document.getElementById('noteArchive');

// creates a card display for each note on the page
noteOrder.forEach(function(id) {
    let title = archivedNotes[id].key;
    let data = archivedNotes[id].data;
    let noteCard = createNoteCard(title, data);
    archive.insertBefore(noteCard, archive.childNodes[0]);
})

let deleteButtons = document.getElementsByClassName('delete-note');

// if a user clicks a delete button for a post, require user confirmation before deleting
Array.from(deleteButtons).forEach(function(button) {
    button.addEventListener('click', function() {
    let title = archivedNotes[button.classList[1]].key;
        bootbox.confirm(`Are you sure you want to remove "${title}"? You can't undo this!`, function(result) {
            if (result) {
            localStorage.removeItem(title);
            location.reload();
            }
        })
    })
})

let editButtons = document.getElementsByClassName('edit-note');

// users can edit the content of a note, but not the title
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
                // if the user selects cancel (ie returns null) store the original note, otherwise store the time of edit and the new content
                if (result === null) {
                    localStorage.setItem(title, JSON.stringify(originalData));
                } else {
                    let timeNow = new Date(Date.now());
                    let timeOfEdit = timeNow.toLocaleString();
                    let newData = { note: result, date: originalData.date, id: originalData.id, timeEdited: `  |  Edited on: ${timeOfEdit}` };
                    localStorage.setItem(title, JSON.stringify(newData));
                    location.reload();
                }
            }
        })
    })
})

let clearNotes = document.querySelector('#clearLocalStorage');

// if the user selects "Clear All Notes", require them to confirm before deleting
clearNotes.addEventListener('click', function(event) {
    bootbox.confirm("Are you sure? You can't undo this!", function(result) {
        if (result) {
            localStorage.clear();
            location.reload();
        }
    })
})