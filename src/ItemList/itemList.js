// 상단 내비게이션 바 드래그
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
// 여기까지 상단 드래그 바

// 필터 메뉴
// Action Sheet 보이기
function showActionSheet() {
	document.getElementById('filter').classList.add('active')
}

// Action Sheet 감추기
function hideActionSheet() {
	document.getElementById('filter').classList.remove('active')
}

// 각 옵션 클릭 시 처리 - 현재 미사용으로 제외
// function handleOption(option) {
// 	// 여기에 옵션 클릭 시 로직 작성
// 	alert('Selected Option: ' + option)
// 	// Action Sheet 감추기
// 	hideActionSheet()
// }
