import _, { divide, padStart } from 'lodash'; // eslint-disable-line no-unused-vars
import * as statusModule from './status';
import * as newTaskModule from './newTask';
import './style.css';

const tasksWrapper = document.querySelector('.listWrapper');
const tasks = document.querySelector('.list');
const newForm = document.querySelector('.newTask');

// creates a view for task t
function createTask(t) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('list-item', 'flex-space-between');
  wrapper.id = t.index;

  const element = document.createElement('form');
  element.classList.add('flex');

  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.classList.add('margin');
  checkBox.checked = t.completed;

  checkBox.addEventListener('click', (event) => {
    statusModule.statusUpdate(
      event.target.parentElement.parentElement.id,
      event.target.checked,
    );
    statusModule.updateLocalStorage();
  });

  const task = document.createElement('input');
  task.type = 'text';
  task.classList.add('text', 'margin', 'taskWidth');
  task.value = t.desc;
  task.readOnly = true;

  // add listener for task to be editable
  task.addEventListener('click', () => { task.readOnly = false; });
  element.addEventListener('submit', (event) => {
    event.preventDefault();
    task.readOnly = true;
    newTaskModule.editTask({
      newDesc: task.value,
      index: event.target.parentElement.id,
    });
  });

  const more = document.createElement('i');
  more.classList.add('fa', 'fa-ellipsis-v', 'fa-v', 'fa-2x', 'margin');

  const deleteBtn = document.createElement('i');
  deleteBtn.classList.add('fa', 'fa-trash', 'fa-2x', 'margin', 'hidden');

  // changes 3 dot icon to trash bin when mouse cursor gets over 3 dot
  more.addEventListener('mouseover', () => {
    more.classList.add('hidden');
    deleteBtn.classList.remove('hidden');
  });

  // reverse the change for trash bin to 3 dots when the mouse cursor moves out
  deleteBtn.addEventListener('mouseout', () => {
    more.classList.remove('hidden');
    deleteBtn.classList.add('hidden');
  });

  deleteBtn.addEventListener('click', (event) => {
    const parent = event.target.parentElement;
    newTaskModule.deleteTask(parent.id);
    regenerateTasks(); // eslint-disable-line no-use-before-define
  });

  element.append(checkBox, task);
  wrapper.append(element, more, deleteBtn);

  tasks.appendChild(wrapper);
}

// empties the tasks element and refill it with
// updated tasks
function regenerateTasks() {
  tasks.innerHTML = '';
  // create all tasks again
  statusModule.toDoTasks.forEach((e) => {
    createTask(e);
  });
}

statusModule.toDoTasks.forEach((e) => {
  createTask(e);
});

// create the a button at the end of list for
// clearing the completed tasks
function clearAllBtn() {
  const btn = document.createElement('button');
  btn.classList.add('button');
  btn.innerHTML = 'Clear All Completed';
  btn.addEventListener('click', () => {
    tasks.innerHTML = '';
    newTaskModule.removeCompletedTasks();
    regenerateTasks();
  });
  tasksWrapper.appendChild(btn);
}

newForm.addEventListener('submit', (event) => {
  const newTask = document.querySelector('.newTaskName');
  event.preventDefault();
  newTaskModule.addNewTask(newTask);
  createTask(statusModule.toDoTasks[statusModule.toDoTasks.length - 1]);
});

clearAllBtn();
