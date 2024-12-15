import {
	createInputElement,
	deleteInputElements,
	createdCard,
	deleteCard,
} from './moduleCreateEl.js'
export { input, apiGitHub, dataItem, deleteBtn }

let dataItem = []

const input = document.querySelector('input')
const inputItem = document.querySelector('.search__input')
const deleteBtn = document.querySelector('.search__wrapper')
const debounceGetRepo = debounce(getRepositories, 500)

inputItem.addEventListener('click', createdCard)
input.addEventListener('keyup', debounceGetRepo)
deleteBtn.addEventListener('click', deleteCard)

// Функция для обработки полученного ответа
function getRepositories(event) {
	deleteInputElements()
	if (event.keyCode === 32) {
		return
	} else if (input.value === '') {
		deleteInputElements()
		return
	}
	apiGitHub(event)
		.then(response => response.json())
		.then(data => {
			if (data.items.length === 0) {
				throw new Error('Репозиторий не найден')
			}
			return data.items.slice(0, 5)
		})
		.then(newData => {
			createInputElement(newData)
			dataItem = []
			dataItem.push(...newData)
		})
		.catch(err => {
			input.value = err.message
		})
}

// Функция отправки запроса на сервер для поиска
function apiGitHub(event) {
	const url = `https://api.github.com/search/repositories?q=${event.target.value}`
	return fetch(url)
}

function debounce(fn, debounceTime) {
	let timer
	return function (...args) {
		clearTimeout(timer)
		timer = setTimeout(() => {
			fn.apply(this, args)
		}, debounceTime)
	}
}
