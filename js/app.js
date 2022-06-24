import { isWebp } from './components/isWebp.js'

isWebp()

// увеличивать количество при клике на + и -   +++++
const $products = document.querySelectorAll('.product__item')
const $productsInCart = document.querySelectorAll('.product-cart__product')
const $allProducts = [...$products, ...$productsInCart]

function countPlus(input) {
	let countCurrentValue = parseInt(input.value)
	input.setAttribute('value', countCurrentValue + 1)
}
function countMinus(input) {
	let countCurrentValue = parseInt(input.value)
	if (countCurrentValue === 0) return
	input.setAttribute('value', countCurrentValue - 1)
}

$allProducts.forEach((item) => {
	item.addEventListener('click', (event) => {
		const countCurrent = item.querySelector('input.count__current')
		if (event.target.classList.contains('count__minus')) {
			countMinus(countCurrent)
		}
		if (event.target.classList.contains('count__plus')) {
			countPlus(countCurrent)
		}
	})
})

