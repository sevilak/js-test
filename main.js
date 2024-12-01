const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const message = document.getElementById('message');
const emoji = document.getElementById('emoji');

// Lade Aufgaben aus dem Local Storage und frage nach dem Namen
document.addEventListener('DOMContentLoaded', () => {
    const userName = prompt("Wie heißt du?"); // Frage nach dem Namen
    if (userName) {
        alert(`Willkommen, ${userName}!`); // Begrüßungsnachricht
    } else {
        alert("Willkommen!"); // Standardbegüßung
    }
    loadTasks();
}
);

// Füge eine neue Aufgabe hinzu
addTaskButton.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const li = document.createElement('li');
    li.textContent = taskText;

    // Checkbox für erledigt
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            li.classList.add('completed');
            showMessage("Gut gemacht! Weiter so!");
            showEmoji(); // Emoji anzeigen
        } else {
            li.classList.remove('completed');
            hideMessage();
        }
        saveTasks();
    });

    // Löschen-Button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Löschen';
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', () => {
        taskList.removeChild(li);
        saveTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
    taskInput.value = ''; // Eingabefeld leeren
    saveTasks();
}

// Zeige die Erfolgsmeldung an
function showMessage(text) {
    message.textContent = text;
    message.classList.remove('hidden');
}

// Verstecke die Erfolgsmeldung
function hideMessage() {
    message.classList.add('hidden');
}

// Zeige das Emoji an
function showEmoji() {
    emoji.classList.remove('hidden');
    emoji.style.display = 'block'; // Emoji anzeigen

    // Nach 2 Sekunden wieder ausblenden
    setTimeout(() => {
        emoji.style.display = 'none';
    }, 2000);
}

// Speichere Aufgaben im Local Storage
function saveTasks() {
    const tasks = [];
    for (let li of taskList.children) {
        tasks.push({
            text: li.firstChild.textContent,
            completed: li.firstChild.checked
        });
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Lade Aufgaben aus dem Local Storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        if (task.completed) {
            li.classList.add('completed');
        }
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                li.classList.add('completed');
                showMessage("Gut gemacht! Weiter so!");
                showEmoji(); // Emoji anzeigen
            } else {
                li.classList.remove('completed');
                hideMessage();
            }
            saveTasks();
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Löschen';
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(li);
            saveTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}