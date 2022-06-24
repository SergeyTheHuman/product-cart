/*
	Чтобы все работало нужно:
	1) Создать экземпляр класса, в конструктор передавать ничего не нужно
	2) Кнопкам для вызова модальных окон дать атрибуты data-modal-path='first'
	3) Модальным окнам дать дата атрибуты для связи с кнопками data-modal-target='first'
	4) Кнопкам закрытия (крестикам) дать дата-атрибут data-modal-close
	5) Самому врапперу модального окна дать дата-атрибут data-modal-close
	
	|---------------------|

	Необходимые Sass-классы
		.класс
			position: fixed
			width: 100%
			height: 100%
			top: 0
			left: 0
			display: flex
			justify-content: center
			align-items: center
			background-color: rgba(0, 0, 0, 0.6)
			opacity: 0
			visibility: hidden
			&__body
				background-color: white
				max-width: 50vw
				height: 400px
				position: relative
				overflow-y: auto
			&__close
				position: absolute
				top: 20px
				right: 20px
				background-color: red
				width: 30px
				height: 30px

		.modal--opened // Обязательный класс 
			opacity: 1
			visibility: visible

		.lock-scroll // Обязательный класс
			overflow-y: hidden

	|---------------------|

	Пример pug-структуры
		button.btn(data-modal-path='first') Первая
		button.btn(data-modal-path='second') Вторая

		.класс(data-modal-target='first' data-modal-close)
			.класс__body
				.класс__close(data-modal-close)
				h3.title Первая модалка
				p.text Lorem ipsum dolor sit amet, consectetur adipisicing elit.
		.класс(data-modal-target='second' data-modal-close)
			.класс__body
				.класс__close(data-modal-close)
				h3.title Вторая модалка
				p.text Lorem ipsum dolor sit amet, consectetur adipisicing elit.
*/
export class Modal {
	constructor(modalContainer) {
		this.buttons = Array.from(document.querySelectorAll('[data-modal-path]'))
		this.modals = Array.from(document.querySelectorAll('[data-modal-target]'))
		this.activeModal = null

		this.init()
	}

	init() {
		this.buttons.forEach((btn) => {
			btn.addEventListener('click', (e) => {
				const modalPath = btn.dataset.modalPath
				const modal = this.modals.find((modal) => modal.dataset.modalTarget === modalPath)

				if (this.activeModal) {
					this.closeModal(this.activeModal)
				}
				this.openModal(modal)
				this.bodyLock()

				modal.addEventListener('click', (e) => {
					if (e.target.hasAttribute('data-modal-close')) {
						this.closeModal(modal)
						this.bodyUnlock()
					}
				})
				window.addEventListener('keydown', (e) => {
					if (e.code === 'Escape' || e.keyCode === 27) {
						this.closeModal(modal)
						this.bodyUnlock()
					}
				})
			})
		})
	}

	openModal(modal) {
		modal.classList.add('modal--opened')
		this.activeModal = modal
	}
	closeModal(modal) {
		modal.classList.remove('modal--opened')
		this.activeModal = null
	}

	bodyLock() {
		const scrollWidth = document.body.offsetWidth - document.body.clientWidth
		const bodyPadding = parseInt(window.getComputedStyle(document.body).paddingRight)
		document.body.style.paddingRight = `${bodyPadding + scrollWidth}px`
		document.body.classList.add('lock-scroll')
	}

	bodyUnlock() {
		document.body.classList.remove('lock-scroll')
		document.body.style = ``
	}
}
