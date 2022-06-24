/*
	Чтобы все работало нужно:
	1) При инициализации передать селектор враппера всего аккордеона
	2) Айтемам дать класс .accordion__item
	3) Заголовкам дать класс .accordion__title
	4) Контентным блокам дать класс .accordion__content
	5) Айтемам в Sass дать высоту такую же, как и у заголовка .accordion__title

	|---------------------|

	Пример pug-структуры
		.класс
			.класс__item.accordion__item 
				.класс__title.accordion__title Первый
				.класс__content.accordion__content Первый блок
			.класс__item.accordion__item 
				.класс__title.accordion__title Второй
				.класс__content.accordion__content Второй блок
			.класс__item.accordion__item 
				.класс__title.accordion__title Третий
				.класс__content.accordion__content Третий блок 
*/
export class Accordion {
	constructor(accordionWrapper, type = 'multi') {
		this.type = type
		this.accordion = document.querySelector(accordionWrapper)
		this.accordionItemsNodes = this.accordion.querySelectorAll('.accordion__item')
		this.accordionItems = []
	}

	openAccordionItem(element) {
		element.node.style.height = `${element.titleHeight + element.contentHeight}px`
		element.node.setAttribute('data-accordion-opened', true)
		element.title.classList.add('active')
		element.opened = true
	}
	closeAccordionItem(element) {
		element.node.style.height = `${element.titleHeight}px`
		element.node.removeAttribute('data-accordion-opened')
		element.title.classList.remove('active')
		element.opened = false
	}

	init() {
		for (const item of this.accordionItemsNodes) {
			const element = {
				node: item,
				content: item.querySelector('.accordion__content'),
				title: item.querySelector('.accordion__title'),
				titleHeight: item.querySelector('.accordion__title').offsetHeight,
				itemHeight: item.offsetHeight,
				contentHeight: item.querySelector('.accordion__content').offsetHeight,
				opened: false,
			}

			this.accordionItems.push(element)
		}
		this.accordionItems.forEach((element) => {
			element.node.style.height = `${element.titleHeight}px`
			element.node.addEventListener('click', (e) => {
				if (!element.opened) {
					if (this.type === 'single') {
						this.accordionItems.forEach((el) => this.closeAccordionItem(el))
					}
					this.openAccordionItem(element)
				} else {
					this.closeAccordionItem(element)
				}
			})
		})
	}
}
