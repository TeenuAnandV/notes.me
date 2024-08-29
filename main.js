document.addEventListener('DOMContentLoaded', function() {
    // Initialize event listeners for home image and exit image
    initializeHomeImage();
    initializeExitImage();

    // Initialize drag-and-drop delete functionality
    initializeDeleteFunctionality();

    // Load notes from local storage when the page loads
    loadNotes();

    // Add event listener to the "Add New" button
    const addNewButton = document.getElementById('addnew');
    addNewButton.addEventListener('click', () => {
        addNewNote();
    });

    // Add event listener to the search input field
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', function() {
        searchNotes(this.value.toLowerCase());
    });
});

// Function to initialize the home image click event
function initializeHomeImage() {
    const homeImage = document.getElementById('homeImage');
    if (homeImage) {
        homeImage.addEventListener('click', function() {
            console.log('Home image clicked');
            window.location.href = 'main.html'; // Change the URL as needed
        });
    } else {
        console.log('Home image not found');
    }
}

// Function to initialize the exit image click event
function initializeExitImage() {
    const exitImage = document.getElementById('exitimg');
    if (exitImage) {
        exitImage.addEventListener('click', function() {
            console.log('Exit image clicked');
            window.location.href = 'loginpage.html'; // Change the URL as needed
        });
    } else {
        console.log('Exit image not found');
    }
}

// Function to toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Function to add a new note
function addNewNote() {
    console.log('Add new button clicked');
    createNoteContainer();
    saveNotes(); // Save notes after adding a new one
}

// Function to generate a random light color
function getRandomLightColor() {
    const letters = '89ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}

// Function to create a note container
function createNoteContainer(noteText = '') {
    const notesContainer = document.getElementById('notes-container');
    
    const newNoteContainer = document.createElement('div');
    newNoteContainer.classList.add('note-container');
    newNoteContainer.setAttribute('draggable', 'true'); // Make the note draggable
    newNoteContainer.id = 'note-' + Date.now(); // Unique ID for each note

    const newNoteInput = document.createElement('textarea');
    newNoteInput.classList.add('note-input');
    newNoteInput.setAttribute('placeholder', 'Write your notes here...');
    newNoteInput.value = noteText;

    newNoteInput.style.backgroundColor = getRandomLightColor();

    newNoteInput.addEventListener('input', saveNotes); // Save notes when the input changes

      // Prevent double-click from inserting the ID
      newNoteInput.addEventListener('dblclick', function(event) {
        event.preventDefault();
    });

    newNoteContainer.appendChild(newNoteInput);
    
    // Insert the new note at the beginning of the notes container
    notesContainer.insertBefore(newNoteContainer, notesContainer.firstChild);

    // Add event listener for dragstart
    newNoteContainer.addEventListener('dragstart', function(event) {
        event.dataTransfer.setData('text/plain', event.target.id);
        event.target.classList.add('dragging'); // Optional: Add a class to indicate dragging
    });

    newNoteContainer.addEventListener('dragend', function(event) {
        event.target.classList.remove('dragging'); // Remove the dragging class
    });
}

// Function to save notes to local storage
function saveNotes() {
    const notes = [];
    document.querySelectorAll('.note-input').forEach(note => {
        notes.push(note.value);
    });
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Function to load notes from local storage
function loadNotes() {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    savedNotes.reverse(); // Reverse the order of the notes
    savedNotes.forEach(noteText => {
        createNoteContainer(noteText);
    });
}

// Function to search notes
function searchNotes(query) {
    document.querySelectorAll('.note-container').forEach(noteContainer => {
        const noteText = noteContainer.querySelector('.note-input').value.toLowerCase();
        if (noteText.includes(query)) {
            noteContainer.style.display = '';
        } else {
            noteContainer.style.display = 'none';
        }
    });
}

// Function to initialize drag-and-drop delete functionality
function initializeDeleteFunctionality() {
    const deleteButton = document.getElementById('deleteimg');

    if (deleteButton) {
        deleteButton.addEventListener('dragover', function(event) {
            event.preventDefault(); // Allow drop
            deleteButton.classList.add('drag-over'); // Add hover effect
        });

        deleteButton.addEventListener('dragleave', function() {
            deleteButton.classList.remove('drag-over'); // Remove hover effect
        });

        deleteButton.addEventListener('drop', function(event) {
            event.preventDefault(); // Prevent default drop behavior
            deleteButton.classList.remove('drag-over'); // Remove hover effect

            // Delete the dragged note
            const draggedNoteId = event.dataTransfer.getData('text/plain');
            const note = document.getElementById(draggedNoteId);
            if (note) {
                note.remove(); // Remove note element
                saveNotes(); // Save changes to local storage
            }
        });
    }
}
