"use strict"

const taskForm = document.getElementById('task-form')
const tasksListElement = document.getElementById('task-list')
const completedTasksCnt = document.querySelector('.completed-list')
const checkedTasksListElement = document.querySelector('.completed-tasks')

let tasksListToDo = []
let checkedTasksList = []

try {
	tasksListToDo = JSON.parse(localStorage.getItem('tasksToDo')) || []
} catch (e) {
	tasksListToDo = []
}

try {
	checkedTasksList = JSON.parse(localStorage.getItem('tasksCompleted')) || []
} catch (e) {
	checkedTasksList = []
}

const updateLocalStorage = () => {
	localStorage.setItem('tasksToDo', JSON.stringify(tasksListToDo))
	localStorage.setItem('tasksCompleted', JSON.stringify(checkedTasksList))
}

const renderTaskItem = (taskText, taskId, isCompleted = false) => {
	const taskItem = document.createElement('li')
	taskItem.className = 'task neumorphic'
	taskItem.dataset.id = taskId

	taskItem.innerHTML = `
	<span>${taskText}</span>
		<div class="task-buttons">
		${!isCompleted ? `
			<button class="check-button task-button" aria-label="Check task">
				<svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
					<path d="M19.7851 6.67391L8.78513 17.6739C8.72128 17.7378 8.64546 17.7885 8.56199 17.8231C8.47853 17.8577 8.38907 17.8755 8.29872 17.8755C8.20837 17.8755 8.11891 17.8577 8.03545 17.8231C7.95199 17.7885 7.87617 17.7378 7.81232 17.6739L2.99982 12.8614C2.87081 12.7324 2.79834 12.5574 2.79834 12.375C2.79834 12.1926 2.87081 12.0176 2.99982 11.8886C3.12882 11.7596 3.30378 11.6871 3.48622 11.6871C3.66866 11.6871 3.84363 11.7596 3.97263 11.8886L8.29872 16.2155L18.8123 5.70109C18.9413 5.57209 19.1163 5.49962 19.2987 5.49962C19.4812 5.49962 19.6561 5.57209 19.7851 5.70109C19.9141 5.8301 19.9866 6.00506 19.9866 6.1875C19.9866 6.36994 19.9141 6.5449 19.7851 6.67391Z" fill="currentColor"></path>
				</svg>
			</button>
			`
			: ''}
			<button class="delete-button task-button" aria-label="Remove task">
				<svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
					<path d="M18.6112 4.125H3.48621C3.30387 4.125 3.129 4.19743 3.00007 4.32636C2.87114 4.4553 2.79871 4.63016 2.79871 4.8125C2.79871 4.99484 2.87114 5.1697 3.00007 5.29864C3.129 5.42757 3.30387 5.5 3.48621 5.5H4.17371V17.875C4.17371 18.2397 4.31857 18.5894 4.57643 18.8473C4.8343 19.1051 5.18403 19.25 5.54871 19.25H16.5487C16.9134 19.25 17.2631 19.1051 17.521 18.8473C17.7788 18.5894 17.9237 18.2397 17.9237 17.875V5.5H18.6112C18.7935 5.5 18.9684 5.42757 19.0973 5.29864C19.2263 5.1697 19.2987 4.99484 19.2987 4.8125C19.2987 4.63016 19.2263 4.4553 19.0973 4.32636C18.9684 4.19743 18.7935 4.125 18.6112 4.125ZM16.5487 17.875H5.54871V5.5H16.5487V17.875ZM6.92371 2.0625C6.92371 1.88016 6.99614 1.7053 7.12507 1.57636C7.254 1.44743 7.42887 1.375 7.61121 1.375H14.4862C14.6685 1.375 14.8434 1.44743 14.9723 1.57636C15.1013 1.7053 15.1737 1.88016 15.1737 2.0625C15.1737 2.24484 15.1013 2.4197 14.9723 2.54864C14.8434 2.67757 14.6685 2.75 14.4862 2.75H7.61121C7.42887 2.75 7.254 2.67757 7.12507 2.54864C6.99614 2.4197 6.92371 2.24484 6.92371 2.0625Z" fill="currentColor"></path>
				</svg>
			</button>
		</div>
	`
	return taskItem
}

const addNewTask = (taskText) => {
	const task = {
		id: Date.now(),
		title: taskText,
		isCompleted: false,
	}
	tasksListToDo.push(task)
	
	updateLocalStorage()

	const taskItem = renderTaskItem(task.title, task.id)
	tasksListElement.insertAdjacentElement('beforeend', taskItem)
}

const getTaskIndex = (id, tasks) => tasks.findIndex(task => task.id === id)

const deleteTask = (id, tasks) => {
	const taskIndex = getTaskIndex(id, tasks)
	if (taskIndex !== -1) {
		tasks.splice(taskIndex, 1)
	}

	updateLocalStorage()
}

const checkTask = (id, tasks) => {
	const taskIndex = getTaskIndex(id, tasks)

	if (taskIndex !== -1) {
		const [task] = tasks.splice(taskIndex, 1)
		task.isCompleted = true
		checkedTasksList.push(task)

		updateLocalStorage()

		let taskItem = renderTaskItem(task.title, task.id, true)
		taskItem.className = 'completed-task task neumorphic'
		checkedTasksListElement.insertAdjacentElement('beforeend', taskItem)
	}
}

taskForm.addEventListener('submit', (e) => {
	e.preventDefault()

	const taskInput = document.getElementById('add-task-input')
	const taskText = taskInput.value.trim()

	if (taskText !== '') {
		addNewTask(taskText)
		taskInput.value = ''
	}
})

document.addEventListener('click', (e) => {
	const targetElement = e.target
	const currentTaskItem = targetElement.closest('li')
	let currentTaskId
	if (currentTaskItem) {
		currentTaskId = parseInt(currentTaskItem.dataset.id)
	}
	

	if (targetElement.tagName === 'BUTTON' && targetElement.classList.contains('delete-button')) {
		deleteTask(currentTaskId, tasksListToDo)
		deleteTask(currentTaskId, checkedTasksList)

		if (checkedTasksList.length === 0) {
			completedTasksCnt.classList.add('is-hidden')
		}

		currentTaskItem.remove()
	}

	if (targetElement.tagName === 'BUTTON' && targetElement.classList.contains('check-button')) {
		checkTask(currentTaskId, tasksListToDo)
		if (checkedTasksList.length !== 0) {
			completedTasksCnt.classList.remove('is-hidden')
		}
		currentTaskItem.remove()
	}
})

tasksListToDo.forEach(task => {
	const taskItem = renderTaskItem(task.title, task.id)
	tasksListElement.insertAdjacentElement('beforeend', taskItem)
})

checkedTasksList.forEach(task => {
	const taskItem = renderTaskItem(task.title, task.id, true)
	taskItem.className = 'completed-task task neumorphic'
	checkedTasksListElement.insertAdjacentElement('beforeend', taskItem)
})

if (checkedTasksList.length !== 0) {
	completedTasksCnt.classList.remove('is-hidden')
}