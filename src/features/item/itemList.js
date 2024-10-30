// 상품 전체 개수 세는 함수
function countAllProduct(item) {
	let productCount = document.getElementById('product-count')
	productCount.innerText = `${item.length}개의 결과`
}

// api 접근 함수
function apiGet() {
	const ApiUrl = 'https://11.fesp.shop'
	const ClientId = 'vanilla04'
	// eslint-disable-next-line no-undef
	axios({
		method: 'get',
		url: `${ApiUrl}/products`,
		headers: { 'client-id': ClientId }
	}).then(response => {
		// 최초 페이지에 상품을 뿌려주는 역할
		data = response.data.item
		countAllProduct(data)
		dataDivide(data)
	})
}

// 상품 표시에 필요한 값들을 각 배열에 저장하는 함수
function dataDivide(item) {
	const idList = [],
		imgList = [],
		isNewList = [],
		nameList = [],
		genderList = [],
		colorList = [],
		priceList = []
	for (let i = 0; i < item.length; i++) {
		idList.push(item[i]._id)
		imgList.push(item[i].mainImages[0].path)
		isNewList.push(item[i].extra.isNew)
		nameList.push(item[i].name)
		genderList.push(item[i].extra.gender)
		colorList.push(item[i].extra.color)
		priceList.push(item[i].price)
	}
	addDocument(
		idList,
		imgList,
		isNewList,
		nameList,
		genderList,
		colorList,
		priceList
	)
}

function addDocument(id, img, isNew, name, gender, color, price) {
	// 전체를 감쌀 div
	const productWrapper = document.getElementById('product-list')
	// 필터에 의해 재생산될때를 대비한 초기화
	productWrapper.innerHTML = ''
	for (let i = 0; i < img.length; i++) {
		// 여기서 inside-product 3개를 넣어야함
		// wrapperDiv는 상품 하나하나를 감싼 div
		const wrapperDiv = document.createElement('div')
		wrapperDiv.classList.add('content__product-list--inside-product')

		// linkDiv는 이동할 링크가 저장된 div
		const linkDiv = document.createElement('a')
		linkDiv.setAttribute('href', `./itemDetail.html?product_id=${id[i]}`)

		// 이미지 삽입은 함수로 분류
		const productImg = addProductImg(img[i])

		// 내용 삽입은 함수로 분류
		const productInfo = addProductContent(
			isNew[i],
			name[i],
			gender[i],
			color[i],
			price[i]
		)
		// 합체
		linkDiv.appendChild(productImg)
		linkDiv.appendChild(productInfo)
		wrapperDiv.appendChild(linkDiv)
		productWrapper.appendChild(wrapperDiv)
	}
}

function addProductImg(img) {
	const ApiUrl = 'https://11.fesp.shop'
	// imgWrapperDiv는 이미지가 있는 부분을 감싼 div
	const imgWrapperDiv = document.createElement('div')
	imgWrapperDiv.classList.add('content__product-list--inside-product-img')
	const productImg = document.createElement('img')
	productImg.setAttribute('src', `${ApiUrl}${img}`)
	productImg.setAttribute('alt', '상품 이미지')
	imgWrapperDiv.appendChild(productImg)
	return imgWrapperDiv
}

function addProductContent(isNew, name, gender, color, price) {
	// 상품 설명 전체를 감싸는 div
	const prdCntDiv = document.createElement('div')
	prdCntDiv.classList.add('content__product-list--inside-product-explain')
	// 신제품 판단
	const newProduct = document.createElement('p')
	newProduct.classList.add('content__product-list--inside-product-explain')
	newProduct.classList.add('new')
	if (isNew == true) {
		newProduct.appendChild(document.createTextNode('신제품'))
	} else if (isNew == false) {
		const br = document.createElement('br')
		newProduct.appendChild(br)
	}
	// 상품 이름 추가
	const productName = document.createElement('p')
	productName.classList.add('content__product-list--inside-product-explain')
	productName.classList.add('product-name')
	productName.appendChild(document.createTextNode(name))
	// 남성, 여성 분류
	const productGender = document.createElement('p')
	productGender.classList.add('content__product-list--inside-product-explain')
	productGender.classList.add('product-category')
	if (gender == 'men') {
		productGender.appendChild(document.createTextNode('남성 신발'))
	} else if (gender == 'women') {
		productGender.appendChild(document.createTextNode('여성 신발'))
	}
	// 색상 분류
	const productColor = document.createElement('p')
	productColor.classList.add('content__product-list--inside-product-explain')
	productColor.classList.add('product-color')
	productColor.appendChild(document.createTextNode(`${color}개 색상`))
	// 가격 책정
	const productPrice = document.createElement('p')
	productPrice.classList.add('content__product-list--inside-product-explain')
	productPrice.classList.add('product-price')
	productPrice.appendChild(
		document.createTextNode(
			`${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원`
		)
	)
	// 합체
	prdCntDiv.append(
		newProduct,
		productName,
		productGender,
		productColor,
		productPrice
	)

	return prdCntDiv
}

// 정렬 구현
function sortProduct(item) {
	const filter = document.getElementById('filter')
	if (document.querySelector('input[name="standard"]:checked') == null) {
		filter.classList.remove('active')
		return item
	}
	let temp = document.querySelector('input[name="standard"]:checked').value
	switch (temp) {
		case 'recommended':
			item.sort((a, b) => b.quantity - a.quantity)
			break
		case 'latest': {
			item.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
			break
		}
		case 'high-price': {
			item.sort((a, b) => b.price - a.price)
			break
		}
		case 'low-price': {
			item.sort((a, b) => a.price - b.price)
			break
		}
	}
	filter.classList.remove('active')

	return item
}

// 성별 필터
function filterGender() {
	// check된 값들을 배열로 분할
	let item = data
	let genderQuerry = document.querySelectorAll('input[name="gender"]:checked')
	if (genderQuerry.length == 0) return item
	let genderList = []
	genderQuerry.forEach(gender => {
		genderList.push(gender.value)
	})

	let filters = {
		gender: genderList
	}
	let resultSet = new Set()
	if (filters.gender && filters.gender.length > 0) {
		data.filter(value =>
			filters.gender.includes(value.extra.gender)
		).forEach(value => resultSet.add(value))
	}
	item = Array.from(resultSet)
	return item
}

// 가격 필터
function filterPrice(item) {
	let data
	let priceQuerry = document.querySelectorAll('input[name="price"]:checked')
	if (priceQuerry.length == 0) return item
	let priceList = []
	priceQuerry.forEach(price => {
		priceList.push(parseInt(price.value))
	})
	let resultSet = new Set()
	priceList.forEach(value => {
		let minPrice = value
		let maxPrice = value + 50000
		let filters = {
			minPrice,
			maxPrice
		}
		item.filter(
			value =>
				value.price >= filters.minPrice &&
				value.price <= filters.maxPrice
		).forEach(value => resultSet.add(value))
	})
	data = Array.from(resultSet)
	return data
}

// 상단 내비게이션 바 드래그
const navi = document.getElementById('navi')
navi.onclick = () => {
	let mouseDown = false
	let startX, scrollLeft
	const slider = document.getElementById('navi')

	const startDragging = e => {
		mouseDown = true
		startX = e.pageX - slider.offsetLeft
		scrollLeft = slider.scrollLeft
	}

	const stopDragging = e => {
		mouseDown = false
	}

	const move = e => {
		e.preventDefault()
		if (!mouseDown) {
			return
		}
		const x = e.pageX - slider.offsetLeft
		const scroll = x - startX
		slider.scrollLeft = scrollLeft - scroll
	}

	// Add the event listeners
	slider.addEventListener('mousemove', move, false)
	slider.addEventListener('mousedown', startDragging, false)
	slider.addEventListener('mouseup', stopDragging, false)
	slider.addEventListener('mouseleave', stopDragging, false)
}

// 필터 메뉴
// Action Sheet 보이기
const showFilter = document.getElementById('filter-show')
const hideFilter = document.getElementById('filter-hide')
showFilter.onclick = () => {
	const filter = document.getElementById('filter')
	filter.classList.add('active')
}
hideFilter.onclick = () => {
	const filter = document.getElementById('filter')
	filter.classList.remove('active')
}

// 필터에서 입력된 데이터를 가져오는 코드
const filterAdapt = document.getElementById('filter-adapt')
filterAdapt.addEventListener('submit', function (e) {
	e.preventDefault()
	let filterItem = filterGender()
	let filterItem2 = filterPrice(filterItem)
	let sortItem = sortProduct(filterItem2)
	countAllProduct(sortItem)
	dataDivide(sortItem) // 상품 분류
})

// 가져온 상품데이터, 여러 함수에서 접근하므로 전역변수 선언
let data

// api 접속
window.onload = apiGet()
