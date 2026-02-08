let tasks = [];
let currentFilter = 'all';
let taskForm;
let filtersSelect;
let taskInput;
let taskList;

const addTask = (tasks, description) => {
    return [
        ...tasks,
        {id: Date.now(), description, completed: false}
    ]
};

const updateTask = (tasks, taskId, updates) => {
    return tasks.map(task =>
        task.id === taskId ? {...task, ...updates} : task
    );
}

const removeTask = (tasks, taskId) => {
    return tasks.filter(task => task.id !== taskId);
}

const filterTasks = (tasks, filter) => {
    switch (filter) {
        case 'active':
            return tasks.filter(task => !task.completed);
        case 'completed':
            return tasks.filter(task => task.completed);
        default:
            return tasks;
    }
};

const renderTasks = (newTasks, container) => {
    container.innerHTML = '';

    newTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item' + (task.completed ? ' completed' : '');
        li.innerHTML = `
          <span class="task-description">${task.description}</span>
          <div class="task-actions">
            <button data-action="toggle" data-id="${task.id}" class="task-action">
              ${task.completed ? 'Отменить выполнение' : 'Выполнить'}
            </button>
            <button data-action="delete" data-id="${task.id}" class="task-action">Удалить</button>
          </div>
        `;

        li.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = Number(btn.dataset.id);
                const action = btn.dataset.action;

                if (action === 'toggle') {
                    tasks = updateTask(tasks, id, {completed: !task.completed});
                } else if (action === 'delete') {
                    tasks = removeTask(tasks, id);
                }

                updateDisplay();
            });
        });

        container.appendChild(li);
    });
};

const updateDisplay = () => {
    const filteredTasks = filterTasks(tasks, currentFilter);
    renderTasks(filteredTasks, taskList);
    save(tasks);
};

const save = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const getExistingTasks = () => {
    const tasks = localStorage.getItem('tasks') ?? '[]';

    return JSON.parse(tasks);
}

const getElements = () => {
    taskForm = document.getElementById('task-form');
    filtersSelect = document.getElementById('filters');
    taskInput = document.getElementById('task-input');
    taskList = document.getElementById('task-list');

    return {taskForm, filtersSelect, taskInput, taskList}
}

const addEventListeners = (form, input, filters) => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const description = input.value.trim();

        if (!description) return;

        tasks = addTask(tasks, description);
        input.value = '';
        updateDisplay();
    });

    filters.addEventListener('change', (event) => {
        currentFilter = event.target.value;
        updateDisplay();
    });
}

const init = () => {
    tasks = getExistingTasks();

    const {taskForm, taskInput, filtersSelect} = getElements();

    addEventListeners(taskForm, taskInput, filtersSelect);
    updateDisplay();
}

window.addEventListener('DOMContentLoaded', () => init());
