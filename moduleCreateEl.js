export { createInputElement, deleteInputElements, createdCard, deleteCard }
import { input, dataItem, deleteBtn } from './moduleGetRepositories.js'

// Функция создания найденных элементов
function createInputElement(items) {
	const searchInput = document.querySelector('.search__input')
	const fragmentInput = document.createDocumentFragment()

	items.forEach(elem => {
		const itemsInput = document.createElement('div')
		itemsInput.classList.add('itemInput')

		const li = document.createElement('li')
		li.classList.add('item')
		li.textContent = elem.name

		itemsInput.appendChild(li)
		fragmentInput.appendChild(itemsInput)
	})

	searchInput.appendChild(fragmentInput)
}

// Функция удаления найденных элементов
function deleteInputElements() {
	let items = document.querySelectorAll('.item')
	let itemsInput = document.querySelectorAll('.itemInput')

	items.forEach(item => item.remove())
	itemsInput.forEach(item => item.remove())
}

// Функция создания карточки выбранного элемента
function createdCard(event) {
	const clickItem = event.target.closest('.item')

	if (!clickItem) {
		return
	} else {
		const searchWrapper = document.querySelector('.search__wrapper')

		const cards = document.createElement('div')
		cards.classList.add('card__wrapper')

		const newCard = document.createElement('div')
		newCard.classList.add('card')

		const textCard = document.createElement('p')
		textCard.classList.add('card__text-item')

		const deleteCardBtn = document.createElement('button')
		deleteCardBtn.classList.add('card__delete')

		for (let key of dataItem) {
			if (key.name === clickItem.innerText) {
				const newParagraph1 = document.createElement('p')
				const newParagraph2 = document.createElement('p')
				const newParagraph3 = document.createElement('p')

				newParagraph1.textContent = `Name: ${key.name}`
				newParagraph2.textContent = `Owner: ${key.owner.login}`
				newParagraph3.textContent = `Stars: ${key.stargazers_count}`

				textCard.appendChild(newParagraph1)
				textCard.appendChild(newParagraph2)
				textCard.appendChild(newParagraph3)
				break
			}
		}

		newCard.appendChild(textCard)
		newCard.appendChild(deleteCardBtn)
		cards.appendChild(newCard)
		searchWrapper.appendChild(cards)

		deleteInputElements()
		input.value = ''
	}
}

// Функция удаления карточки по клику на кнопку
function deleteCard(event) {
	const clickBtn = event.target.closest('.card__delete')
	const card = event.target.closest('.card__wrapper')
	if (!clickBtn) {
		return
	}
	card.remove()
}

class SearchError {
	constructor(errorName, message) {
		this.message = message
		this.name = errorName
	}
}
