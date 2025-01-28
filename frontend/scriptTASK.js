        const taskForm = document.getElementById('task-form');
        const taskInput = document.getElementById('task-input');
        const taskList = document.getElementById('task-list');
        const addTaskBtn = document.getElementById('add-task-btn');

        function deleteTask(taskItem) {
            if (confirm("Do you want to delete this task?")) {
                taskItem.remove();
            }
        }
        
        addTaskBtn.addEventListener('click', () => {

            taskInput.style.display = "block";

            const taskName = taskInput.value.trim();

            if (taskName === '') return;

            const taskItem = document.createElement('div');
            taskItem.className = 'task-item';

            const checkbox = document.createElement('div');
            checkbox.className = 'checkbox';

            const taskNameElement = document.createElement('div');
            taskNameElement.className = 'task-name';
            taskNameElement.textContent = taskName;

            const taskDeleteButton = document.createElement('div'); 
            taskDeleteButton.className = 'class-delete-button'
            taskDeleteButton.attributeStyleMap = '<i class="fa fa-trash-o style="font-size:24px></i>'


            checkbox.addEventListener('click', () => {
                checkbox.classList.toggle('completed');
                taskNameElement.classList.toggle('completed');
            });

            taskItem.appendChild(checkbox);
            taskItem.appendChild(taskNameElement);
            taskList.appendChild(taskItem);
            taskItem.appendChild(taskDeleteButton);

            taskInput.value = '';
        });