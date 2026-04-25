const tasks = [];

function addTask() {
  const newTask = document.getElementById('new-task').value;
  if (newTask.trim() !== '') {
    tasks.push({ task: newTask, completed: false });
    const taskIndex = tasks.length - 1;
    const listItem = document.createElement('li');
    listItem.className = 'todo-item';
    
    const taskNameElement = document.createElement('span');
    taskNameElement.innerText = newTask;
    listItem.appendChild(taskNameElement);

    const renameButton = document.createElement('button');
    renameButton.innerText = '✏️';
    renameButton.className = 'rename-btn';
    renameButton.addEventListener('click', function(event) {
      event.stopPropagation();
      const newName = prompt('Введите новое название задачи:', tasks[taskIndex].task);
      if (newName && newName.trim() !== '') {
        tasks[taskIndex].task = newName.trim();
        taskNameElement.innerText = newName.trim();
      }
    });
    listItem.appendChild(renameButton);

    const deleteButton = document.createElement('button');
    deleteButton.innerText = '❌';
    deleteButton.className = 'delete-btn';
    deleteButton.addEventListener('click', function(event) {
      event.stopPropagation();
      tasks.splice(taskIndex, 1);
      listItem.remove();

      const listItems = document.getElementById('todo-list').children;
      for (let i = 0; i < listItems.length; i++) {
        listItems[i].addEventListener('click', function() {
          tasks[i].completed = !tasks[i].completed;
          this.classList.toggle('completed');
        });
      }
    });
    listItem.appendChild(deleteButton);

    listItem.addEventListener('click', function() {
      tasks[taskIndex].completed = !tasks[taskIndex].completed;
      listItem.classList.toggle('completed');
    });

    document.getElementById('todo-list').appendChild(listItem);
    document.getElementById('new-task').value = '';
  }
}

document.getElementById('add-button').onclick = addTask;