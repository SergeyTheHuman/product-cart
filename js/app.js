import { isWebp } from './components/isWebp.js'

isWebp()

// увеличивать количество при клике на + и -   +++++
const $products = document.querySelectorAll('.product__item')
const $cartProducts = document.querySelector('.product-cart__products')
const $cartFullPrice = document.querySelector('.product-cart__fullprice span')
let cart = {}
if (localStorage.cart) cart = JSON.parse(localStorage.cart)

renderCart()

function countPlus(input) {
	let countCurrentValue = parseInt(input.value)
	input.setAttribute('value', countCurrentValue + 1)
}

function countMinus(input) {
	let countCurrentValue = parseInt(input.value)
	if (countCurrentValue === 0) return
	input.setAttribute('value', countCurrentValue - 1)
}

function generateHtmlToCart(productId) {
	const image = cart[productId].image
	const name = cart[productId].name
	const price = cart[productId].price
	const count = cart[productId].count
	if (count === 0) return
	const html = `
		<div data-id='${productId}' class="product-cart__product cart-item">
			<div class="cart-item__image"><img class="cart-item__img" src="${image}"></div>
			<h3 class="cart-item__title">${name}</h3>
			<div class="cart-item__count count">
				<button class="count__minus"></button>
				<input class="count__current" type="text" value="${count}">
				<button class="count__plus">+</button>
			</div>
			<div class="cart-item__price">${price}р.</div>
		</div>
	`

	return html
}

function countFullPrice() {
	let fullPrice = 0
	for (const id in cart) {
		fullPrice += cart[id].price * cart[id].count
	}
	$cartFullPrice.textContent = `${fullPrice}р.`
}

function renderCart() {
	localStorage.setItem('cart', JSON.stringify(cart))
	if (Object.keys(cart).length === 0) {
		$cartProducts.style.display = 'none'
		localStorage.removeItem('cart')
	} else {
		$cartProducts.style.display = 'grid'
	}
	let html = ``
	for (const itemId in cart) {
		html += generateHtmlToCart(itemId)
	}
	$cartProducts.innerHTML = html
	countFullPrice()
}

$products.forEach((item) => {
	item.addEventListener('click', (event) => {
		const countCurrent = item.querySelector('input.count__current')
		if (event.target.classList.contains('count__minus')) {
			countMinus(countCurrent)
		}
		if (event.target.classList.contains('count__plus')) {
			countPlus(countCurrent)
		}
		if (event.target.classList.contains('product__item-add')) {
			const id = item.dataset.id
			const count = parseInt(countCurrent.value)
			const image = item.querySelector('.product__item-img').getAttribute('src')
			const name = item.querySelector('.product__item-title').textContent
			const price = parseInt(item.querySelector('.product__item-price').textContent)
			if (count === 0) return
			if (!cart[id]) {
				cart[id] = {
					count: count,
					image: image,
					name: name,
					price: price,
				}
			} else {
				cart[id]['count'] += count
			}
			renderCart()
			countCurrent.setAttribute('value', 0)
		}
	})
})

$cartProducts.addEventListener('click', (event) => {
	const target = event.target
	if (target.classList.contains('count__minus')) {
		const productId = target.closest('.product-cart__product').dataset.id
		const product = document.querySelector(`[data-id="${productId}"]`)
		const productInput = product.querySelector('input.count__current')
		countMinus(productInput)
		cart[productId].count--
		if (cart[productId].count === 0) delete cart[productId]
		renderCart()
	}
	if (target.classList.contains('count__plus')) {
		const productId = target.closest('.product-cart__product').dataset.id
		const product = document.querySelector(`[data-id="${productId}"]`)
		const productInput = product.querySelector('input.count__current')
		countPlus(productInput)
		cart[productId].count++
		renderCart()
	}
})
