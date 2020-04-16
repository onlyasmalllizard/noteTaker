# noteTaker

noteTaker is a web app that stores the notes you make in your browser's local storage.

## Feature Wish List

These are the features I would like to implement on top of the current build.

### Date Features

#### Location-based date-getting

Currently, noteTaker uses GMT because that's the time zone I'm in. I'd like to change this so that it displays the local time for the user no matter what time zone they're in.

#### Daylight Savings recognition

noteTaker doesn't take Daylight Saving Time into account, meaning the time given for note creation and editing is one hour off for a good portion of the year.

### Display Features

#### User-decided order of notes

noteTaker displays notes from newest to oldest, but it would be nice to let the user decide what order to display them in. From the current code, it would be easy to implement a choice between newest => oldest, oldest => newest, and alphabetical by title.

#### Note categorisation

The ability to sort notes into categories, maybe even displaying only one category at a time based on user choice.

#### Markdown

The ability for the user to use markdown when writing their notes.

### Export Features

#### Email

The user could email the note to themself or a friend.

#### Download

The user could download their note as a file.