let taskIdCounter = 0;

$(document).ready(function () {
    $('#datetimepicker').datetimepicker();
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const dateInput = document.getElementById('dateInput');
    const timeInput = document.getElementById('timeInput');

    const taskText = taskInput.value.trim();
    const taskDate = dateInput.value;
    const taskTime = timeInput.value;

    if (taskText !== '') {
        const taskList = document.getElementById('pendingTaskList'); // Cambiado a tareas pendientes por defecto

        const listItem = document.createElement('li');
        listItem.id = `task-${taskIdCounter}`;
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        listItem.innerHTML = `
            <span>${taskText} - ${taskDate} ${taskTime}</span>
            <div>
                <button class="btn btn-success btn-sm mr-2" onclick="completeTask(${taskIdCounter})">Completar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteTask(${taskIdCounter})">Eliminar</button>
            </div>
        `;

        taskList.appendChild(listItem);

        taskInput.value = '';
        dateInput.value = '';
        timeInput.value = '';
        taskIdCounter++;
    }
}

function completeTask(taskId) {
    const taskElement = document.getElementById(`task-${taskId}`);
    taskElement.classList.add('list-group-item-success');

    const completedList = document.getElementById('completedTaskList');
    completedList.appendChild(taskElement);

    updateTabs();
}

function deleteTask(taskId) {
    const taskElement = document.getElementById(`task-${taskId}`);
    taskElement.remove();

    updateTabs();
}

function updateTabs() {
    const pendingTab = document.getElementById('pendingTab');
    const completedTab = document.getElementById('completedTab');
    const pendingTasks = document.getElementById('pendingTasks');
    const completedTasks = document.getElementById('completedTasks');

    const pendingTaskList = document.getElementById('pendingTaskList');
    const completedTaskList = document.getElementById('completedTaskList');

    if (pendingTaskList.children.length > 0) {
        pendingTab.classList.add('active');
        completedTab.classList.remove('active');
        pendingTasks.classList.add('show', 'active');
        completedTasks.classList.remove('show', 'active');
    } else if (completedTaskList.children.length > 0) {
        pendingTab.classList.remove('active');
        completedTab.classList.add('active');
        pendingTasks.classList.remove('show', 'active');
        completedTasks.classList.add('show', 'active');
    } else {
        pendingTab.classList.add('active');
        completedTab.classList.remove('active');
        pendingTasks.classList.add('show', 'active');
        completedTasks.classList.remove('show', 'active');
    }
}
