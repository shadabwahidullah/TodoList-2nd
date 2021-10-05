export function readLocalStorage() {
  return (
    JSON.parse(localStorage.getItem('tasks')) || [
      { desc: 'After Editing a task', completed: true, index: 0 },
      { desc: 'press enter to save it', completed: true, index: 1 },
      { desc: 'for delete hover on 3 dots', completed: true, index: 2 },
    ]
  );
}

export const toDoTasks = readLocalStorage();

export function updateLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(toDoTasks));
}

export function statusUpdate(id, status) {
  this.toDoTasks[id].completed = status;
  localStorage.setItem('tasks', JSON.stringify(toDoTasks));
}
