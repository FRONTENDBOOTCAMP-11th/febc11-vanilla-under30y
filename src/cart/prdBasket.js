document.addEventListener('DOMContentLoaded', function () {
  let cartItems = [
	{
	  id: 1,
	  name: '나이키 줌 보메로 5',
	  price: 189000,
	  size: 275,
	  quantity: 1,
	  image: '../cart/images/shoes.png'
	}
]

	function renderCartItems() {
		const cartContainer = document.querySelector('.product-info')
		cartContainer.innerHTML = ''

		cartItems.forEach(item => {
			const productInfoHTML = `
                <div class="product-image-section">
                    <div class="product-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="shipping-info">
                        <p><strong>무료 배송</strong></p>
                        <p class="arrival-date">도착 예정일: 7월 27일 (토) 배송 지역: <strong class="shipping-zip-code">04628</strong></p>
                    </div>
                </div>
                <div class="product-details">
                    <div class="product-header">
                        <p class="product-price">${item.price.toLocaleString()} 원</p>
                        <p class="product-name">${item.name}</p>
                    </div>
                    <p class="product-category">남성 신발</p>
                    <div class="product-info2">
                        <div class="product-size">
                            사이즈
                            <span class="size-value">${item.size}</span>
                        </div>
                        <div class="product-amount">
                            수량
                            <span class="icon-minus" data-id="${item.id}">-</span>
                            <span class="count-number">${item.quantity}</span>
                            <span class="icon-plus" data-id="${item.id}">+</span>
                        </div>
                    </div>
                    <div class="product-icons">
                        <img src="../cart/images/IconLike.png" alt="관심 상품" class="icon-heart">
                        <img src="../cart/images/deleteIcon.png" alt="삭제" class="icon-delete" data-id="${item.id}">
                    </div>
                </div>
            `
			cartContainer.insertAdjacentHTML('beforeend', productInfoHTML)
		})
		updateCartSummary()
	}

	function updateCartSummary() {
		const totalAmount = cartItems.reduce(
			(sum, item) => sum + item.price * item.quantity,
			0
		)
		document.querySelector(
			'.order-summary .summary-total .order-product-price'
		).textContent = `${totalAmount.toLocaleString()} 원`
		document.querySelector('.basket-product .product-price').textContent =
			`${totalAmount.toLocaleString()} 원`
		document.querySelector('.basket-product .count-product').textContent =
			`${cartItems.length} 개의 제품 |`
	}

	function updateQuantity(id, action) {
		const item = cartItems.find(item => item.id === id)
		if (item) {
			if (action === 'increase') {
				item.quantity++
			} else if (action === 'decrease' && item.quantity > 1) {
				item.quantity--
			}
		}
		renderCartItems()
	}

	function removeItem(id) {
		cartItems = cartItems.filter(item => item.id !== id)
		renderCartItems()
	}

	document
		.querySelector('.product-info')
		.addEventListener('click', function (e) {
			const id = parseInt(e.target.getAttribute('data-id'))
			if (e.target.classList.contains('icon-plus')) {
				updateQuantity(id, 'increase')
			} else if (e.target.classList.contains('icon-minus')) {
				updateQuantity(id, 'decrease')
			} else if (e.target.classList.contains('icon-delete')) {
				removeItem(id)
			}
		})

	renderCartItems()
})
