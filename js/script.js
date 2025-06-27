"use strict"

// Select DOM Elements
const taskForm = document.getElementById('task-form')
const tasksListElement = document.getElementById('task-list')
const tasksCnt = document.querySelector('.tasks-cnt')
const completedTasksCnt = document.querySelector('.completed-tasks-cnt')
const completedListElement = document.querySelector('.completed-tasks')

// SVS Icons
const iconCheck = `<svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
					<path d="M19.7851 6.67391L8.78513 17.6739C8.72128 17.7378 8.64546 17.7885 8.56199 17.8231C8.47853 17.8577 8.38907 17.8755 8.29872 17.8755C8.20837 17.8755 8.11891 17.8577 8.03545 17.8231C7.95199 17.7885 7.87617 17.7378 7.81232 17.6739L2.99982 12.8614C2.87081 12.7324 2.79834 12.5574 2.79834 12.375C2.79834 12.1926 2.87081 12.0176 2.99982 11.8886C3.12882 11.7596 3.30378 11.6871 3.48622 11.6871C3.66866 11.6871 3.84363 11.7596 3.97263 11.8886L8.29872 16.2155L18.8123 5.70109C18.9413 5.57209 19.1163 5.49962 19.2987 5.49962C19.4812 5.49962 19.6561 5.57209 19.7851 5.70109C19.9141 5.8301 19.9866 6.00506 19.9866 6.1875C19.9866 6.36994 19.9141 6.5449 19.7851 6.67391Z" fill="currentColor"></path>
				</svg>`
const iconDelete = `<svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none">
					<path d="M18.6112 4.125H3.48621C3.30387 4.125 3.129 4.19743 3.00007 4.32636C2.87114 4.4553 2.79871 4.63016 2.79871 4.8125C2.79871 4.99484 2.87114 5.1697 3.00007 5.29864C3.129 5.42757 3.30387 5.5 3.48621 5.5H4.17371V17.875C4.17371 18.2397 4.31857 18.5894 4.57643 18.8473C4.8343 19.1051 5.18403 19.25 5.54871 19.25H16.5487C16.9134 19.25 17.2631 19.1051 17.521 18.8473C17.7788 18.5894 17.9237 18.2397 17.9237 17.875V5.5H18.6112C18.7935 5.5 18.9684 5.42757 19.0973 5.29864C19.2263 5.1697 19.2987 4.99484 19.2987 4.8125C19.2987 4.63016 19.2263 4.4553 19.0973 4.32636C18.9684 4.19743 18.7935 4.125 18.6112 4.125ZM16.5487 17.875H5.54871V5.5H16.5487V17.875ZM6.92371 2.0625C6.92371 1.88016 6.99614 1.7053 7.12507 1.57636C7.254 1.44743 7.42887 1.375 7.61121 1.375H14.4862C14.6685 1.375 14.8434 1.44743 14.9723 1.57636C15.1013 1.7053 15.1737 1.88016 15.1737 2.0625C15.1737 2.24484 15.1013 2.4197 14.9723 2.54864C14.8434 2.67757 14.6685 2.75 14.4862 2.75H7.61121C7.42887 2.75 7.254 2.67757 7.12507 2.54864C6.99614 2.4197 6.92371 2.24484 6.92371 2.0625Z" fill="currentColor"></path>
				</svg>`
const iconEdit = `<svg viewBox="0 0 24 24" fill="transparent" width="23" height="22" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14.3601 4.07866L15.2869 3.15178C16.8226 1.61607 19.3125 1.61607 20.8482 3.15178C22.3839 4.68748 22.3839 7.17735 20.8482 8.71306L19.9213 9.63993M14.3601 4.07866C14.3601 4.07866 14.4759 6.04828 16.2138 7.78618C17.9517 9.52407 19.9213 9.63993 19.9213 9.63993M14.3601 4.07866L5.83882 12.5999C5.26166 13.1771 4.97308 13.4656 4.7249 13.7838C4.43213 14.1592 4.18114 14.5653 3.97634 14.995C3.80273 15.3593 3.67368 15.7465 3.41556 16.5208L2.32181 19.8021M19.9213 9.63993L11.4001 18.1612C10.8229 18.7383 10.5344 19.0269 10.2162 19.2751C9.84082 19.5679 9.43469 19.8189 9.00498 20.0237C8.6407 20.1973 8.25352 20.3263 7.47918 20.5844L4.19792 21.6782M4.19792 21.6782L3.39584 21.9456C3.01478 22.0726 2.59466 21.9734 2.31063 21.6894C2.0266 21.4053 1.92743 20.9852 2.05445 20.6042L2.32181 19.8021M4.19792 21.6782L2.32181 19.8021" stroke="currentColor" stroke-width="1.5"></path> </g></svg>`
const iconDragAndDrop = `<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" width="23" height="22" enable-background="new 0 0 52 52" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M20,4c2.2,0,4,1.8,4,4s-1.8,4-4,4s-4-1.8-4-4S17.8,4,20,4z M32,4c2.2,0,4,1.8,4,4 s-1.8,4-4,4s-4-1.8-4-4S29.8,4,32,4z M20,16c2.2,0,4,1.8,4,4s-1.8,4-4,4s-4-1.8-4-4S17.8,16,20,16z M32,16c2.2,0,4,1.8,4,4 s-1.8,4-4,4s-4-1.8-4-4S29.8,16,32,16z M20,28c2.2,0,4,1.8,4,4s-1.8,4-4,4s-4-1.8-4-4S17.8,28,20,28z M32,28c2.2,0,4,1.8,4,4 s-1.8,4-4,4s-4-1.8-4-4S29.8,28,32,28z M20,40c2.2,0,4,1.8,4,4s-1.8,4-4,4s-4-1.8-4-4S17.8,40,20,40z M32,40c2.2,0,4,1.8,4,4 s-1.8,4-4,4s-4-1.8-4-4S29.8,40,32,40z"></path> </g> </g></svg>`
const iconSettings = `<svg viewBox="0 0 24 24" fill="none" width="23" height="22" xmlns="http://www.w3.org/2000/svg"><g stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5"></circle> <path d="M13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74457 2.35523 9.35522 2.74458 9.15223 3.23463C9.05957 3.45834 9.0233 3.7185 9.00911 4.09799C8.98826 4.65568 8.70226 5.17189 8.21894 5.45093C7.73564 5.72996 7.14559 5.71954 6.65219 5.45876C6.31645 5.2813 6.07301 5.18262 5.83294 5.15102C5.30704 5.08178 4.77518 5.22429 4.35436 5.5472C4.03874 5.78938 3.80577 6.1929 3.33983 6.99993C2.87389 7.80697 2.64092 8.21048 2.58899 8.60491C2.51976 9.1308 2.66227 9.66266 2.98518 10.0835C3.13256 10.2756 3.3397 10.437 3.66119 10.639C4.1338 10.936 4.43789 11.4419 4.43786 12C4.43783 12.5581 4.13375 13.0639 3.66118 13.3608C3.33965 13.5629 3.13248 13.7244 2.98508 13.9165C2.66217 14.3373 2.51966 14.8691 2.5889 15.395C2.64082 15.7894 2.87379 16.193 3.33973 17C3.80568 17.807 4.03865 18.2106 4.35426 18.4527C4.77508 18.7756 5.30694 18.9181 5.83284 18.8489C6.07289 18.8173 6.31632 18.7186 6.65204 18.5412C7.14547 18.2804 7.73556 18.27 8.2189 18.549C8.70224 18.8281 8.98826 19.3443 9.00911 19.9021C9.02331 20.2815 9.05957 20.5417 9.15223 20.7654C9.35522 21.2554 9.74457 21.6448 10.2346 21.8478C10.6022 22 11.0681 22 12 22C12.9319 22 13.3978 22 13.7654 21.8478C14.2554 21.6448 14.6448 21.2554 14.8477 20.7654C14.9404 20.5417 14.9767 20.2815 14.9909 19.902C15.0117 19.3443 15.2977 18.8281 15.781 18.549C16.2643 18.2699 16.8544 18.2804 17.3479 18.5412C17.6836 18.7186 17.927 18.8172 18.167 18.8488C18.6929 18.9181 19.2248 18.7756 19.6456 18.4527C19.9612 18.2105 20.1942 17.807 20.6601 16.9999C21.1261 16.1929 21.3591 15.7894 21.411 15.395C21.4802 14.8691 21.3377 14.3372 21.0148 13.9164C20.8674 13.7243 20.6602 13.5628 20.3387 13.3608C19.8662 13.0639 19.5621 12.558 19.5621 11.9999C19.5621 11.4418 19.8662 10.9361 20.3387 10.6392C20.6603 10.4371 20.8675 10.2757 21.0149 10.0835C21.3378 9.66273 21.4803 9.13087 21.4111 8.60497C21.3592 8.21055 21.1262 7.80703 20.6602 7C20.1943 6.19297 19.9613 5.78945 19.6457 5.54727C19.2249 5.22436 18.693 5.08185 18.1671 5.15109C17.9271 5.18269 17.6837 5.28136 17.3479 5.4588C16.8545 5.71959 16.2644 5.73002 15.7811 5.45096C15.2977 5.17191 15.0117 4.65566 14.9909 4.09794C14.9767 3.71848 14.9404 3.45833 14.8477 3.23463C14.6448 2.74458 14.2554 2.35523 13.7654 2.15224Z" stroke="currentColor" stroke-width="1.5"></path> </g></svg>`
const iconMoveUp = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="23" height="22" fill="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M3.25 11H9v10h6V11h5.75L12 2.25zM14 10v10h-4V10H5.664L12 3.664 18.336 10z"></path><path fill="none" d="M0 0h24v24H0z"></path></g></svg>`
const iconMoveDown = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="23" height="22" fill="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M15 3H9v10H3.25L12 21.75 20.75 13H15zm3.336 11L12 20.336 5.664 14H10V4h4v10z"></path><path fill="none" d="M0 0h24v24H0z"></path></g></svg>`

// Create an empty array for tasks
let tasksList = []

// Try to read saved tasks from LocalStorage
try {
	tasksList = JSON.parse(localStorage.getItem('tasksToDo')) || []
} catch (e) {
	tasksList = []
}

// Function to update LocalStorage
const updateLocalStorage = () => {
	localStorage.setItem('tasksToDo', JSON.stringify(tasksList))
}

// Function to add new task
const addNewTask = (taskText) => {

	if (!taskText.trim()) return

	const task = {
		id: Date.now(),
		title: taskText,
		isCompleted: false
	}
	tasksList.push(task)
	updateLocalStorage()
	rerenderTasks()
}

// Render one task element
const renderTaskItem = (taskText, taskId, isCompleted = false, taskIndex = 0, length = 0) => {
	const taskItem = document.createElement('li')
	taskItem.className = 'task neumorphic'
	taskItem.classList.toggle('active-task', !isCompleted)
	taskItem.dataset.id = taskId
	taskItem.draggable = "true"

	const isFirstTask = taskIndex === 0
	const isLastTask = taskIndex === length - 1
	const isMoreThanOneTask = length > 1

	taskItem.innerHTML = `
	<span contentEditable="false">${taskText}</span>
	<div class="task-buttons">
	${!isCompleted ? `
		<button class="edit-button task-button" aria-label="Edit task">${iconEdit}</button>
		<button class="check-button task-button" aria-label="Check task">${iconCheck}</button>
		<button class="settings-button task-button" aria-label="Task options">
			${iconSettings}
		</button>
		` : ''}
		<button class="delete-button task-button" aria-label="Remove task">
			${iconDelete}
		</button>
		${!isCompleted ? `<button class="drag-and-drop-button task-button" aria-label="Check task">${iconDragAndDrop}</button>` : ''}
	</div>

	<ul class="settings-menu is-hidden">
		<li data-action="edit"><button class="edit-button task-button" aria-label="Edit task">${iconEdit}</button></li>
		<li data-action="check"><button class="check-button task-button" aria-label="Check task">${iconCheck}</button></li>
		<li data-action="up"><button class="check-button task-button" ${isFirstTask || !isMoreThanOneTask ? 'disabled' : ''} aria-label="Move up task">${iconMoveUp}</button></li>
		<li data-action="down"><button class="check-button task-button" ${isLastTask || !isMoreThanOneTask ? 'disabled' : ''} aria-label="Move down task">${iconMoveDown}</button></li>
		<li data-action="delete"><button class="delete-button task-button" aria-label="Remove task">
			${iconDelete}
		</button></li>
	</ul>
	`
	return taskItem
}

// Render all tasks
const rerenderTasks = () => {
	tasksListElement.innerHTML = ''
	completedListElement.innerHTML = ''
	const tasksToDo = tasksList.filter(task => !task.isCompleted)
	const completedTasks = tasksList.filter(task => task.isCompleted)
		
	tasksToDo.forEach((task, index) => {
		const taskItem = renderTaskItem(task.title, task.id, task.isCompleted, index, tasksToDo.length)
		tasksListElement.appendChild(taskItem)
		// taskItem.classList.toggle('completed-task', task.isCompleted)

		// Drag and Drop
		if (!task.isCompleted) {
			taskItem.addEventListener('dragstart', (e) => {
				e.dataTransfer.setData('text/plain', task.id)
			})

			taskItem.addEventListener('dragover', (e) => {
				e.preventDefault()
				taskItem.classList.add('drag-over')
			})

			taskItem.addEventListener('drop', (e) => {
				e.preventDefault()
				taskItem.classList.remove('drag-over')

				const draggedId = parseInt(e.dataTransfer.getData('text/plain'))
				const targetId = parseInt(taskItem.dataset.id)

				const draggedIndex = tasksList.findIndex(task => task.id === draggedId)
				const targetIndex = tasksList.findIndex(task => task.id === targetId)

				if (draggedIndex !== -1 && targetIndex !== -1 && draggedId !== targetId) {
					const movedTaskArr = tasksList.splice(draggedIndex, 1)
					const movedTask = movedTaskArr[0]
					tasksList.splice(targetIndex, 0, movedTask)

					updateLocalStorage()
					rerenderTasks()
				}
			})

			taskItem.addEventListener('dragleave', (e) => {
				taskItem.classList.remove('drag-over')
			})
		}

		// const container = task.isCompleted ? completedListElement : tasksListElement
		// container.appendChild(taskItem)
	})

	completedTasks.forEach((task, index) => {
		const taskItem = renderTaskItem(task.title, task.id, task.isCompleted, index, completedTasks.length)
		completedListElement.appendChild(taskItem)
		taskItem.classList.toggle('completed-task', task.isCompleted)
	})

	tasksCnt.classList.toggle('is-hidden', !tasksList.some(task => !task.isCompleted))
	completedTasksCnt.classList.toggle('is-hidden', !tasksList.some(task => task.isCompleted))
}

// Function to delete task
const deleteTask = (id) => {
	tasksList = tasksList.filter(task => task.id !== id)
	updateLocalStorage()
	rerenderTasks()
}

// Function to mark task as completed
const checkTask = (id) => {
	const task = tasksList.find(task => task.id === id)

	if (task) {
		task.isCompleted = true
		updateLocalStorage()
		rerenderTasks()
	}
}

// Function to move task up
const moveTaskUp = (id) => {
	const currentIndex = tasksList.findIndex(task => task.id === id)

	if (currentIndex > 0) {
		[tasksList[currentIndex], tasksList[currentIndex - 1]] = [tasksList[currentIndex - 1], tasksList[currentIndex]]
		updateLocalStorage()
		rerenderTasks()
	}
}

// Function to move task down
const moveTaskDown = (id) => {
	const currentIndex = tasksList.findIndex(task => task.id === id)

	if (currentIndex < tasksList.length - 1) {
		[tasksList[currentIndex], tasksList[currentIndex + 1]] = [tasksList[currentIndex + 1], tasksList[currentIndex]]
		updateLocalStorage()
		rerenderTasks()
	}
}

// Function to edit task
const editTask = (id) => {
	const taskElement = document.querySelector(`.task[data-id="${id}"`)
	let cancelled = false

	if (taskElement) {
		const taskSpan = taskElement.querySelector('span')
		const originalText = taskSpan.innerText
		taskSpan.contentEditable = 'true'
		taskSpan.focus()

		const range = document.createRange()

		range.selectNodeContents(taskSpan)
		range.collapse(false)

		const selection = window.getSelection()
		selection.removeAllRanges()
		selection.addRange(range)


		taskSpan.addEventListener('blur', () => {
			if (cancelled) {
				taskSpan.contentEditable = 'false'
				return
			}
			const newText = taskSpan.innerText.trim()

			if (newText !== '') {
				const task = tasksList.find(task => task.id === id)
				task.title = newText
				updateLocalStorage()
				taskSpan.contentEditable = 'false'
				rerenderTasks()
			}
		})



		taskSpan.addEventListener('keydown', (e) => {
			if (e.key === 'Enter') {
				e.preventDefault()
				taskSpan.contentEditable = 'false'

				const newText = taskSpan.innerText.trim()

				if (newText !== '') {
					const task = tasksList.find(task => task.id === id)
					task.title = newText
					updateLocalStorage()
					rerenderTasks()
				}
			}

			if (e.key === 'Escape') {
				cancelled = true
				e.preventDefault()
				taskSpan.textContent = originalText
				taskSpan.contentEditable = 'false'
			}
		})
	}
}

// Add new task when form is submitted
taskForm.addEventListener('submit', (e) => {
	e.preventDefault()

	const taskInput = document.getElementById('add-task-input')
	const taskText = taskInput.value.trim()
	addNewTask(taskText)
	taskInput.value = ''
})

// Handle clicks on delete or check buttons
document.addEventListener('click', (e) => {
	const targetElement = e.target
	const currentTaskItem = targetElement.closest('li')
	let currentTaskId
	if (currentTaskItem) {
		currentTaskId = parseInt(currentTaskItem.dataset.id)
	}

	if (!isNaN(currentTaskId)) {
		if (targetElement.tagName === 'BUTTON' && targetElement.classList.contains('delete-button')) {
			deleteTask(currentTaskId)
		}

		if (targetElement.tagName === 'BUTTON' && targetElement.classList.contains('check-button')) {
			checkTask(currentTaskId)
		}

		if (targetElement.tagName === 'BUTTON' && targetElement.classList.contains('edit-button')) {
			editTask(currentTaskId)
		}
	}

	// Function to close menu
	const closeMenu = () => {
		const openMenuList = document.querySelectorAll('.settings-menu')
		if (openMenuList.length) {
			openMenuList.forEach(menu => {
				menu.classList.add('is-hidden')
				menu.classList.remove('active')
			})
		}
		document.body.classList.remove('overflow-hidden')
	}

	if (e.target.closest('.settings-button')) {
		const taskItem = e.target.closest('li')
		const contextMenu = taskItem.querySelector('.settings-menu')

		// Close previous open menu
		closeMenu()

		// Add active class if context menu is open
		if (contextMenu) {
			contextMenu.classList.remove('is-hidden')
			contextMenu.classList.add('active')
			document.body.classList.add('overflow-hidden')
		}

	}

	const menuItem = e.target.closest('.settings-menu li')
	if (menuItem) {
		const targetBtn = menuItem.querySelector('button')
		const action = menuItem.dataset.action
		const task = e.target.closest('li.task')
		const taskId = parseInt(task.dataset.id)

		closeMenu()

		switch (action) {
			case 'edit':
				setTimeout(() => {
					editTask(taskId)
				}, 0)
				break
			case 'check':
				checkTask(taskId)
				break
			case 'delete':
				deleteTask(taskId)
				break
			case 'up':
				moveTaskUp(taskId)
				break
			case 'down':
				moveTaskDown(taskId)
				break
		}
	}

	const isContextMenu = e.target.closest('.settings-menu')
	const isContextMenuBtn = e.target.closest('.settings-button')
	if (!isContextMenu && !isContextMenuBtn) {
		closeMenu()
	}
})

// Show saved tasks from LocalStorage
rerenderTasks()