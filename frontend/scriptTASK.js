const taskForm = document.getElementById('task-form');
        const taskInput = document.getElementById('task-input');
        const taskList = document.getElementById('task-list');
        const addTaskBtn = document.getElementById('add-task-btn');

        addTaskBtn.addEventListener('click', () => {
            const taskName = taskInput.value.trim();

            if (taskName === '') return;

            const taskItem = document.createElement('div');
            taskItem.className = 'task-item';

            const checkbox = document.createElement('div');
            checkbox.className = 'checkbox';

            const taskNameElement = document.createElement('div');
            taskNameElement.className = 'task-name';
            taskNameElement.textContent = taskName;

            checkbox.addEventListener('click', () => {
                checkbox.classList.toggle('completed');
                taskNameElement.classList.toggle('completed');
            });

            taskItem.appendChild(checkbox);
            taskItem.appendChild(taskNameElement);
            taskList.appendChild(taskItem);

            taskInput.value = '';
        });