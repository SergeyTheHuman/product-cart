/*
	Чтобы все работало нужно:
	1) При инициализации передать селектор враппера всего табов
	2) Кнопкам переключения дать класс .tabs__button + дата атрибуты для связи с табами data-tabs-path='first'
	3) Изначально активной кнопке дать класс .tabs__button--active
	4) Контентным блокам дать класс .tabs__item + дата атрибуты для связа с кнопками data-tabs-target='first'
	5) Изначально активному блоку дать класс .tabs__item--active
	
	|---------------------|

	Необходимые Sass-классы
		.tabs__button
			&:not(.tabs__button--active)
				cursor: pointer !important
		.tabs__button--active
			pointer-events: none !important
		.tabs__item
			display: none !important
		.tabs__item--active
			display: block !important

	|---------------------|

	Пример pug-структуры
		.класс
			.класс__buttons
				.класс__button.tabs__button(data-tabs-path='first').tabs__button--active Первый
				.класс__button.tabs__button(data-tabs-path='second') Второй
				.класс__button.tabs__button(data-tabs-path='third') Третий
			.класс__item.tabs__item(data-tabs-target='first').tabs__item--active
				.класс__content
			.класс__item.tabs__item(data-tabs-target='second')
				.класс__content
			.класс__item.tabs__item(data-tabs-target='third')
				.класс__content
*/

export class Tabs {
	constructor(tabsWrapper) {
		this.tabs = document.querySelector(tabsWrapper)
		this.currentBtn = this.tabs.querySelector('.tabs__button--active')
		this.currentItem = this.tabs.querySelector('.tabs__item--active')

		this.init()
	}
	changeTab(path) {
		this.currentBtn.classList.remove('tabs__button--active')
		this.currentItem.classList.remove('tabs__item--active')
		this.currentBtn = this.tabs.querySelector(`[data-tabs-path=${path}]`)
		this.currentItem = this.tabs.querySelector(`[data-tabs-target=${path}]`)
		this.currentBtn.classList.add('tabs__button--active')
		this.currentItem.classList.add('tabs__item--active')
	}
	init() {
		this.tabs.addEventListener('click', (e) => {
			if (e.target.classList.contains('tabs__button')) {
				const btn = e.target
				const tabPath = btn.dataset.tabsPath
				this.changeTab(tabPath)
			}
		})
	}
}
