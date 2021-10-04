import * as statusModule from './status';

export function addNewTask(newTask) {
  statusModule.toDoTasks.push({
    desc: newTask.value,
    completed: false,
    index: statusModule.toDoTasks.length + 1,
  });
  newTask.value = '';
  statusModule.updateLocalStorage();
}

export function editTask({ newDesc, index }) {
  statusModule.toDoTasks[index].desc = newDesc;
  statusModule.updateLocalStorage();
}

// update indexes to be sequential
export function updateIndexes() {
  let newIndex = 1;
  statusModule.toDoTasks.forEach((element) => {
    element.index = newIndex;
    newIndex += 1;
  });
}

export function deleteTask(index) {
  // delete task with specific index
  statusModule.toDoTasks.splice(index, 1);
  updateIndexes();
  statusModule.updateLocalStorage();
}

// remove tasks with completed attribute set to true
export function removeCompletedTasks() {
  const temp = statusModule.toDoTasks.filter((t) => !t.completed);
  // empties Todo list
  statusModule.toDoTasks.splice(0, statusModule.toDoTasks.length);
  // add uncompleted tasks back to Todo list
  temp.forEach((i) => {
    statusModule.toDoTasks.push(i);
  });
  updateIndexes();
  statusModule.updateLocalStorage();
}
